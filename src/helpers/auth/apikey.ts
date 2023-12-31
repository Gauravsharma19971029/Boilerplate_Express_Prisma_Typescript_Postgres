import express from 'express';
// import ApiKeyRepo from '../database/repository/ApiKeyRepo';
import { ForbiddenError } from '../core/ApiError';
import Logger from '../core/Logger';
// import { PublicRequest } from 'app-request';
import schema from './schema';
import validator, { ValidationSource } from '../validator';
import asyncHandler from '../asyncHandler';
import { Header } from '../core/utils';

const router = express.Router();

export default router.use(
  validator(schema.apiKey, ValidationSource.HEADER),
  asyncHandler(async (req: any, res, next) => {
    const key = req.headers[Header.API_KEY]?.toString();
    if (!key) throw new ForbiddenError();

    // const apiKey = await ApiKeyRepo.findByKey(key);
    const apiKey = ""
    // if (!apiKey) throw new ForbiddenError();
    Logger.info(apiKey);

    req.apiKey = apiKey;
    return next();
  }),
);
