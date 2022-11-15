import { Request, Response } from "express";
import { handleError } from "../../errors/appError";
import accountBalanceService from "../../services/account/accountBalance.service";


const accountCaptureController = async (req: Request, res: Response) => {
    try {
        const { userId } = req;

        const response = await accountBalanceService(userId)

        return res.status(200).json(response)
    } catch (err) {
        if (err instanceof Error) {
            handleError(err, res)
        }
    }
}

export default accountCaptureController