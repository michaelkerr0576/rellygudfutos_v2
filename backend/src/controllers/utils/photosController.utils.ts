import { Request, Response } from 'express';
import { LeanDocument, Types } from 'mongoose';

import s3Middleware from '@/middlewares/s3.middleware';
import photosDbService from '@/services/photosDb.service';
import tagsDbService from '@/services/tagsDb.service';
import usersDbService from '@/services/usersDb.service';
import * as enm from '@/ts/enums/db.enum';
import * as inf from '@/ts/interfaces/db.interface';
import * as typ from '@/ts/types/db.types';
import * as conPagination from '@/utils/constants/pagination';
import * as conSorting from '@/utils/constants/sorting';
import errorMessageUtils from '@/utils/errorMessage.utils';
import generalUtils from '@/utils/general.utils';
import responseMessageUtils from '@/utils/responseMessage.utils';

import controllerUtils from './controller.utils';

const cancelAddPhoto = async (
  error: Error,
  photoId: Types.ObjectId,
  photoTagIds: Types.ObjectId[] | undefined,
): Promise<void> => {
  const photoIdString = generalUtils.numberToString(photoId);

  const isPhotoFound = await photosDbService.checkPhotoExists(photoId);
  if (!isPhotoFound) {
    throw error;
  }

  await photosDbService.deletePhoto(photoIdString);

  const isTagPhotosFound = photoTagIds && (await tagsDbService.checkTagsPhotoExist(photoId));
  if (!isTagPhotosFound) {
    throw error;
  }

  await tagsDbService.deleteTagPhotos(photoId);
  throw error;
};

const checkPhotoTagsExist = async (
  response: Response,
  photoTagIds: Types.ObjectId[] | undefined,
): Promise<void> => {
  const isTagsFound = photoTagIds ? await tagsDbService.checkTagsExist(photoTagIds) : false;

  if (!isTagsFound) {
    response.status(404);
    throw new Error(errorMessageUtils.error404ArrayValueNotFound('Tag', 'Image Tags'));
  }
};

const getPhotosFilter = (
  search: string,
  tags: string[],
  user: string,
): typ.PhotosFilterColumnsWithPattern => {
  let filter = {};

  const tagIds = Array.isArray(tags) ? tags : [];
  if (tagIds.length > 0) {
    filter = { ...filter, 'details.imageTags': { _id: tagIds } };
  }

  if (user) {
    filter = { ...filter, 'details.photographer': { _id: user } };
  }

  const searchString = search.toString();
  if (searchString.length > 3) {
    const pattern = new RegExp(searchString, 'i');

    filter = {
      ...filter,
      $or: [
        { 'details.captureLocation': { $regex: pattern } },
        { 'details.imageCaption': { $regex: pattern } },
        { 'details.imageTitle': { $regex: pattern } },
      ],
    };
  }

  return filter;
};

const getPhotosSort = (
  sort: enm.PhotoSortOptions,
): typ.PhotosSortColumnsWithDirection | enm.PhotoSortOptions.RANDOM => {
  const sortUpperCase = sort.toUpperCase();

  switch (sortUpperCase) {
    case enm.PhotoSortOptions.NEWEST:
      return { 'details.captureDate': conSorting.DESCENDING };
    case enm.PhotoSortOptions.OLDEST:
      return { 'details.captureDate': conSorting.ASCENDING };
    case enm.PhotoSortOptions.TITLE_AZ:
      return { 'details.imageTitle': conSorting.ASCENDING };
    case enm.PhotoSortOptions.TITLE_ZA:
      return { 'details.imageTitle': conSorting.DESCENDING };
    case enm.PhotoSortOptions.RANDOM:
      return enm.PhotoSortOptions.RANDOM;
    default:
      return { 'details.captureDate': conSorting.DESCENDING };
  }
};

const getPhotosQuery = (query: Request['query']): typ.PhotosQuery => {
  const {
    limit = conPagination.PHOTO_LIMIT,
    page = conPagination.PAGE,
    search = '',
    sort = enm.PhotoSortOptions.NEWEST,
    tags = [],
    user = '',
  } = query;

  const filter = getPhotosFilter(search as string, tags as string[], user as string);

  const pagination = controllerUtils.getPaginationQuery(
    limit as string | number,
    conPagination.PHOTO_MAX_LIMIT,
    page as string | number,
  );

  const sortBy = getPhotosSort(sort as enm.PhotoSortOptions);

  return {
    endIndex: pagination.endIndex,
    filter,
    limit: pagination.limit,
    page: pagination.page,
    sort: sortBy,
    startIndex: pagination.startIndex,
  };
};

const handleAddedPhoto = async (
  response: Response,
  photo: LeanDocument<inf.IPhoto> | null,
): Promise<void> => {
  if (!photo) {
    response.status(500);
    throw new Error(errorMessageUtils.error500NotFound('Photo'));
  }

  const imageTags = photo.details.imageTags as inf.IPhotoImageTags[];
  const photographer = photo.details.photographer as inf.IPhotoPhotographer;

  const photoId = photo._id;
  const tagIds = imageTags.map((tag): Types.ObjectId => tag._id);
  const userId = photographer._id;

  await tagsDbService.addTagPhotos(tagIds, photoId);
  await usersDbService.addUserPhoto(userId, photoId);

  response.status(201).json({
    data: photo,
    message: responseMessageUtils.dataAdded('Photo'),
  });
};

const handleDeletedPhoto = async (
  response: Response,
  photo: LeanDocument<inf.IPhoto> | null,
): Promise<void> => {
  if (!photo) {
    response.status(404);
    throw new Error(errorMessageUtils.error404('Photo'));
  }

  const photographer = photo.details.photographer as inf.IPhotoPhotographer;

  const photoId = photo._id;
  const userId = photographer._id;
  const photoKey = photo.details.imageKey;

  await tagsDbService.deleteTagPhotos(photoId);
  await usersDbService.deleteUserPhoto(userId, photoId);
  await s3Middleware.deleteFile(photoKey);

  response.status(200).json({
    data: photo,
    message: responseMessageUtils.dataDeleted('Photo'),
  });
};

const handlePhoto = async (response: Response, photo: LeanDocument<inf.IPhoto> | null): Promise<void> => {
  if (!photo) {
    response.status(404);
    throw new Error(errorMessageUtils.error404('Photo'));
  }

  response.status(200).json({
    data: photo,
    message: responseMessageUtils.dataFetched('Photo'),
  });
};

const handlePhotos = async (
  response: Response,
  photos: LeanDocument<inf.IPhoto[]> | null,
  photosQuery: typ.PhotosQuery,
): Promise<void> => {
  if (!photos) {
    response.status(500);
    throw new Error(errorMessageUtils.error500NotFound('Photos'));
  }

  const isPhotosEmpty = Array.isArray(photos) && photos.length === 0;
  if (isPhotosEmpty) {
    response.status(404);
    throw new Error(errorMessageUtils.error404EmptyResultFilter('Photos'));
  }

  let pagination;
  const isRandomSort = photosQuery.sort === enm.PhotoSortOptions.RANDOM;
  if (!isRandomSort) {
    const { startIndex, page, limit, endIndex, filter } = photosQuery;

    const total = await photosDbService.countPhotos(filter);
    pagination = controllerUtils.getPaginationResponse(endIndex, limit, page, startIndex, total);
  }

  response.status(200).json({
    data: photos,
    message: responseMessageUtils.dataFetched('Photos'),
    pagination,
  });
};

const handleUpdatedPhoto = async (
  response: Response,
  photo: LeanDocument<inf.IPhoto> | null,
): Promise<void> => {
  if (!photo) {
    response.status(404);
    throw new Error(errorMessageUtils.error404('Photo'));
  }

  const imageTags = photo.details.imageTags as inf.IPhotoImageTags[];

  const photoId = photo._id;
  const tagIds = imageTags.map((tag): Types.ObjectId => tag._id);

  await tagsDbService.updateTagPhotos(tagIds, photoId);

  response.status(200).json({
    data: photo,
    message: responseMessageUtils.dataUpdated('Photo'),
  });
};

export default {
  cancelAddPhoto,
  checkPhotoTagsExist,
  getPhotosFilter,
  getPhotosQuery,
  getPhotosSort,
  handleAddedPhoto,
  handleDeletedPhoto,
  handlePhoto,
  handlePhotos,
  handleUpdatedPhoto,
};
