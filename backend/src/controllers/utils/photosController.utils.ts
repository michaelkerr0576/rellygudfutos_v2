import { Request, Response } from 'express';
import { LeanDocument, Types } from 'mongoose';
import sharp from 'sharp';

import * as s3Middleware from '@/middlewares/s3.middleware';
import * as photosDbService from '@/services/photosDb.service';
import * as tagsDbService from '@/services/tagsDb.service';
import * as usersDbService from '@/services/usersDb.service';
import * as enm from '@/ts/enums/db.enum';
import * as inf from '@/ts/interfaces/db.interface';
import * as typDb from '@/ts/types/db.types';
import * as typS3 from '@/ts/types/s3.types';
import * as conPagination from '@/utils/constants/pagination';
import * as conPhoto from '@/utils/constants/photo';
import * as conSorting from '@/utils/constants/sorting';
import * as errorMessageUtils from '@/utils/errorMessage.utils';
import * as generalUtils from '@/utils/general.utils';
import * as responseMessageUtils from '@/utils/responseMessage.utils';

import * as controllerUtils from './controller.utils';

/* 
 $ photosControllerUtils
  - cancelAddPhoto
  - checkPhotoTagsExist
  - getPhotosFilter
  - getPhotosQuery
  - getPhotosSort
  - handleAddedPhoto
  - handleDeletedPhoto
  - handlePhoto
  - handlePhotos
  - handleUpdatedPhoto
  - uploadPhotoToS3
*/

export const cancelAddPhoto = async (
  error: Error,
  photoId: Types.ObjectId,
  photoTagIds: Types.ObjectId[] | undefined,
  s3ImageKey: string,
): Promise<void> => {
  await s3Middleware.deleteFile(s3ImageKey);

  const isPhotoFound = await photosDbService.checkPhotoExists(photoId);
  if (!isPhotoFound) {
    throw error;
  }

  const photoIdString = generalUtils.numberToString(photoId);
  await photosDbService.deletePhoto(photoIdString);

  const isTagPhotosFound = photoTagIds && (await tagsDbService.checkTagsPhotoExist(photoId));
  if (!isTagPhotosFound) {
    throw error;
  }

  await tagsDbService.deleteTagPhotos(photoId);
  throw error;
};

export const checkPhotoTagsExist = async (
  response: Response,
  photoTagIds: Types.ObjectId[] | undefined,
): Promise<void> => {
  const isTagsFound = photoTagIds ? await tagsDbService.checkTagsExist(photoTagIds) : false;

  if (!isTagsFound) {
    response.status(404);
    throw new Error(errorMessageUtils.error404ArrayValueNotFound('Tag', 'Image Tags'));
  }
};

export const getPhotosFilter = (
  search: string,
  tags: string[],
  user: string,
): typDb.PhotosFilterColumnsWithPattern => {
  let filter = {};

  const tagIds = Array.isArray(tags) ? tags : [];
  if (tagIds.length > 0) {
    filter = { ...filter, tags: { _id: tagIds } };
  }

  if (user) {
    filter = { ...filter, photographer: { _id: user } };
  }

  const searchString = search.toString();
  if (searchString.length > 3) {
    const pattern = new RegExp(searchString, 'i');

    filter = {
      ...filter,
      $or: [
        { caption: { $regex: pattern } },
        { location: { $regex: pattern } },
        { title: { $regex: pattern } },
      ],
    };
  }

  return filter;
};

export const getPhotosSort = (
  sort: enm.PhotoSortOptions,
): typDb.PhotosSortColumnsWithDirection | enm.PhotoSortOptions.RANDOM => {
  const sortLowerCase = sort.toLowerCase();

  switch (sortLowerCase) {
    case enm.PhotoSortOptions.NEWEST:
      return { captureDate: conSorting.DESCENDING };
    case enm.PhotoSortOptions.OLDEST:
      return { captureDate: conSorting.ASCENDING };
    case enm.PhotoSortOptions.TITLE_AZ:
      return { title: conSorting.ASCENDING };
    case enm.PhotoSortOptions.TITLE_ZA:
      return { title: conSorting.DESCENDING };
    case enm.PhotoSortOptions.RANDOM:
      return enm.PhotoSortOptions.RANDOM;
    default:
      return { captureDate: conSorting.DESCENDING };
  }
};

export const getPhotosQuery = (query: Request['query']): typDb.PhotosQuery => {
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

export const handleAddedPhoto = async (
  response: Response,
  photo: LeanDocument<inf.Photo> | null,
): Promise<void> => {
  if (!photo) {
    response.status(500);
    throw new Error(errorMessageUtils.error500NotFound('Photo'));
  }

  const imageTags = photo.tags as inf.PhotoTag[];
  const photographer = photo.photographer as inf.PhotoPhotographer;

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

export const handleDeletedPhoto = async (
  response: Response,
  photo: LeanDocument<inf.Photo> | null,
): Promise<void> => {
  if (!photo) {
    response.status(404);
    throw new Error(errorMessageUtils.error404('Photo'));
  }

  const photographer = photo.photographer as inf.PhotoPhotographer;

  const photoId = photo._id;
  const userId = photographer._id;
  const s3ImageKey = photo.image.key;

  await tagsDbService.deleteTagPhotos(photoId);
  await usersDbService.deleteUserPhoto(userId, photoId);
  await s3Middleware.deleteFile(s3ImageKey);

  response.status(200).json({
    data: photo,
    message: responseMessageUtils.dataDeleted('Photo'),
  });
};

export const handlePhoto = async (
  response: Response,
  photo: LeanDocument<inf.Photo> | null,
): Promise<void> => {
  if (!photo) {
    response.status(404);
    throw new Error(errorMessageUtils.error404('Photo'));
  }

  response.status(200).json({
    data: photo,
    message: responseMessageUtils.dataFetched('Photo'),
  });
};

export const handlePhotos = async (
  response: Response,
  photos: LeanDocument<inf.Photo[]> | null,
  photosQuery: typDb.PhotosQuery,
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

export const handleUpdatedPhoto = async (
  response: Response,
  photo: LeanDocument<inf.Photo> | null,
): Promise<void> => {
  if (!photo) {
    response.status(404);
    throw new Error(errorMessageUtils.error404('Photo'));
  }

  const imageTags = photo.tags as inf.PhotoTag[];

  const photoId = photo._id;
  const tagIds = imageTags.map((tag): Types.ObjectId => tag._id);

  await tagsDbService.updateTagPhotos(tagIds, photoId);

  response.status(200).json({
    data: photo,
    message: responseMessageUtils.dataUpdated('Photo'),
  });
};

export const uploadPhotoToS3 = async (file: Express.Multer.File): Promise<typS3.PhotoS3> => {
  const key = generalUtils.generateKey();

  const fileBuffer = await sharp(file.buffer)
    .resize({
      fit: 'inside',
      height: conPhoto.PHOTO_MAX_HEIGHT_PIXELS,
      width: conPhoto.PHOTO_MAX_WIDTH_PIXELS,
    })
    .jpeg({
      mozjpeg: true,
    })
    .toBuffer({ resolveWithObject: true });

  await s3Middleware.uploadFile(fileBuffer.data, key, file.mimetype);

  const url = await s3Middleware.getFileUrl(key);

  return {
    fileName: file.originalname,
    fileType: fileBuffer.info.format,
    height: fileBuffer.info.height,
    key,
    url,
    width: fileBuffer.info.width,
  };
};
