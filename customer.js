var inquirer = require("inquirer");
var mysql = require("mysql");
var Table = require('cli-table');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'Snowboarder1$',
  database : 'bamazonDB'
});
 
connection.connect(function(err){
  if (err) throw err;
  renderTable();
});
 
 function renderTable () {
  connection.query("SELECT * FROM products", function(err,res){
    if (err) throw err;
    console.log(res);
    displayTable(res)
  });
 }

function displayTable(obj) {
 var table = new Table({
    head: ['item_id', 'product_name', 'department_name', 'price','stock_quantity' ]
  , colWidths: [20, 20, 20, 10, 20]
  });

var newArray=[];
  for(var i = 0; i < obj.length; i++) {
    var newItemArray = [];
    newItemArray.push(obj[i].item_id, obj[i].product_name, obj[i].department_name, obj[i].price, obj[i].stock_quantity)
    newArray.push(newItemArray);
    table.push(newArray[i]);
  }; 
console.log(table.toString());

}

