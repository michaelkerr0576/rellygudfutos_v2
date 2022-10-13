import { Response } from 'express';
import { LeanDocument, Types } from 'mongoose';

import photosDbService from '@/services/photosDb.service';
import tagsDbService from '@/services/tagsDb.service';
import * as enm from '@/ts/enums/db.enum';
import * as inf from '@/ts/interfaces/db.interface';
import * as typ from '@/ts/types/db.types';
import * as con from '@/utils/constants/sorting';
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

const getPhotoSortByColumn = (sortBy: enm.PhotoSortOptions): typ.PhotoSortColumnsWithDirection => {
  switch (sortBy) {
    case enm.PhotoSortOptions.NEWEST:
      return { 'details.captureDate': con.DESCENDING };
    case enm.PhotoSortOptions.OLDEST:
      return { 'details.captureDate': con.ASCENDING };
    case enm.PhotoSortOptions.TITLE_AZ:
      return { 'details.imageTitle': con.DESCENDING };
    case enm.PhotoSortOptions.TITLE_ZA:
      return { 'details.imageTitle': con.ASCENDING };
    default:
      return { 'details.captureDate': con.DESCENDING };
  }
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
  getPhotoSortByColumn,
  handleAddedPhoto,
  handleDeletedPhoto,
  handlePhoto,
  handlePhotos,
  handleUpdatedPhoto,
};

export default photosControllerUtils;
