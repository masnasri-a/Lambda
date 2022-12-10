import { Handler } from "aws-lambda";
import { DynamoDBClient,ListTablesCommand,GetItemCommand } from "@aws-sdk/client-dynamodb";

const TABLE_NAME: string = "IceTable";

export const handler: Handler = async (event, context) => {
    // console.log(event);
    


    const httpMethod = event.httpMethod;
    if (httpMethod == "GET") {
      const username = event.queryStringParameters.username;

        const item = await getItem(username);
        return {
            statusCode: 200,
            body: JSON.stringify(item), 
        };
    }
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


async function getItem(name : string ) {

    const client = new DynamoDBClient({ region: "ap-southeast-1" });

    const params = {
        TableName: TABLE_NAME,
        Key: {
          KEY_NAME: { N: name },
        },
      };

      const data = await client.send(new GetItemCommand(params));
  console.log("Success", data.Item);
  return data;

    // const params : DynamoDB.DocumentClient.GetItemInput = {
    //     Key: {
    //     username: name,
    //   },
    //   TableName: TABLE_NAME,
    // };
    
    // return dynamo
    //   .get(params)
    //   .promise()
    //   .then((result) => {
    //     console.log(result);
    //     return result.Item;
    //   });
  }

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