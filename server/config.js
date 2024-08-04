import dotenv from 'dotenv'


dotenv.config()

const config = {
    ip: process.env.IP,
    port:process.env.PORT,
    env:process.env.ENV,
    apiRoot: process.env.apiRoot,
    jwt_secret:process.env.JWT_SECRET,
    mongo_uri: process.env.MONGO_URI,
}


export {config}