import { Request, Response } from "express";
import { handleError } from "../../errors/appError";
import userCaptureService from "../../services/user/userCapture.service";


const userCaptureController = async (req: Request, res: Response) => {
    try {
        const { userId } = req;

        const response = await userCaptureService(userId)

        return res.json(response)
    } catch (err) {
        if (err instanceof Error) {
            handleError(err, res)
        }
    }
}

export default userCaptureController