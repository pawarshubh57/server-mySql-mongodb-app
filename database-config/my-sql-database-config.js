const mySql = require("mysql");
var CryptoJS = require("crypto-js");
var decrypt = require("../crypto-activity/decrypt");
var dotEnv = require('dotenv').config();
console.log(dotEnv);
var decryptData = {};
var encryptMySql =  process.env["ENCRYPT_MYSQL"];
if(!encryptMySql) {
    var ciphertext = process.env["ENCRYPT_MYSQL"];
    var decryptData = decrypt.decryptObject(ciphertext, "sanato");
    console.log(decryptData);
}

var mySqlConnection = mySql.createConnection({
    host: decryptData.host,
    port: decryptData.port,
    database: decryptData.database,
    user: decryptData.user,
    password: decryptData.passwords
}).on("connect", () => { 
    global.mySqlConnection = mySqlConnection();      
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
const mySqlDbServer = () =>
  new Promise((resolve, reject) => {
    const mySqlClient = mySql.createConnection({
        host: decryptData.host,
        port: decryptData.port,
        database: decryptData.database,
        user: decryptData.user,
        password: decryptData.passwords
    })
    mySqlClient.on('connect', function () {
      console.log('Database connection with MongoDb Driver succeeded!!');
      console.log('=======================================================================');
    });
    mySqlClient.connect()
      .then(client => {
        global.mySqlDbClient = mySqlClient;       
        resolve(mySqlDbClient);
      })
      .catch(error => {
        console.log(error);
      });
  });

export default mongoDbServer;

module.exports = {
    mySqlConnection
}