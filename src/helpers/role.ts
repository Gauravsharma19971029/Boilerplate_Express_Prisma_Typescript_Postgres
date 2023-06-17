// import { RoleCode } from '../database/model/Role';
// import { RoleRequest } from 'app-request';
import { Response, NextFunction } from 'express';

export default (...roleCodes: any[]) =>
  (req: any, res: Response, next: NextFunction) => {
    req.currentRoleCodes = roleCodes;
    next();
  };
