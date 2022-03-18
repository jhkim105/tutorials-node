const AWS = require("aws-sdk");
const config = require("./config.js");

AWS.config.update(config.local);

const docClient = new AWS.DynamoDB.DocumentClient();

let year = 2015;
let title = "The Big New Movie";

const params = {
  TableName: config.tableName,
  Key:{
    "year": year,
    "title": title
  },
  ConditionExpression:"info.rating <= :val",
  ExpressionAttributeValues: {
    ":val": 5.5
  }
};

console.log("Attempting a conditional delete...");
docClient.delete(params, function(err, data) {
  if (err) {
    console.error("Unable to delete item. Error JSON:", JSON.stringify(err, null, 2));
  } else {
    console.log("DeleteItem succeeded:", JSON.stringify(data, null, 2));
  }
});