import { NextFunction, Request, Response } from "express";
import prisma from "../../database";

const verifyTransactionMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username, value } = req.body;

  const { userId } = req;

  const user = await prisma.user.findUnique({
    where: {
        username: username
    }
  })

  const userOwner = await prisma.user.findUnique({
    where: {
        id: userId
    },
    include: {
        account: true
    }
  })

  const errors = [];

  if (typeof username != "string") {
    errors.push({ username: "Type error" });
  }

  if (typeof value != "number") {
    errors.push({ value: "Type error" });
  }

  if (errors.length > 0) {
    return res.status(400).json(errors);
  }


  if (!userOwner) {
    return res.status(404).json({message: "User not found"})
  }

  if (!user) {
    return res.status(404).json({message: "User not found"})
  }

  if (user.id === userId) {
    return res.status(403).json({message: "The transfer user id is identical to yours"})
  }

  if (userOwner.account.balance < value) {
    return res.status(403).json({message: "Insufficient funds"})
  }

  next()
};

export default verifyTransactionMiddleware
