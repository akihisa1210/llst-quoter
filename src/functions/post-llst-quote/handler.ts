export const main = async (event): Promise<void> => {
  console.log(`Invoked by event: ${event}`);
  console.log("1. Get a quote from Notion database");
  console.log("2. Post the quote to Slack");
  console.log("Done!");
  return;
};
