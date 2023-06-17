import express from 'express';
import apikey from '../helpers/auth/apikey';
import permission from '../helpers/permission';

import helloRoutes from './hello';
import hello2Routes from './hello2';


const router = express.Router();
export enum Permission {
  GENERAL = 'GENERAL',
}

// router.use(apikey);
// router.use(permission(Permission.GENERAL));

/**
 * @openapi
 * /hello:
 *   get:
 *     description: Welcome to swagger-jsdoc!
 *     responses:
 *       200:
 *         description: Returns a mysteri string.
 */
router.use('/hello', helloRoutes);
router.use('/hello2', hello2Routes);


export default router;
