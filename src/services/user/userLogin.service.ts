import prisma from "../../database";
import { AppError } from "../../errors/appError";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { IUserCreate } from "../../interfaces/user";

const userLoginService = async ({ username, password }: IUserCreate) => {
  const user = await prisma.user.findUnique({
    where: {
      username: username,
    },
  });

  if (!user) {
    throw new AppError(401, "Wrong username/password");
  }

  if (!bcrypt.compareSync(password, user.password)) {
    throw new AppError(401, "Wrong username/password");
  }

  const token = jwt.sign({ id: user.id }, String(process.env.JWT_SECRET), {
    expiresIn: "1d",
  });

  return { token: token, userId: user.id };
};

export default userLoginService;
