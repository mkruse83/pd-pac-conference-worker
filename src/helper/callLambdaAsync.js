const AWS = require("aws-sdk");

const lambda = new AWS.Lambda({
  region: "eu-central-1"
});

module.exports = () => {
  return new Promise((resolve, reject) => {
    lambda.invoke(
        {
          FunctionName: "pd-pac-conference-worker-" + process.env.PD_PAC_ENVIRONMENT,
          InvocationType: "Event"
        },
        (error, data) => {
          console.log("result from call", data, "error", error);
          if (error) {
            reject(error);
            return;
          }
          if (data.StatusCode !== 202) {
            console.log("ERROR:", data);
            reject(new Error("request error."));
          }
          resolve(data);
        }
    );
  });
};
