/**
 * Query - All Movies Released in a Year with Certain Titles
 */

const AWS = require("aws-sdk");
const config = require("./config.js");

AWS.config.update(config.local);
const docClient = new AWS.DynamoDB.DocumentClient();

console.log("Querying for movies from 2013.");
const params = {
  TableName : config.tableName,
  KeyConditionExpression: "#yr = :yyyy and title between :letter1 and :letter2",
  ExpressionAttributeNames:{
    "#yr": "year"
  },
  ExpressionAttributeValues: {
    ":yyyy": 2013,
    ":letter1": "A",
    ":letter2": "L"
  }
};

docClient.query(params, function(err, data) {
  if (err) {
    console.log("Unable to query. Error:", JSON.stringify(err, null, 2));
  } else {
    console.log("Query succeeded.");
    data.Items.forEach(function(item) {
      console.log(" -", item.year + ": " + item.title
          + " ... " + item.info.genres
          + " ... " + item.info.actors[0]);
    });
  }
});