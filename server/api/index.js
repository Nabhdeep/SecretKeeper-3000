import { Router } from "express";
import secrets from './secrets/index.js'

const router = new Router();

router.use('/secrets' , secrets)
export default router