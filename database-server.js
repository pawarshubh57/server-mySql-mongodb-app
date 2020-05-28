console.clear();
const Express = require("express");
const Cors = require("cors");
const BodyParser = require("body-parser");
const ExpressPath =  require("express-path");
const App = Express();
const fs = require("fs");
const https = require("https");
const routes = require("./routes/app-router");
var dotEnv = require('dotenv').config()
var encrypt = require("./crypto-activity/encrypt");
var dotEnv = require('dotenv').config();
App.use(BodyParser.urlencoded({
    extended: true,
    limit: "60mb"
}));
App.use(BodyParser.json());

App.use(Cors());

ExpressPath(App, routes);
App.get('/', function (req, res) {
    fs.readFile( __dirname + "/" + "index.html", 'utf8', function (err, data) {
        console.log( data );
        res.end( data );
    });
 })
// App.get('/', (req, res) => {
//     console.log(process.env);
//     res.send("Api is up and running!!");
// });

App.post('/', (req, res) => {
    var body = req.body;
    var encryptData = encrypt.encryptObject(body, "sanato");    
    process.env["ENCRYPT_MYSQL"] = encryptData; 
    console.log("Process env: "+ process.env["ENCRYPT_MYSQL"]);
   
    dotEnv.parsed.ENCRYPT_MYSQL = encryptData;
    res.send(encryptData);
})

var option = {
    key: fs.readFileSync("./certificates/device.key"),
    cert: fs.readFileSync("./certificates/device.crt")
}

var server = https.createServer(option, App);
const port = process.env.PORT || 3400;
server.listen(port, function () {
    var serverDetails = this.address();
    console.log(serverDetails);
    console.log("===========================================================");
    console.log(`sanato server is running and up at ${JSON.stringify(serverDetails)}`);
    console.log("===========================================================");
});