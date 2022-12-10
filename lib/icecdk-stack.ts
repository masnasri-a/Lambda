import {
  CorsHttpMethod,
  HttpApi,
  HttpMethod,
} from '@aws-cdk/aws-apigatewayv2-alpha';
import {HttpLambdaIntegration} from '@aws-cdk/aws-apigatewayv2-integrations-alpha';
import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as dynamodb from "aws-cdk-lib/aws-dynamodb"

// import * as lambda from '@aws-cdk/aws-lambda'
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import * as path from 'path';
import { Runtime } from 'aws-cdk-lib/aws-lambda';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class IcecdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    const httpApi = new HttpApi(this, 'influencers', {
      description: 'HTTP API example',
      corsPreflight: {
        allowHeaders: [
          'Content-Type',
          'X-Amz-Date',
          'Authorization',
          'X-Api-Key',
        ],
        allowMethods: [
          CorsHttpMethod.OPTIONS,
          CorsHttpMethod.GET,
          CorsHttpMethod.POST,
          CorsHttpMethod.PUT,
          CorsHttpMethod.PATCH,
          CorsHttpMethod.DELETE,
        ],
        allowCredentials: true,
        allowOrigins: ['http://localhost:3000'],
      },
    });
    
    let influencer = new NodejsFunction(this, 'Influencer',{
      functionName: "Influencer",
      runtime: Runtime.NODEJS_14_X,
      entry: path.join(__dirname, `/../functions/function.ts`),
      handler: "handler",
      timeout:cdk.Duration.seconds(300)
  })
  
  new dynamodb.Table(this, 'IceTable', {
    tableName:"IceTable",
    partitionKey: { name: 'id', type: dynamodb.AttributeType.STRING },
    billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
  });


  httpApi.addRoutes({
    path: '/influencer/{id}',
    methods: [HttpMethod.GET, HttpMethod.DELETE],
    integration: new HttpLambdaIntegration(
      'influencer-integration',
      influencer,
    ),
  });


  httpApi.addRoutes({
    path: '/influencer',
    methods: [HttpMethod.ANY],
    integration: new HttpLambdaIntegration(
      'influencer-integration',
      influencer,
    ),
  });

  // 👇 add an Output with the API Url
  new cdk.CfnOutput(this, 'apiUrl', {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    value: httpApi.url!,
  });

    // The code that defines your stack goes here

    // example resource
    // const queue = new sqs.Queue(this, 'IcecdkQueue', {
    //   visibilityTimeout: cdk.Duration.seconds(300)
    // });
  }
}
