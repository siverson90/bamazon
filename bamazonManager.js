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
  renderManagerQs();
});

function renderManagerQs(){
  inquirer.prompt([
  {
    type: "list",
    message: "What would you like to do?",
    name: "managerDisplay",
    choices: [
      "View Products for Sale",
      "View Low Inventory",
      "Add to Inventory",
      "Add New Product"
    ]
  },
  ]).then(function(response){
    console.log(response);
      
      switch (response.managerDisplay) {
        case 'View Products for Sale':
          console.log("the user wants to" + response.managerDisplay);
          tableSqlData();
          break;
        case 'View Low Inventory':
          console.log("the user wants to" + response.managerDisplay);
          getLowInventory();
          break;
        case 'Add to Inventory':
          console.log("the user wants to" + response.managerDisplay);
          // run query that shows item and allows to add
          break;
        case 'Add New Product':
          console.log("the user wants to" + response.managerDisplay);
          // run through entire process of adding item
          break;
        default:
          console.log('error on the case/switch');
      }

  });
}

 function tableSqlData () {
  connection.query("SELECT * FROM products", function(err,res){
    if (err) throw err;
    renderTable(res)
  });
 }

 function renderTable(obj) {
  this.table = new Table({
    head: ['item_id', 'product_name', 'department_name', 'price','stock_quantity' ]
  , colWidths: [10, 20, 20, 10, 17]
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
}

function getLowInventory() {
  var lowInventoryThreshold = 5;
  var query = ("SELECT * FROM products WHERE stock_quantity < 5");
  connection.query(query, function(err,res){
    if (err) throw err;
    renderTable(res);
  })
}

 