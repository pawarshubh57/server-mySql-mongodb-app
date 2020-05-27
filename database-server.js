console.clear();
const Express = require("express");
const Cors = require("cors");
const BodyParser = require("body-parser");
const App = Express();
const fs = require("fs");
var https = require("https");
var CryptoJS = require("crypto-js");
var MySqlServer = require("./database-config/my-sql-database-config");
var DbServer = MySqlServer.mysqlServer();
const Crypto = require("crypto");
var encrypt = require("./crypto-activity/encrypt");

App.use(BodyParser.urlencoded({
    extended: true,
    limit: "60mb"
}));
App.use(BodyParser.json());

App.use(Cors());

App.get('/',(req, res) => {   
   res.send("Api is up and running");
});

App.post('/', (req, res) => {
     var body = req.body;
     var host = body.host;
     process.env["DB_HOST"] = host;
     console.log("Process Env:" + process.env.DB_HOST);
     var ciphertext = encrypt(body);
     var decipher = Crypto.createDecipher("aes-256-cbc", "mypassword");
     var decrypted = Buffer.concat([decipher.update(ciphertext), decipher.final()]);
     console.log(JSON.parse(decrypted.toString()));
     /*
     var ciphertext = CryptoJS.AES.encrypt(JSON.stringify(body), 'secret key 123').toString();
     process.env["ENCRYPT_MYSQL"]= ciphertext;
     console.log("DbServer: " +DbServer);
     console.log(ciphertext);
     console.log(body);
     res.send(body);
     */
})

var option = {
    key : fs.readFileSync("./certificates/device.key"),
    cert: fs.readFileSync("./certificates/device.crt")
}

var server = https.createServer(option, App);
const port = process.env.PORT || 3400;
server.listen(port, function(){
    var serverDetails  = this.address();
    console.log(serverDetails);
    console.log("===========================================================");
    console.log(`p-mapper server is running and up at ${JSON.stringify(serverDetails)}`);
    console.log("===========================================================");
});
