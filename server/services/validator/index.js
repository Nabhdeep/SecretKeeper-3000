import Joi from 'joi'


export const encryptRequestSchema = Joi.object({
    uuid: Joi.string().required(),
    ttl:Joi.number().required(),
    maxAccess:Joi.number().required(),
    passphrase:Joi.string().required().allow(""),
    encryptedMessage:Joi.string().required()
})


export const findRequestSchema = Joi.object({
    uuid: Joi.string().required(),
    passphrase:Joi.string().required().allow(""),
})

