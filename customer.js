var inquirer = require("inquirer");
var mysql = require("mysql");
var Table = require('cli-table');
var clc = require('cli-color');

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
    // console.log(res);
    displayTable(res)
  });
 }

function displayTable(obj) {
  this.table = new Table({
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
    var showTable = table.toString();

    // var msg = clc.xterm(163).bgXterm(253);
  console.log(showTable);
  userOptions(obj);
}

function userOptions(obj){

  inquirer.prompt([
  {
    type: 'input',
    message: 'What item would you like to buy? (Please enter based on item-id)',
    name: 'item_id'
  },
  {
    type: 'input',
    message: 'How many units would you like to buy?',
    name: "stock_quantity"
  }
  ]).then(function(userResponse){
    var query = ("SELECT * FROM products WHERE ?");
    connection.query(query,{ item_id: userResponse.item_id}, function(err,dataResponse){
        if (err) throw err;

        if(userResponse.stock_quantity > dataResponse[0].stock_quantity) {
          console.log("Insufficent Quantity");
          runPrompt();
        }
        else {
          console.log("Great we can fill your order");
          var updateProduct = dataResponse[0].stock_quantity - userResponse.stock_quantity;
          var query = ("UPDATE products SET ? WHERE ?");
          connection.query(query,
            [
              {
                stock_quantity: updateProduct
              },
              {
                item_id: userResponse.item_id
              }
            ], 
            function(err,results){
              if (err) throw err;
              // console.log('changed ' + results.changedRows + ' rows');
              var customerTotal = dataResponse[0].price * userResponse.stock_quantity;
              // Need to round and only show 2 decimal places
              console.log("Your total will be $" + customerTotal);
              runPrompt();
          });

        }
      });
  });
}

function runPrompt() {
  inquirer.prompt([
  {
    type: 'confirm',
    message: 'Would you like to purchase something else?',
    name: 'confirm'
  }
  ]).then(function(response){
    if(response.confirm === true){
      renderTable();
    }
    else{
      console.log("Have a great day! See you next time");
    }
  });
}

