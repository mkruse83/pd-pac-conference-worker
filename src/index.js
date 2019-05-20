const getFirstOp = require("./getFirstOp");
const addTalk = require("./addTalk");
const callLambdaAsync = require("./helper/callLambdaAsync");

exports.handler = async (event, context) => {
    console.log(
        "START pd-pac-conference-worker; event:",
        JSON.stringify(event, null, 2),
        "context: ",
        JSON.stringify(context, null, 2)
    );

    const op = await getFirstOp();
    if (op) {
        switch (op.op) {
            case "addTalk":
                await addTalk(op);
                break;
            default:
                throw new Error("cannot handle");
        }
        const nextOp = await getFirstOp();
        if (nextOp) {
            await callLambdaAsync();
        }
    }
    return {
        statusCode: 202,
    }
};
