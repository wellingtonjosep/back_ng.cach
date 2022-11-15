import { Router } from "express";

import userCreateController from "../controllers/user/userCreate.controller";
import userLoginController from "../controllers/user/userLogin.controller";

import verifyUserMiddleware from "../middlewares/user/verifyUser.middleware";
import verifyLoginMiddleware from "../middlewares/user/verifyLogin.middleware";

const router = Router();

export default router;

router.post("/users", verifyUserMiddleware ,userCreateController)
router.post("/users/login", verifyLoginMiddleware, userLoginController)