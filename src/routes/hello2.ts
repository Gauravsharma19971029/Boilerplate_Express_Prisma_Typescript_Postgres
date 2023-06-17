import express from 'express';
import Hello2Controller from '../controllers/hello2.controller';

const router = express.Router();

/** 
 * @swagger 
 * /Employees: 
 *   get: 
 *     description: Get all Employee 
 *     responses:  
 *       200: 
 *         description: Success  
 *   
 */
router.get('/', new Hello2Controller().sayHello);

export default router;
