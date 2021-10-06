import { Notion } from "../../libs/notion";
import { LLST_COUNT } from "../../libs/llst";

export const main = async (): Promise<void> => {
  const llstCount = LLST_COUNT;
  const lessonId = Math.floor(Math.random() * llstCount) + 1;
  const notion = new Notion(process.env.NOTION_TOKEN);
  const lesson = await notion.getQuote(
    process.env.NOTION_DATABASE_ID,
    lessonId
  );
  console.log(`鉄則${lessonId.toString().padStart(3, "0")}: ${lesson}`);

  // const slackComment = { body: lesson };
  // const slack = new Slack(auth);
  // slack.postComment();

  console.log("Done!");
  return;
};
