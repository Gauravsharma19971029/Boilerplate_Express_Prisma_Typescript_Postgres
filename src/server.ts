import * as dotenv from 'dotenv';
dotenv.config();
import Logger from './helpers/core/Logger';
import { port } from './config';
import app from './app';



app
  .listen(port, () => {
    Logger.info(`server running on port : http://localhost:${port}`);
  })
  .on('error', (e) => Logger.error(e));
