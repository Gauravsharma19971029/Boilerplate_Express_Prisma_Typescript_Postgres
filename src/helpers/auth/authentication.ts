import express from 'express';
// import { ProtectedRequest } from 'app-request';
import {
  AuthFailureError,
  AccessTokenError,
  TokenExpiredError,
} from '../core/ApiError';
import JWT from '../core/JWT';
// import KeystoreRepo from '../database/repository/KeystoreRepo';
import { getAccessToken, validateTokenData } from './authUtils';
import validator, { ValidationSource } from '../validator';
import schema from './schema';
import asyncHandler from '../asyncHandler';
import { prisma } from '../../database';

const router = express.Router();

export default router.use(
  validator(schema.auth, ValidationSource.HEADER),
  asyncHandler(async (req: any, res: any, next: () => any) => {
    req.accessToken = getAccessToken(req.headers.authorization); // Express headers are auto converted to lowercase

    try {
      const payload = await JWT.validate(req.accessToken);
      validateTokenData(payload);

      const user = await prisma.user.findFirst(); //check with payload.sub
      if (!user) throw new AuthFailureError('User not registered');
      req.user = user;

      // const keystore = await KeystoreRepo.findforKey(req.user, payload.prm);
      const keystore = '';

      if (!keystore) throw new AuthFailureError('Invalid access token');
      req.keystore = keystore;

      return next();
    } catch (e) {
      if (e instanceof TokenExpiredError) throw new AccessTokenError(e.message);
      throw e;
    }
  }),
);
