import type { AWS } from "@serverless/typescript";
import { handlerPath } from "@libs/handlerResolver";

type ServerlessFunctionConfiguration = AWS["functions"][string];

const config: ServerlessFunctionConfiguration = {
  handler: `${handlerPath(__dirname)}/handler.main`,
  environment: {
    NOTION_TOKEN: "${ssm:/llst-quoter-notion-token}",
    NOTION_DATABASE_ID: "${ssm:/llst-quoter-notion-database-id}",
  },
  events: [
    {
      schedule: {
        rate: ["rate(1 day)"],
      },
    },
  ],
};

export default config;
