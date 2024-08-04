import CryptoJS from 'crypto-js';


export function generateID (){
    return crypto.randomUUID()
}

export  const encryptMessage = (plainText)=>{
    const key =  CryptoJS.lib.WordArray.random(64).toString();
    const ciphertext = CryptoJS.AES.encrypt(plainText,key).toString();
    console.log(ciphertext);
    return [ciphertext , key]
}

export const decryptMessage = (encrMsg , key)=>{
    const bytes = CryptoJS.AES.decrypt(encrMsg, key);
    const originalText = bytes.toString(CryptoJS.enc.Utf8);
    return originalText
}

export const hashSHA256 = (message) => {
    return CryptoJS.SHA256(message).toString(CryptoJS.enc.Hex);
};