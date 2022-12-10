import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';

// import * as lambda from '@aws-cdk/aws-lambda'
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import * as path from 'path';
import { Runtime } from 'aws-cdk-lib/aws-lambda';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class IcecdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    
    
    new NodejsFunction(this, 'Influencer',{
      functionName: "Influencer",
      runtime: Runtime.NODEJS_14_X,
      entry: path.join(__dirname, `/../functions/function.ts`),
      handler: "handler",
      timeout:cdk.Duration.seconds(300)
  })

    // The code that defines your stack goes here

    // example resource
    // const queue = new sqs.Queue(this, 'IcecdkQueue', {
    //   visibilityTimeout: cdk.Duration.seconds(300)
    // });
  }
}
