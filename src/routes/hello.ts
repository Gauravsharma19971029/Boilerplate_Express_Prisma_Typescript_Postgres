import express from 'express';
import HelloController from '../controllers/hello.controller';

const router = express.Router();

/**
 * @openapi
 * /:
 *   get:
 *     description: Welcome to swagger-jsdoc!
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 */
router.get('/', new HelloController().sayHello);

export default router;
