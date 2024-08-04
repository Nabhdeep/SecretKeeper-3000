import { encryptRequestSchema } from "../validator/index.js";

export function responseHandler(res, statusCode, status, data , isError=false) {
    return res.status(statusCode).json({
      status: status,
      [!isError ?"data" :"error"]: data
    });
}

export const validateMiddleware=(schema)=>(req, res, next)=>{
  const {error} = schema.validate(req.body , {abortEarly:false})

  if(error){
    const errors = error.details.map(detail => detail.message);
    return responseHandler(res, 400, 'fail', { ...errors } , true);
  }
  next();
}

