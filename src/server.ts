import serverless from "serverless-http";
import express from "express";
import { APIGatewayProxyEvent, Context } from "aws-lambda";


const app = express();
const handler = serverless(app, {});

app.get("/", (_req, res) => {
  res.send("<p>Hello World</p>");
});

export async function main(event: APIGatewayProxyEvent, context: Context) {
  const response = await handler(event, context);
  return response;
}