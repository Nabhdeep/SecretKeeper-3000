import { SecretModel } from "./index.js"
import { token, verify } from "../../services/jwt/index.js"
import { responseHandler } from '../../services/handler/index.js'

const secrets = new Map();

export const encryptStore = ({body} , res)=>{
    return new Promise ((resolve , reject)=>{
        try {
            const {uuid,encryptedMessage, ttl, maxAccess, passphrase } = body;
            SecretModel.create(body)
            .then((res)=>{
                resolve(uuid)
            }).catch((err)=>{
                reject(err)
            })
        } catch (error) {
            reject(error)
        }
    }).then(uuid=>responseHandler(res , 200 , 'success' , {'id':uuid}))
    .catch(err=>responseHandler(res , 500 , 'fail' , {'message':'something went wrong'} , true))
}


export const findMessageV1 = ({body} , res)=>{
    let errorThrown = false
    return new Promise ((resolve , reject)=>{
        try {
            const map = secrets.get(body.uuid)
            if(!map){
                errorThrown = true
                reject({"message": "no message found"})
            }
            if (map.passphrase != body.passphrase) {
                errorThrown = true
                reject({"message": "incorrect password"})
            }
            resolve(map)   
        } catch (error) {
            reject(error)
        }
    }).then((message)=>{
        responseHandler(res , 200 , 'success' , message)
    }).catch((err)=>{
        console.log(err);
        if(errorThrown){
            responseHandler(res , 400 , 'fail' ,err ,true)
        }else{
            responseHandler(res , 500 , 'fail' , {'message':'something went wrong'} , true)
        }
    })
}


export const findMessage = ({body} , res)=>{
    let errorThrown = true
    return SecretModel.findOne({uuid:body.uuid},{_id:0 , __v:0})
    .then((map)=>{
        switch (true){
            case !map:
                throw {"message": "no message found"}
            case (parseInt(Date.now()/1000)) > (parseInt(Date.now()/1000)+map.ttl):
                throw {"message": "Message expired."}
            case map.maxAccess<=0:
                throw {"message": "Access limit exceeded."}
            case map.passphrase != body.passphrase:
                throw {"message": "incorrect password"}
            default:
                errorThrown = false
        }
        responseHandler(res , 200 , 'success' , map)
        return map
    })
    .then((map)=>{
        SecretModel.updateOne({uuid:map.uuid},{$set:{maxAccess:map.maxAccess-1}})
        .then((res)=>{
            console.log(`======= ${map.uuid} ======= Updated!`);
        })
        .catch((err)=>{
            throw err
        })
    })
    .catch((err)=>{
        if(errorThrown){
            return responseHandler(res , 400 , 'fail' ,err ,true)
        }else{
            return responseHandler(res , 500 , 'fail' , {'message':'something went wrong'} , true)
        }
    })
}