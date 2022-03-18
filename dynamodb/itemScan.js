const AWS = require("aws-sdk");
const config = require("./config.js");

AWS.config.update(config.local);
const docClient = new AWS.DynamoDB.DocumentClient();

const params = {
  TableName: "Movies",
  ProjectionExpression: "#yr, title, info.rating",
  FilterExpression: "#yr between :start_yr and :end_yr",
  ExpressionAttributeNames: {
    "#yr": "year",
  },
  ExpressionAttributeValues: {
    ":start_yr": 2012,
    ":end_yr": 2015
  }
};

console.log("Scanning Movies table.");
docClient.scan(params, onScan);

function onScan(err, data) {
  if (err) {
    console.error("Unable to scan the table. Error JSON:", JSON.stringify(err, null, 2));
  } else {
    // print all the movies
    console.log("Scan succeeded.");
    data.Items.forEach(function(movie) {
      console.log(
          movie.year + ": ", movie.title);
    });

    // continue scanning if we have more movies, because
    // scan can retrieve a maximum of 1MB of data
    if (typeof data.LastEvaluatedKey != "undefined") {
      console.log("Scanning for more...");
      params.ExclusiveStartKey = data.LastEvaluatedKey;
      docClient.scan(params, onScan);
    }
  }
}