import { Request, Response } from "express";
import prisma from "../../database";


const userAll = async (req: Request, res: Response) => {
    const users = await prisma.user.findMany({
        include: {
            account: true
        }
    })

    return res.json(users)
}

export default userAll