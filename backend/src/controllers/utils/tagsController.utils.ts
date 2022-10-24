import { Request, Response } from 'express';
import { LeanDocument } from 'mongoose';

import tagsDbService from '@/services/tagsDb.service';
import * as inf from '@/ts/interfaces/db.interface';
import * as typ from '@/ts/types/db.types';
import * as con from '@/utils/constants/pagination';
import errorMessageUtils from '@/utils/errorMessage.utils';
import responseMessageUtils from '@/utils/responseMessage.utils';

import controllerUtils from './controller.utils';

const getTagsQuery = (query: Request['query']): typ.PaginationQuery => {
  const { limit = con.TAG_LIMIT, page = con.PAGE } = query;

  const pagination = controllerUtils.getPaginationQuery(limit as string, con.TAG_MAX_LIMIT, page as string);

  return {
    endIndex: pagination.endIndex,
    limit: pagination.limit,
    page: pagination.page,
    startIndex: pagination.startIndex,
  };
};

const handleAddedTag = (response: Response, tag: LeanDocument<inf.ITag> | null): void => {
  if (!tag) {
    response.status(404);
    throw new Error(errorMessageUtils.error404('Tag'));
  }

  response.status(201).json({
    data: tag,
    message: responseMessageUtils.dataAdded('Tag'),
  });
};

const handleDeletedTag = (response: Response, tag: LeanDocument<inf.ITag> | null): void => {
  if (!tag) {
    response.status(404);
    throw new Error(errorMessageUtils.error404('Tag'));
  }

  response.status(200).json({
    data: tag,
    message: responseMessageUtils.dataDeleted('Tag'),
  });
};

const handleTag = (response: Response, tag: LeanDocument<inf.ITag> | null): void => {
  if (!tag) {
    response.status(404);
    throw new Error(errorMessageUtils.error404('Tag'));
  }

  response.status(200).json({
    data: tag,
    message: responseMessageUtils.dataFetched('Tag'),
  });
};

const handleTags = async (
  response: Response,
  tags: LeanDocument<inf.ITag[]>,
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

const handleUpdatedTag = (response: Response, tag: LeanDocument<inf.ITag> | null): void => {
  if (!tag) {
    response.status(404);
    throw new Error(errorMessageUtils.error404('Tag'));
  }

  response.status(200).json({
    data: tag,
    message: responseMessageUtils.dataUpdated('Tag'),
  });
};

export default {
  getTagsQuery,
  handleAddedTag,
  handleDeletedTag,
  handleTag,
  handleTags,
  handleUpdatedTag,
};
