import { default as userRouter } from "./user";
import { Router } from "express";
const apiVersion = "v1";

const router = Router();

router.use(`/${apiVersion}/user`, userRouter);

export default router;
