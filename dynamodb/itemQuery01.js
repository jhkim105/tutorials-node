/**
 * Query - All Movies Released in a Year
 */

const AWS = require("aws-sdk");
const config = require("./config.js");

AWS.config.update(config.local);
const docClient = new AWS.DynamoDB.DocumentClient();

console.log("Querying for movies from 2013.");
const params = {
  TableName : config.tableName,
  KeyConditionExpression: "#yr = :yyyy",
  ExpressionAttributeNames:{
    "#yr": "year"
  },
  ExpressionAttributeValues: {
    ":yyyy": 2013
  }
};

docClient.query(params, function(err, data) {
  if (err) {
    console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
  } else {
    console.log("Query succeeded.");
    data.Items.forEach(function(item) {
      console.log(" -", item.year + ": " + item.title);
    });
  }
});