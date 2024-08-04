import mongoose, {Schema} from 'mongoose'

// uuid,encryptedMessage, ttl, maxAccess, passphrase

export const _secretsSchema = new Schema({
    encryptedMessage:{type:String , required:true},
    maxAccess:{type:Number , default:1},
    ttl:{type:Number, default:3600},
    passphrase:{type:String , default:""},
    uuid:{type:String , required:true}
},{timestamps:true})
_secretsSchema.index({uuid:1} , {unique:true})

export const SecretModel = mongoose.model('secrets' , _secretsSchema)
