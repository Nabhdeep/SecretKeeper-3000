import { verify } from "../jwt/index.js"

export const jwtMiddlware = (req , res , next)=>{
    try {
        const timestamp = parseInt(Date.now().toString().slice(0,10))
        if (!req.headers?.token) return res.status(401).json({"status":"fail" , "data":{"messgae":"unauthorised"}})
        const {id , iat , exp} = verify(req.headers.token)
        if (timestamp>exp) return res.status(401).json({"status":"fail" , "data":{"messgae":"unauthorised"}})
        next()
    } catch (error) {
        return res.status(500).json({"status":"fail" , "data":{"messgae":"something went wrong"}})
    } 
}