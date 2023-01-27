import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { LambdaRestApi } from "aws-cdk-lib/aws-apigateway";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { Runtime } from "aws-cdk-lib/aws-lambda";
import path from "path";

export class PdfGeneratorStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const apiProxy = new NodejsFunction(this, "api-proxy", {
      entry: path.join(__dirname, "../src/server.ts"),
      handler: "main",
      memorySize: 256,
      timeout: cdk.Duration.seconds(15),
      runtime: Runtime.NODEJS_18_X,
    });

    const api = new LambdaRestApi(this, "api", {
      handler: apiProxy,   
    });

    new cdk.CfnOutput(this, "api-url", {
      description: "API Gateway URL",
      value: api.url,
    })
  }
}
