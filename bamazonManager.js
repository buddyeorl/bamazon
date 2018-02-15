var mysql = require('mysql');
var inquirer = require('inquirer');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '23642134aa',
  database : 'bamazonDB'
});

connection.connect();

//to be worked on later.