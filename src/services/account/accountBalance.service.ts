import prisma from "../../database";
import { AppError } from "../../errors/appError";

const accountCaptureService = async (id: string) => {

  const user = await prisma.user.findUnique({
    where: {
        id: id
    },
    include: {
        account: true
    }
  })

  if (!user) {
    throw new AppError(404, "User not found")
  }

  return {...user.account, userId: user.id}
};

export default accountCaptureService;