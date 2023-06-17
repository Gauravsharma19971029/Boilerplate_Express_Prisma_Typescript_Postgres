import express from 'express';
// import { ProtectedRequest } from 'app-request';
import { AuthFailureError } from '../core/ApiError';
// import RoleRepo from '../database/repository/RoleRepo';
import asyncHandler from '../asyncHandler';

const router = express.Router();

export default router.use(
  asyncHandler(async (req: any, res: any, next: () => any) => {
    if (!req.user || !req.user.roles || !req.currentRoleCodes)
      throw new AuthFailureError('Permission denied');

    // const roles = await RoleRepo.findByCodes(req.currentRoleCodes);
    const roles:any = "";

    if (roles.length === 0) throw new AuthFailureError('Permission denied');

    let authorized = false;

    for (const userRole of req.user.roles) {
      if (authorized) break;
      for (const role of roles) {
        if (userRole._id.equals(role?._id)) {
          authorized = true;
          break;
        }
      }
    }

    if (!authorized) throw new AuthFailureError('Permission denied');

    return next();
  }),
);
