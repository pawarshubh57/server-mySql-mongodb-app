const mysql = require("mysql");
var CryptoJS = require("crypto-js");
var decrypt = require("../crypto-activity/decrypt");
var dotEnv = require('dotenv').config();
console.log(dotEnv);
var decryptData = {};
var encryptMySql = process.env["ENCRYPT_MYSQL"];
if (encryptMySql) {
  var ciphertext = process.env["ENCRYPT_MYSQL"];
  var decryptData = decrypt.decryptObject(ciphertext, "sanato");
  console.log(decryptData);
}
const globalAny = global;

const mySql = mysql.createConnection(decryptData).on("connect", () => {
  console.log("=========================================================================");
  console.log("MySQL Database connection succeeded");
  console.log("=========================================================================");
}).on("error", (err) => {
  console.log("=========================================================================");
  console.log(JSON.stringify(err));
  console.log("=========================================================================");
}).on("end", (err) => {
  console.log("=========================================================================");
  console.log(JSON.stringify(err));
  console.log("=========================================================================");
});

_connect = () => new Promise((resolve, reject) => {
  mySql.connect((err) => {
    if (err) {
      console.log(err);
      reject(err);
    }
    globalAny.mySqlConnection = mySql;
    resolve(mySql);
  });
});

module.exports._connect = _connect;