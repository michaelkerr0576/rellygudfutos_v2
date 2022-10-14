import { Request, Response } from 'express';
import { LeanDocument, Types } from 'mongoose';

import photosDbService from '@/services/photosDb.service';
import tagsDbService from '@/services/tagsDb.service';
import * as enm from '@/ts/enums/db.enum';
import * as inf from '@/ts/interfaces/db.interface';
import * as typ from '@/ts/types/db.types';
import * as conPagination from '@/utils/constants/pagination';
import * as conSorting from '@/utils/constants/sorting';
import errorMessageUtils from '@/utils/errorMessage.utils';
import generalUtils from '@/utils/general.utils';

// TODO - add tests
const cancelAddPhoto = async (
  error: Error,
  photoId: Types.ObjectId,
  photoTagIds: Types.ObjectId[] | undefined,
): Promise<void> => {
  const photoIdString = generalUtils.numberToString(photoId);

  const isPhotoFound = await photosDbService.checkPhotoExists(photoId);
  if (isPhotoFound) {
    await photosDbService.deletePhoto(photoIdString);

    const hasPhotoTagIds = photoTagIds && photoTagIds.length > 0;
    if (hasPhotoTagIds) {
      const isTagPhotosFound = await tagsDbService.checkTagPhotosExist(photoTagIds);

      if (isTagPhotosFound) {
        await tagsDbService.deleteTagPhotos(photoId, photoTagIds);
      }
    }
  }

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

const getPhotosSortBy = (
  sortBy: enm.PhotoSortOptions,
): typ.PhotosSortColumnsWithDirection | enm.PhotoSortOptions.RANDOM => {
  const sortByUpperCase = sortBy.toUpperCase();

  switch (sortByUpperCase) {
    case enm.PhotoSortOptions.NEWEST:
      return { 'details.captureDate': conSorting.DESCENDING };
    case enm.PhotoSortOptions.OLDEST:
      return { 'details.captureDate': conSorting.ASCENDING };
    case enm.PhotoSortOptions.TITLE_AZ:
      return { 'details.imageTitle': conSorting.DESCENDING };
    case enm.PhotoSortOptions.TITLE_ZA:
      return { 'details.imageTitle': conSorting.ASCENDING };
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
    sortBy = enm.PhotoSortOptions.NEWEST,
    tags = [],
  } = query;

  const pageNumber = generalUtils.stringToNumber(page as string | number);
  const sortByColumn = getPhotosSortBy(sortBy as enm.PhotoSortOptions);

  let limitNumber = generalUtils.stringToNumber(limit as string | number);
  limitNumber = limitNumber > conPagination.PHOTO_MAX_LIMIT ? conPagination.PHOTO_MAX_LIMIT : limitNumber;

  const startIndex = (pageNumber - 1) * limitNumber;
  const endIndex = pageNumber * limitNumber;

  let filter = {};

  const tagIds = Array.isArray(tags) ? tags : [];
  if (tagIds.length > 0) {
    filter = { ...filter, 'details.imageTags': { _id: tagIds } };
  }

  const searchString = search.toString();
  if (searchString.length > 3) {
    const pattern = new RegExp(searchString, 'i');

    filter = {
      ...filter,
      $or: [
        { 'details.captureLocation': { $regex: pattern } },
        { 'details.imageTags.tag': { $regex: pattern } },
        { 'details.imageCaption': { $regex: pattern } },
        { 'details.imageTitle': { $regex: pattern } },
      ],
    };
  }

  return {
    endIndex,
    filter,
    limit: limitNumber,
    page: pageNumber,
    sortBy: sortByColumn,
    startIndex,
  };
};

const handleAddedPhoto = async (response: Response, photo: inf.IPhoto): Promise<void> => {
  const {
    _id: photoId,
    details: { imageTags: photoTagIds },
  } = photo;

  await tagsDbService.addTagPhotos(photoId, photoTagIds);

  response.status(201).json({
    addedPhoto: photo,
    message: 'Photo added',
  });
};

const handleDeletedPhoto = (response: Response, photo: LeanDocument<inf.IPhoto> | null): void => {
  if (!photo) {
    response.status(404);
    throw new Error(errorMessageUtils.error404('Photo'));
  }

  response.status(200).json({
    deletedPhoto: photo,
    message: 'Photo deleted',
  });
};

const handlePhoto = (response: Response, photo: LeanDocument<inf.IPhoto> | null): void => {
  if (!photo) {
    response.status(404);
    throw new Error(errorMessageUtils.error404('Photo'));
  }

  response.status(200).json(photo);
};

const handlePhotos = (response: Response, photos: LeanDocument<inf.IPhoto[]>): void => {
  const isPhotosEmpty = photos.length === 0;
  if (isPhotosEmpty) {
    response.status(404);
    throw new Error(errorMessageUtils.error404EmptyResult('Photos'));
  }

  response.status(200).json(photos);
};

const handleUpdatedPhoto = (response: Response, photo: LeanDocument<inf.IPhoto> | null): void => {
  if (!photo) {
    response.status(404);
    throw new Error(errorMessageUtils.error404('Photo'));
  }

  response.status(200).json({
    message: 'Photo updated',
    updatedPhoto: photo,
  });
};

const photosControllerUtils = {
  cancelAddPhoto,
  checkPhotoTagsExist,
  getPhotosQuery,
  getPhotosSortBy,
  handleAddedPhoto,
  handleDeletedPhoto,
  handlePhoto,
  handlePhotos,
  handleUpdatedPhoto,
};

export default photosControllerUtils;
