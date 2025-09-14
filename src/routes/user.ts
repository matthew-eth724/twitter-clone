import { Router } from "express";
import passport from "passport";
import { localStrategy } from "../strategies/index";
import { auth } from "../middleware/index";

const router = Router();

export default router;
