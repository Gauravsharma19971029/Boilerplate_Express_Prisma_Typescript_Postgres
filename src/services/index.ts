import { prisma } from "../database";
import HelloService from "./hello.service";



export const helloService = new HelloService(prisma);