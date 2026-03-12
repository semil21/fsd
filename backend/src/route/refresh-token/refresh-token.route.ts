import express from "express"
import { refreshTokenController } from "../../controller/refresh-token/refresh-token.controller";

const refreshTokenRouter = express.Router();

refreshTokenRouter.post("/refresh-token", refreshTokenController)

export default refreshTokenRouter