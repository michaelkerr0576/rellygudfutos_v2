import { Request, Response } from 'express';
import { LeanDocument } from 'mongoose';

import * as tagsDbService from '@/services/tagsDb.service';
import * as inf from '@/ts/interfaces/db.interface';
import * as typ from '@/ts/types/db.types';
import * as con from '@/utils/constants/pagination';
import * as errorMessageUtils from '@/utils/errorMessage.utils';
import * as responseMessageUtils from '@/utils/responseMessage.utils';

import * as controllerUtils from './controller.utils';

/* 
 $ tagsControllerUtils
  - getTagsQuery
  - handleAddedTag
  - handleDeletedTag
  - handleTag
  - handleTags
  - handleUpdatedTag
*/

export const getTagsQuery = (query: Request['query']): typ.PaginationQuery => {
  const { limit = con.TAG_LIMIT, page = con.PAGE } = query;

  const pagination = controllerUtils.getPaginationQuery(
    limit as string | number,
    con.TAG_MAX_LIMIT,
    page as string | number,
  );

  return {
    endIndex: pagination.endIndex,
    limit: pagination.limit,
    page: pagination.page,
    startIndex: pagination.startIndex,
  };
};

export const handleAddedTag = async (
  response: Response,
  tag: LeanDocument<inf.Tag> | null,
): Promise<void> => {
  if (!tag) {
    response.status(500);
    throw new Error(errorMessageUtils.error500NotFound('Tag'));
  }

  response.status(201).json({
    data: tag,
    message: responseMessageUtils.dataAdded('Tag'),
  });
};

export const handleDeletedTag = async (
  response: Response,
  tag: LeanDocument<inf.Tag> | null,
): Promise<void> => {
  if (!tag) {
    response.status(404);
    throw new Error(errorMessageUtils.error404('Tag'));
  }

  response.status(200).json({
    data: tag,
    message: responseMessageUtils.dataDeleted('Tag'),
  });
};

export const handleTag = async (response: Response, tag: LeanDocument<inf.Tag> | null): Promise<void> => {
  if (!tag) {
    response.status(404);
    throw new Error(errorMessageUtils.error404('Tag'));
  }

  response.status(200).json({
    data: tag,
    message: responseMessageUtils.dataFetched('Tag'),
  });
};

export const handleTags = async (
  response: Response,
  tags: LeanDocument<inf.Tag[]>,
  tagsQuery: typ.PaginationQuery,
): Promise<void> => {
  const isTagsEmpty = tags.length === 0;
  if (isTagsEmpty) {
    response.status(404);
    throw new Error(errorMessageUtils.error404EmptyResult('Tags'));
  }

  const { startIndex, page, limit, endIndex } = tagsQuery;

  const total = await tagsDbService.countTags();
  const pagination = controllerUtils.getPaginationResponse(endIndex, limit, page, startIndex, total);

  response.status(200).json({
    data: tags,
    message: responseMessageUtils.dataFetched('Tags'),
    pagination,
  });
};

export const handleUpdatedTag = async (
  response: Response,
  tag: LeanDocument<inf.Tag> | null,
): Promise<void> => {
  if (!tag) {
    response.status(404);
    throw new Error(errorMessageUtils.error404('Tag'));
  }

  response.status(200).json({
    data: tag,
    message: responseMessageUtils.dataUpdated('Tag'),
  });
};
