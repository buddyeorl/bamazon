var mysql = require('mysql');
var inquirer = require('inquirer');
var menuItemsForSale = [];
var globalInfo;
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '23642134aa',
  database : 'bamazonDB'
});
 
connection.connect();
 
connection.query('SELECT * FROM bamazonDB.products;', function (error, results, fields) {
  if (error) throw error;
  	console.log('Fields are ', fields);
  	console.log('The solution is: ', results);
 	globalInfo = results;
  	addLine(2);
	console.log(" ITEMS FOR SALE:")
	for (var i=0; i<results.length;i++)
	{
	menuItemsForSale[i]=results[i].product_name;
	console.log("item " + i + " : " +results[i].product_name + "   Price: $" + results[i].price);
	if (i===(results.length - 1))
	{
		addLine(2);
		firstMenu();
	}
	}

})
// connection.query("UPDATE `bamazonDB`.`products` SET `stock_quantity`='87' WHERE `item_id`='4';", function (error, results, fields) {
//  	if (error) throw error;
//  	console.log('The solution is: ', results);
// });



 
//connection.end();

function updateQty(itemQty, itemName)
{
connection.query("UPDATE `bamazonDB`.`products` SET `stock_quantity`='"+ itemQty +"' WHERE `product_name`='" +itemName+"';", function (error, results, fields) {
 	if (error) throw error;
});	
connection.end();
}



function addLine(howMany)
{
	for (var i = 0; i< howMany; i++)
	{
		console.log("======================================================")
	}
}

function firstMenu()
{
	inquirer.prompt([
	{
		type: 'list',
		name: "itemToPurchase",
		message: "Please pick the product you want to purchase:",
		choices: menuItemsForSale
	}]).then(function(customerChoice) 
	{	
		addLine(2);
		howManyMenu(customerChoice.itemToPurchase);
	});
}

function howManyMenu(itemToPurchase)
{
	inquirer.prompt([
	{
		name: "howMany",
		message: "How many " + itemToPurchase + " Do you want to purchase?",
	}]).then(function(customerChoice) 
	{	
		addLine(2);
		for (var i=0;i<globalInfo.length; i++)
		{
			if (globalInfo[i].product_name === itemToPurchase)
			{
				var updatedAmount = globalInfo[i].stock_quantity - customerChoice.howMany
				if (customerChoice.howMany <= globalInfo[i].stock_quantity && globalInfo[i].stock_quantity !== 0)
				{
					updateQty(updatedAmount, itemToPurchase);
					var totalSpent = globalInfo[i].price * customerChoice.howMany;
					console.log("You purchased: " + customerChoice.howMany + " " + itemToPurchase + " @ $" + globalInfo[i].price + " ea.");
					console.log("Your total is: $ " + totalSpent +".");
				} else if(customerChoice.howMany > globalInfo[i].stock_quantity)
				{
					addLine(2);
					console.log("Not enough in stock, Only " + globalInfo[i].stock_quantity + " available, please change the quantity");
					howManyMenu(itemToPurchase);
				} else
				{
					console.log("Sorry Item is Sold Out, Please order a different product");
					firstMenu();
				
				}
			}
		}
	});	
}



