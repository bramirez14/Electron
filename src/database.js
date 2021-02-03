const mysql = require('promise-mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'gym'
});

function getConnection() {
  return connection;
}

module.exports = { getConnection };
