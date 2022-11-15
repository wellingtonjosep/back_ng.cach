import { NextFunction, Request, Response } from "express";
import prisma from "../../database";
import { IUserCreate } from "../../interfaces/user";

const verifyUserMiddleware = async (
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

  if (username.length < 3) {
    return res
      .status(400)
      .json({ username: "username must contain at least 3 characters" });
  }

  // verificação de password
  if (password.search(/^.*(?=.{8,})(?=.*[A-Z])(?=.*\d).*$/)) {
    return res
      .status(400)
      .json({
        password:
          "password must contain at least 8 characters, a number and an uppercase letter.",
      });
  }

  // verificando se o username ja existe
  const user = await prisma.user.findUnique({
    where: {
      username: username,
    },
  });

  if (user) {
    return res.status(400).json({ username: "Username already exists" });
  }

  next();
};

export default verifyUserMiddleware;
