import { NextFunction, Request, Response } from "express";
import prisma from "../../database";
import { IUserCreate } from "../../interfaces/user";

const verifyLoginMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username, password }: IUserCreate = req.body;

  const errors = [];

  // verificando os tipos de cada campo
  if (typeof username != "string") {
    errors.push({ username: "Type error" });
  }

  if (typeof password != "string") {
    errors.push({ password: "Type error" });
  }

  if (errors.length > 0) {
    return res.status(400).json(errors);
  }

  next();
};

export default verifyLoginMiddleware;