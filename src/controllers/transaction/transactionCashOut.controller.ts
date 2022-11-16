import { Request, Response } from "express";
import { handleError } from "../../errors/appError";
import transactionCashOutService from "../../services/transaction/transactionCashOut.service";


const transactionCashOutController = async (req: Request, res: Response) => {
    try {
        const { username, value } = req.body
        const { userId } = req

        const response = await transactionCashOutService({username, value, userId})
    
        return res.json(response)
    } catch (err) {
        if (err instanceof Error) {
            handleError(err, res)
        }
    }
}

export default transactionCashOutController