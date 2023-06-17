import { Request, Response } from 'express';
import HelloService from '../services/hello.service';
import { helloService } from '../services';
import { Author } from '@prisma/client';
import { SuccessResponse } from '../helpers/core/ApiResponse';
//
class HelloController {
  private _helloService:HelloService;

  constructor() {
    this._helloService = helloService;
  }

  sayHello = async (_req: Request, response: Response) => {
    const authors:Author[] = await this._helloService.getAllAuthors();
    return new SuccessResponse('Success!! fetched all authors', authors).send(response);

  };
}

export default HelloController;
