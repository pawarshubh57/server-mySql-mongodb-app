
var CryptoJS = require("crypto-js");

const  encryptObject = function(plainObject, secretKey){
    var ciphertext = CryptoJS.AES.encrypt(JSON.stringify(plainObject), secretKey).toString();
    return ciphertext;
}
const encryptString = function(plainText, secretKey){
    var ciphertext = CryptoJS.AES.encrypt(plainText, secretKey).toString();
    return ciphertext;
}


module.exports = {
    encryptObject,
    encryptString
} 


