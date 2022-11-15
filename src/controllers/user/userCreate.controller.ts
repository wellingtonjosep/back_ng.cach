import { Request, Response } from "express"
import { handleError } from "../../errors/appError"
import userCreateService from "../../services/user/userCreate.service"


const userCreateController = async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body

        const response = await userCreateService({username, password})

        return res.status(201).json(response)
    } catch (err) {
        if (err instanceof Error) {
            handleError(err, res)
        }
    }
}

export default userCreateController