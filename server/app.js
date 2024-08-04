import http from 'http'
import express from './services/express/index.js'
import api from './api/index.js'
import {config} from './config.js'
import { connectMongoose } from './services/mongoose/index.js'

const app = express(config.apiRoot , api)
const server = http.createServer(app)

connectMongoose()
.then((c)=>{
    c.set({debug:true})
    console.log("Connected to Mongodb");
}).catch((err)=>{
    console.log(err);
    console.log("Error while connecting Mongoose");
})

setImmediate(()=>{
    server.listen(config.port ,config.ip, ()=>{
        console.log(`Express server listening on http://${config.ip}:${config.port}, in mode ${config.env}`);
    })
})


export default app