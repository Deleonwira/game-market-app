let mysql = require("mysql");

let connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "catmid_app"
});

connection.connect((err) => {
    if (err) {
        console.log("Error connecting to database: ", err);
        return;
    }
    console.log("Connected to database");
});

module.exports = connection;
