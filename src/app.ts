import express, { NextFunction, Request, Response } from 'express';
import { prisma } from './database';
import { corsUrl, environment } from './config';
import cors from 'cors';
import Logger from './helpers/core/Logger';
import {
  ApiError,
  ErrorType,
  InternalError,
  NotFoundError,
} from './helpers/core/ApiError';
import routes from './routes';
import swaggerJsdoc from 'swagger-jsdoc';
import * as swaggerUi   from 'swagger-ui-express';
const swaggerOption =  {
  swaggerDefinition: {  
    info: {  
        title:'API Server',  
        version:'1.0.0'  
    }  
},  
apis:['src/app.ts','src/routes/index.ts'],   // files containing annotations as above
};




process.on('uncaughtException', (e) => {
  Logger.error(e);
});

const app = express();

app.use(express.json({ limit: '10mb' }));
app.use(
  express.urlencoded({ limit: '10mb', extended: true, parameterLimit: 50000 }),
);
app.use(cors({ origin: corsUrl, optionsSuccessStatus: 200 }));

const specs = swaggerJsdoc(swaggerOption);
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(specs)
);



// Routes
app.use('/', routes);


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
app.get('/', async (req: Request, res: Response) => {
  const allUsers = await prisma.author.findMany();
  return res.send(allUsers);
});

// catch 404 and forward to error handler
app.use((req, res, next) => next(new NotFoundError()));

// Middleware Error Handler
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {


  
  if (err instanceof ApiError) {
    ApiError.handle(err, res);
    if (err.type === ErrorType.INTERNAL)
      Logger.error(
        `500 - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`,
      );
  } else {
    Logger.error(
      `500 - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`,
    );
    Logger.error(err);
    if (environment === 'development') {
      return res.status(500).send(err);
    }
    ApiError.handle(new InternalError(), res);
  }
});

export default app;
