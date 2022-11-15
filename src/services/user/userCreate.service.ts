import prisma from "../../database"
import { IUserCreate } from "../../interfaces/user"
import bcrypt from "bcryptjs"


const userCreateService = async ({username, password}: IUserCreate) => {

    const balance = await prisma.account.create({
        data: {
            balance: 100
        }
    })

    const user = await prisma.user.create({
        data: {
            username,
            password: bcrypt.hashSync(password,10),
            accountId: balance.id
        }
    })

    return {...user, password: undefined}
}

export default userCreateService