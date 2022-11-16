import { Request, Response } from "express";
import { handleError } from "../../errors/appError";
import transactionCashOutService from "../../services/transaction/transactionCashOut.service";
import transactionFilterService from "../../services/transaction/transactionFilter.service";

const transactionFilterController = async (req: Request, res: Response) => {
    try {
        const { filter } = req.query

        const { userId } = req;

        const response = await transactionFilterService(filter, userId)
    
        return res.json(response)
    } catch (err) {
        if (err instanceof Error) {
            handleError(err, res)
        }
    }
}

export default transactionFilterController