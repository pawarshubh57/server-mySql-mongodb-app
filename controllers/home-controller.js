var mySqlserver = require("../database-config/my-sql-database-config");
console.log(global);
var connection = global.mySqlConnection;
console.log(connection);
const getUser = function (request, response) {
    connection.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
        con.query("select * from usermaster", function (err, result) {
          if (err) throw err;
          console.log("Result: " + result);
        });
      });
  
}

module.exports = {
    getUser
}