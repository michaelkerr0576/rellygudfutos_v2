import { Response } from 'express';
import { LeanDocument, Types } from 'mongoose';

import { IPhoto } from '@/models/Photo.model';
import photosDbService from '@/services/photosDb.service';
import tagsDbService from '@/services/tagsDb.service';
import { errorMessageUtils } from '@/utils';

const handleAddedPhoto = async (response: Response, photo: IPhoto): Promise<void> => {
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

// TODO - add tests
const handleCancelAddPhoto = async (
  error: Error,
  photoId: Types.ObjectId,
  photoTagIds: Types.ObjectId[] | undefined,
): Promise<void> => {
  const photoIdString = photoId.toString();
  const photoTagObjectIds = photoTagIds ? photoTagIds.map((id): any => new Types.ObjectId(id)) : undefined;

  const isPhotoFound = await photosDbService.checkPhotoExists(photoId);
  if (isPhotoFound) {
    await photosDbService.deletePhoto(photoIdString);

    if (photoTagObjectIds) {
      const isTagPhotosFound = await tagsDbService.checkTagPhotosExist(photoTagObjectIds);

      if (isTagPhotosFound) {
        await tagsDbService.deleteTagPhotos(photoId, photoTagObjectIds);
      }
    }
  }

  throw error;
};

const handleCheckTagsExist = async (
  response: Response,
  photoTagIds: Types.ObjectId[] | undefined,
): Promise<void> => {
  const isTagsFound = photoTagIds ? await tagsDbService.checkTagsExist(photoTagIds) : false;

  if (!isTagsFound) {
    response.status(404);
    throw new Error(errorMessageUtils.error404ArrayValueNotFound('Tag', 'Image Tags'));
  }
};

const handleDeletedPhoto = (response: Response, photo: LeanDocument<IPhoto> | null): void => {
  if (!photo) {
    response.status(404);
    throw new Error(errorMessageUtils.error404('Photo'));
  }

  response.status(200).json({
    deletedPhoto: photo,
    message: 'Photo deleted',
  });
};

const handlePhoto = (response: Response, photo: LeanDocument<IPhoto> | null): void => {
  if (!photo) {
    response.status(404);
    throw new Error(errorMessageUtils.error404('Photo'));
  }

  response.status(200).json(photo);
};

const handlePhotos = (response: Response, photos: LeanDocument<IPhoto[]>): void => {
  const isPhotosEmpty = photos.length === 0;
  if (isPhotosEmpty) {
    response.status(404);
    throw new Error(errorMessageUtils.error404EmptyResult('Photos'));
  }

  response.status(200).json(photos);
};

const handleUpdatedPhoto = (response: Response, photo: LeanDocument<IPhoto> | null): void => {
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
  handleAddedPhoto,
  handleCancelAddPhoto,
  handleCheckTagsExist,
  handleDeletedPhoto,
  handlePhoto,
  handlePhotos,
  handleUpdatedPhoto,
};

export default photosControllerUtils;
