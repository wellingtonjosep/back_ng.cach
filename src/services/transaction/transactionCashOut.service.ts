import prisma from "../../database";
import { ITransaction } from "../../interfaces/transaction";

const transactionCashOutService = async ({
  username,
  value,
  userId,
}: ITransaction) => {
  const user = await prisma.user.findUnique({
    where: {
      username: username,
    },
    include: {
      account: true,
    },
  });

  const userOwner = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    include: {
        account: true
    }
  });

  // adicionando valor no outro usuario
  const userUpdate = await prisma.user.update({
    where: {
      id: user!.id,
    },
    data: {
      account: {
        update: {
          balance: user!.account.balance + value,
        },
      },
    }
  });

  // retirando o valor do usuario
  const userOwnerUpdate = await prisma.user.update({
    where: {
      id: userOwner!.id,
    },
    data: {
      account: {
        update: {
          balance: userOwner!.account.balance - value,
        },
      },
    },
  });

  // criando a transação
  const transaction = await prisma.transaction.create({
    data: {
        creditedAccountId: user!.account.id,
        debitedAccountId: userOwner!.account.id,
        value: value
    }
  })

  return transaction;
};

export default transactionCashOutService;
