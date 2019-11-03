var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require('cli-table');

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

//list options
  function initialPrompt() {

    inquirer.prompt([{

        type: "list",
        name: "actionList",
        message: "Please select an option:",
        choices: ["View Products For Sale", "View Low Inventory", "Add To Inventory", "Add New Product"]

    }]).then(function(user) {
        if (user.actionList === "View Products For Sale") {
            inventoryView();
        } else if (user.actionList === "View Low Inventory") {
            lowInventory();
        } else if (user.actionList === "Add To Inventory") {
            addInventory();
        } else {
            addProduct();
        }
    });

    function viewProducts () {

    }
}

    function viewLowInventory() {

    }

    function addToInventory() {
        
    }