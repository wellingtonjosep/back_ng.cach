import { Router } from "express";

import userCreateController from "../controllers/user/userCreate.controller";
import userLoginController from "../controllers/user/userLogin.controller";

import accountBalanceController from "../controllers/account/accountBalance.controller";

import transactionCashOutController from "../controllers/transaction/transactionCashOut.controller";
import transactionFilterController from "../controllers/transaction/transactionFilter.controller";

import verifyUserMiddleware from "../middlewares/user/verifyUser.middleware";
import verifyLoginMiddleware from "../middlewares/user/verifyLogin.middleware";
import verifyTokenMiddleware from "../middlewares/user/verifyToken.middleware";
import verifyTransactionMiddleware from "../middlewares/transaction/verifyTransaction.middleware";

const router = Router();

export default router;

router.post("/users", verifyUserMiddleware ,userCreateController)
router.get("/users/balance", verifyTokenMiddleware ,accountBalanceController)
router.post("/users/login", verifyLoginMiddleware, userLoginController)
router.patch("/users/cash-out", verifyTokenMiddleware, verifyTransactionMiddleware, transactionCashOutController)
router.get("/users/transactions", verifyTokenMiddleware, transactionFilterController)


