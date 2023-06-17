import { NextFunction, Request, Response } from 'express';
import IHello from '../models/hello';
import HelloService from '../services/hello.service';
import { helloService } from '../services';
import { ForbiddenError, NoEntryError } from '../helpers/core/ApiError';
//
class Hello2Controller {
  private _helloService: HelloService;

  constructor() {
    this._helloService = helloService;
  }

  sayHello = async (_req: Request, response: Response, next: NextFunction) => {
    try {
      const authors = await this._helloService.getAllAuthors();
      throw new ForbiddenError();
    } catch (err: any) {
      next(err);
    }
    // response.send(authors);
  };
}

export default Hello2Controller;
