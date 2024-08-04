import jwt from 'jsonwebtoken'
import {config} from '../../config.js'
export const token = (body)=>jwt.sign(body ,config.jwt_secret , {
    expiresIn:'10m'
})
export const verify = (token)=>jwt.verify(token , config.jwt_secret)