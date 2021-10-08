import { Notion } from "../../libs/notion";
import { LLST_COUNT } from "../../libs/llst";
import { WebClient } from "@slack/web-api";

export const main = async (): Promise<void> => {
  const llstCount = LLST_COUNT;
  const lessonId = Math.floor(Math.random() * llstCount) + 1;
  const notion = new Notion(process.env.NOTION_TOKEN);
  const lesson = await notion.getQuote(
    process.env.NOTION_DATABASE_ID,
    lessonId
  );

  const web = new WebClient(process.env.SLACK_TOKEN);
  const channel = process.env.SLACK_CHANNEL;
  const res = await web.chat.postMessage({
    channel,
    text: `鉄則${lessonId.toString().padStart(3, "0")}: ${lesson}`,
  });
  console.log(`Message sent: ${res.ts}`);

  return;
};
