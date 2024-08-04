import axios from 'axios'
import { defaultValues } from '../utils/defaultValus.js';


const axiosInstance = ()=>{
    return axios.create({
        baseURL:defaultValues.BASEURI,
    })
}

export const sendSecret = (data)=>{
    return axiosInstance().post("/api/secrets" ,data)
    .then((res)=> res.data)
    .catch(err=>{throw err})
}

export const getSecret = (data)=>{
    return axiosInstance().post(`/api/secrets/find` , data)
    .then((res)=> res.data)
    .catch(err=>{throw err})
}
