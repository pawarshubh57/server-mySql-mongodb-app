
const Crypto = require("crypto");

var encrypted = function(data){
    var cipher = Crypto.createCipher('aes-256-cbc', "mypassword");
        var encrypted = Buffer.concat([cipher.update(new Buffer(JSON.stringify(data), "utf8")), cipher.final()]);      
        return { message: encrypted};
}

module.exports = encrypted;


