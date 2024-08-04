import { Router } from "express";
import { encryptStore , findMessage } from "./controller.js";
import { jwtMiddlware } from '../../services/auth/index.js'
export { SecretModel } from './model.js'
import { validateMiddleware } from "../../services/handler/index.js";
import { encryptRequestSchema, findRequestSchema } from "../../services/validator/index.js";
const router = new Router();

router.post('/' , validateMiddleware(encryptRequestSchema) ,encryptStore)
router.post('/find', validateMiddleware(findRequestSchema),findMessage)

export default router