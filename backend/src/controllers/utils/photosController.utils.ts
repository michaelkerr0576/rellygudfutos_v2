import { Response } from 'express';
import { LeanDocument } from 'mongoose';

import { IPhoto } from '@/models/Photo.model';
import { errorMessageUtils } from '@/utils';

const handleAddedPhoto = (response: Response, photo: IPhoto): void => {
  // Todo : fix push new photo tags
  // const {
  //   _id: photoId,
  //   details: { imageTags: photoTagIds },
  // } = photo;

  // const addTagsResult = await tagsDbService.addTagPhotos(photoId, photoTagIds);

  // const isAddTagsFailed = addTagsResult === enm.RequestStatus.FAILED;
  // if (isAddTagsFailed) {
  //   throwErrorUtils.throw500Error(response);
  //   return Promise.resolve();
  // }

  response.status(201).json({
    message: 'Photo added',
    addedPhoto: photo,
  });
};

const handleDeletedPhoto = (response: Response, photo: LeanDocument<IPhoto> | null): void => {
  if (!photo) {
    response.status(404);
    throw new Error(errorMessageUtils.error404('Photo'));
  }

  response.status(200).json({
    message: 'Photo deleted',
    deletedPhoto: photo,
  });
};

const handleIsTagsFound = (response: Response, isTagsFound: boolean): void => {
  if (!isTagsFound) {
    response.status(404);
    throw new Error(errorMessageUtils.error404ArrayValueNotFound('Tag', 'Image Tags'));
  }
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
  handleDeletedPhoto,
  handleIsTagsFound,
  handlePhoto,
  handlePhotos,
  handleUpdatedPhoto,
};

export default photosControllerUtils;
