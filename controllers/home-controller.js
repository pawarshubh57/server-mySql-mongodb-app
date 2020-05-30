const globalAny = global;
var connection = globalAny.mySqlConnection
console.log(connection);
const getUser = function (request, response) {
  connection.query("select * from usermaster", function (err, result) {
    if (err) throw err;
    console.log("Result: " + result);
  });
}

module.exports = {
  getUser
}