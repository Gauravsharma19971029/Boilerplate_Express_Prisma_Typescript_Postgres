import { Author, PrismaClient } from '@prisma/client';

class HelloService {
  private _db;

  constructor(prisma: PrismaClient) {    
    this._db = prisma;
  }

  public async getAllAuthors():Promise<Author[]> {
    return await this._db.author.findMany();
  }
}

export default HelloService;
