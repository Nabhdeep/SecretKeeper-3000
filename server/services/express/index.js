import express from "express"
import bodyParser from "body-parser"
import cors from "cors"
import morgan from 'morgan'
import { config } from "../../config.js"
export default (apiRoot , routes)=>{
    const app = express()
    app.use(cors())
    app.use(morgan('dev'))
    app.use(bodyParser.urlencoded({limit:'10mb' , extended:true}))
    app.use(bodyParser.json({limit:'10mb'}))
    app.use(apiRoot , routes)
    
    
    return app
}