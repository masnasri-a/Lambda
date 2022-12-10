import { Handler } from "aws-lambda";
import { DynamoDBClient,ListTablesCommand } from "@aws-sdk/client-dynamodb";

const TABLE_NAME: string = "influencer";

export const handler: Handler = async (event, context) => {
    // console.log(event);
    

    
    // const httpMethod = event.httpMethod;
    // if (httpMethod == "GET") {
    //     const item = await scan();
    //     return {
    //         statusCode: 200,
    //         body: JSON.stringify(item), 
    //     };
    // }
    // else if (httpMethod == "POST") {
    //   return await save(event);
    // } else if (httpMethod == "DELETE") {
    //   const username = event.queryStringParameters.username;
    //   if (username !== undefined) {
    //     const item = await deletes(username);
    //     return {
    //       statusCode: 200,
    //       body: JSON.stringify(item),
    //     };
    //   } else {
    //     const message = "Nobody was greeted with that name";
    //     return {
    //       statusCode: 200,
    //       body: JSON.stringify(message),
    //     };
    //   }
    // }
};


async function scan() {
    console.log("SCAN");
    
    const client = new DynamoDBClient({ region: "ap-southeast-1" });

  const command = new ListTablesCommand({});
  try {
    const results = await client.send(command);
    return results
  } catch (err) {
    console.error(err);
  }

}