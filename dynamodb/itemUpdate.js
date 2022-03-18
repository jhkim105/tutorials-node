const AWS = require("aws-sdk");
const config = require('./config.js');

AWS.config.update(config.local);

const docClient = new AWS.DynamoDB.DocumentClient()

let year = 2015;
let title = "The Big New Movie";

// Update the item, unconditionally,

const params = {
  TableName: config.tableName,
  Key:{
    "year": year,
    "title": title
  },
  UpdateExpression: "set info.rating = :r, info.plot=:p, info.actors=:a",
  ExpressionAttributeValues:{
    ":r":5.5,
    ":p":"Everything happens all at once.",
    ":a":["Larry", "Moe", "Curly"]
  },
  ReturnValues:"UPDATED_NEW"
};

console.log("Updating the item...");
docClient.update(params, function(err, data) {
  if (err) {
    console.error("Unable to update item. Error JSON:", JSON.stringify(err, null, 2));
  } else {
    console.log("UpdateItem succeeded:", JSON.stringify(data, null, 2));
  }
});