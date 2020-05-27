const mySql = require("mysql");
var CryptoJS = require("crypto-js");
const Crypto = require("crypto");
var ciphertext = process.env.ENCRYPT_MYSQL;
// var bytes  = CryptoJS.AES.decrypt(ciphertext, 'secret key 123');
// var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
 
// console.log(decryptedData); // [{id: 1},{id: 2}]
var mySqlConnection = mySql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASS
});

var mysqlServer = function () {
    var server = mySqlConnection.connect((err) => {
        if (err)
            console.log("Error occured!");
        else
            console.log("Connection success");
    })
    return server;
}

module.exports = {
    mysqlServer
}