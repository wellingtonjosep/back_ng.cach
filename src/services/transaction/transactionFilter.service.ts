import prisma from "../../database"

const transactionFilterService = async (filter: any, userId: string) => {
    const user = await prisma.user.findUnique({
        where: {
            id: userId
        },
        include: {
            account: true
        }
    })

    // pegar todas as trasações onde o debitedAccountId é igual o id do usuario
    if (filter === "cash-out") {
        const cashOut = await prisma.transaction.findMany({
            where: {
                debitedAccountId: user!.account.id
            }
        })
        
        return cashOut
    }

    // pegar todas as trasações onde o creditedAccountId é igual o id do usuario
    if (filter === "cash-in") {
        const cashIn = await prisma.transaction.findMany({
            where: {
                creditedAccountId: user!.account.id
            }
        })
        
        return cashIn
    }

    // pegar todas as trasações do usuario
    const total = await prisma.transaction.findMany({
        where: {
            OR: [
                {
                    creditedAccountId: user!.account.id
                },
                {
                    debitedAccountId: user!.account.id
                }
            ]
        }
    })

    return total
}

export default transactionFilterService