var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",

  port: 3306,

  user: "root",

  password: "rootroot",
  database: "bamazon_DB"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    start();
  });

  function start() {

    inquirer.prompt([{

        type: "input",
        message: "What is the ID number of the item you would like to purchase?",
        name: "inputId",
    },
    {
        type: "input",
        message: "How many units of this item would you like to purchase?",
        name: "inputNumber",

    }

]).then(function(userOrder) {

   connection.query("SELECT * FROM products WHERE id=?", userOrder.inputId, function(err, res) {
        for (var i = 0; i < res.length; i++) {

            if (userOrder.inputNumber > res[i].stock_quantity) {
                console.log("Insufficient quantity!");
                start();

            } else {
                console.log("Confirmation, your order can be fulfilled.");
                console.log("You've selected:");
                console.log("Item: " + res[i].product_name);
                console.log("Department: " + res[i].department_name);
                console.log("Price: " + res[i].price);
                console.log("Quantity: " + userOrder.inputNumber);
                console.log("Total: " + res[i].price * userOrder.inputNumber);
                
                var newStock = (res[i].stock_quantity - userOrder.inputNumber);
                var purchaseId = (userOrder.inputId);
                console.log("new stock total: " + newStock);
               
            }
        }
    });
});
}
