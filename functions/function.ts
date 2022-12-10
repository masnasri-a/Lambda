import { Handler } from "aws-lambda";
import { DynamoDBClient, ListTablesCommand, GetItemCommand, DynamoDB, QueryCommand } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand, GetCommand } from "@aws-sdk/lib-dynamodb";

const TABLE_NAME: string = "IceTable";

export const handler: Handler = async (event, context) => {
    console.log(event);



    const httpMethod: string = event.routeKey
    // if (httpMethod == "GET") {
    if (httpMethod.includes("GET")) {
        const ids = event.pathParameters.id;
        if (ids) {

            console.log(event.pathParameters);

            const item = await getItem(ids);
            return {
                statusCode: 200,
                body: JSON.stringify(item.Item),
            };
        } else {
            const item = await getAll();
            return {
                statusCode: 200,
                body: JSON.stringify(item),
            };
        }
    } else if (
        httpMethod.includes("ANY")
    ) {
        let obj = JSON.parse(event.body);
        console.log(obj);
        await post(obj)
        return {
            statusCode: 200,
            body: JSON.stringify(obj),
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

async function getAll() {
    const client = new DynamoDBClient({ region: "ap-southeast-1" });

    const params = {
        TableName: TABLE_NAME,
        KeyConditionExpression: 'pk = :pk',
        // ExpressionAttributeValues: marshall({ ':pk': partitionKey }),
        Limit: 1000,
    };

    const data = await client.send(new QueryCommand(params));
    console.log("Success", JSON.stringify(data));
    return data;
}

async function getItem(name: string) {

    const client = new DynamoDBClient({ region: "ap-southeast-1" });

    const params = {
        TableName: TABLE_NAME,
        Key: {
            id: name

        },
    };

    const data = await client.send(new GetCommand(params));
    console.log("Success", data.Item);
    return data;
}

async function post(item: any) {
    const client = DynamoDBDocumentClient.from(new DynamoDB({}))
    await client.send(
        new PutCommand({
            TableName: TABLE_NAME,
            Item: item,
        })
    );
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