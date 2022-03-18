const AWS = require("aws-sdk");
const config = require("./config.js");

AWS.config.update(config.local);

const docClient = new AWS.DynamoDB.DocumentClient();

let year = 2015;
let title = "The Big New Movie";

const params = {
  TableName:config.tableName,
  Item:{
    "year": year,
    "title": title,
    "info":{
      "plot": "Nothing happens at all.",
      "rating": 0
    }
  }
};

console.log("Adding a new item...");
docClient.put(params, function(err, data) {
  if (err) {
    console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
  } else {
    console.log("Added item:", JSON.stringify(data, null, 2));
  }
});