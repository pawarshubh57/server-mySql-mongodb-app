console.clear();
const Express = require("express");
const Cors = require("cors");
const BodyParser = require("body-parser");
const ExpressPath = require("express-path");
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

var encryptData = encrypt.encryptObject({
    host: "localhost",
    port: 3306,
    database: "sanato",
    user: "root",
    password: "root@123"
}, "sanato");
process.env["ENCRYPT_MYSQL"] = encryptData;
console.log("Process env: " + process.env["ENCRYPT_MYSQL"]);
dotEnv.parsed.ENCRYPT_MYSQL = encryptData;

var mySql = require("./database-config/my-sql-database-config");
Promise.resolve(mySql._connect()).then(() => {
    ExpressPath(App, routes);
    App.get('/', function (req, res) {
        fs.readFile(__dirname + "/" + "index.html", 'utf8', function (err, data) {
            console.log(data);
            res.end(data);
        });
    });
    App.post('/', (req, res) => {
        var body = req.body;
        res.send(encryptData);
    });
    var option = {
        key: fs.readFileSync("./certificates/device.key"),
        cert: fs.readFileSync("./certificates/device.crt")
    };
    var server = https.createServer(option, App);
    const port = process.env.PORT || 3400;
    server.listen(port, function () {
        var serverDetails = this.address();
        console.log(serverDetails);
        console.log("===========================================================");
        console.log(`sanato server is running and up at ${JSON.stringify(serverDetails)}`);
        console.log("===========================================================");
    });
}).catch();