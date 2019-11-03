// require packages
var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require('cli-table');

// connect to sql 
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
    initialPrompt();
  });

function initialPrompt() {

    inquirer.prompt([{

        type: "confirm",
        name: "confirm",
        message: "Welcome to Bamazon! Would you like to view our product inventory?",
        default: true

    }]).then(function(user) {
        if (user.confirm === true) {
            tableDisplay();
        } else {
            console.log("Have a wonderful day!");
        }
    });
}

//display database in a table
function tableDisplay() {

    var table = new Table({
        head: ['ID', 'Item', 'Department', 'Price', 'Stock'],
        colWidths: [10, 30, 30, 30, 30]
    });

    productInventory();

    function productInventory() {

        connection.query("SELECT * FROM products", function(err, res) {
            for (var i = 0; i < res.length; i++) {

                var itemId = res[i].id,
                    productName = res[i].product_name,
                    departmentName = res[i].department_name,
                    price = res[i].price,
                    stockQuantity = res[i].stock_quantity;

              table.push(
                  [itemId, productName, departmentName, price, stockQuantity]
            );
          }
            
            // console.log(table.toString());
            console.log("table" + table);
            customerPurchase();
        });
    }
}

//customer purchase
function customerPurchase() {

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
                console.log("Oh no! Insufficient quantity.");
                customerPurchase();

            } else {
                console.log("Hooray! Your item is in stock!");
                console.log("You've selected:");
                console.log("Item: " + res[i].product_name);
                console.log("Department: " + res[i].department_name);
                console.log("Price: " + res[i].price);
                console.log("Quantity: " + userOrder.inputNumber);
                console.log("Total: " + res[i].price * userOrder.inputNumber);
                
                var newStock = (res[i].stock_quantity - userOrder.inputNumber);
                var purchaseId = (userOrder.inputId);
                console.log("Updated stock total: " + newStock);
               
            }
        }
    });
});
}
