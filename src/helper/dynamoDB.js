const AWS = require("aws-sdk");

AWS.config.apiVersions = {
    dynamodb: "2012-08-10",
};

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports = dynamoDb;
