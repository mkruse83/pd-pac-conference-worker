const dynamoDb = require("./helper/dynamoDB");

module.exports = (op) => {
    const params = {
        TransactItems: []
    };
    const talks = op.talks;
    const talksToAdd = talks.splice(0, 8);
    talksToAdd.forEach((talk) => {
        params.TransactItems.push({
                Put: {
                    Item: talk,
                    TableName: "pac-conference",
                }
            }
        )
    });
    if (talks.length === 0) {
        params.TransactItems.push({
            Delete: {
                Key: {
                    partkey: op.partkey,
                    sortkey: op.sortkey,
                },
                TableName: "pac-conference-ops",
            }
        })
    } else {
        op.talks = talks;
        params.TransactItems.push({
            Put: {
                Item: op,
                TableName: "pac-conference-ops",
            }
        })
    }


    return new Promise((resolve, reject) => {
        dynamoDb.transactWrite(params, function (err, data) {
            if (err) {
                console.log("ERROR:", err, err.stack);
                reject(err);
                return;
            }
            console.log("SUCCESS:", data);
            resolve();
        });
    });
};
