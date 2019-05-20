const dynamoDb = require("./helper/dynamoDB");


module.exports = () => {
    const params = {
        TableName: "pac-conference-ops",
        KeyConditionExpression: "#id = :op",
        ExpressionAttributeNames: {
            "#id": "partkey"
        },
        ExpressionAttributeValues: {
            ":op": "op",
        },
        Limit: 1
    };

    return new Promise((resolve, reject) => {
        dynamoDb.query(params, function (err, data) {
            if (err) {
                console.log("ERROR:", err, err.stack);
                reject(err);
                return;
            }
            console.log("SUCCESS:", data);
            resolve(data.Items[0]);
        });
    });
};
