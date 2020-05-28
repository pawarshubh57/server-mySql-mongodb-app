var CryptoJS = require("crypto-js");
var salt = 10;
const decryptObject = (ciphertext, secretKey) => {
    var bytes = CryptoJS.AES.decrypt(ciphertext, secretKey,{salt :10});
    var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    return decryptedData;
}

const decryptString = (ciphertext, secretKey) => {
    var bytes  = CryptoJS.AES.decrypt(ciphertext, secretKey, {salt: 10});
    var originalText = bytes.toString(CryptoJS.enc.Utf8);
    return originalText;
}

module.exports = {
    decryptObject,
    decryptString
}
