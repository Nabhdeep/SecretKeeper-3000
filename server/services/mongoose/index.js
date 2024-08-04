import mongoose from 'mongoose'
import {config} from '../../config.js'
export const connectMongoose = async ()=>{
    try {
        const _connection = mongoose.connect(config.mongo_uri , { useNewUrlParser: true,
            useUnifiedTopology: true, })
        return _connection
    } catch (error) {
        console.log(error);
        await mongoose.disconnect()
    }
}