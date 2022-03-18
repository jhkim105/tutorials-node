const AWS = require("aws-sdk");
const config = require('./config.js');

AWS.config.update(config.local);

const docClient = new AWS.DynamoDB.DocumentClient();

const table = "Movies";

let year = 2015;
let title = "The Big New Movie";

const params = {
  TableName: table,
  Key:{
    "year": year,
    "title": title
  }
};

docClient.get(params, function(err, data) {
  if (err) {
    console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
  } else {
    console.log("GetItem succeeded:", JSON.stringify(data, null, 2));
  }
});