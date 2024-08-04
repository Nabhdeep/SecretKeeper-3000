import { Router } from "express";
import secrets from './secrets/index.js'
import { limiter } from "../services/handler/index.js";
const router = new Router();

router.use('/secrets' ,limiter ,secrets)
export default router