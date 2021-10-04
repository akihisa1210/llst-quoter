import type { AWS } from "@serverless/typescript";

import postLlstQuote from "@functions/post-llst-quote";

const serverlessConfiguration: AWS = {
  service: "llst-quoter",
  frameworkVersion: "2",
  configValidationMode: "error",
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ["aws-sdk"],
      target: "node14",
      define: { "require.resolve": undefined },
      platform: "node",
    },
  },
  plugins: ["serverless-esbuild"],
  provider: {
    name: "aws",
    region: "us-east-2",
    runtime: "nodejs14.x",
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
      NODE_OPTIONS: "--enable-source-maps --stack-trace-limit=1000",
    },
    lambdaHashingVersion: "20201221",
  },
  functions: { postLlstQuote },
};

module.exports = serverlessConfiguration;
