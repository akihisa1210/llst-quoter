import { Client } from "@notionhq/client";
import { DatabasesQueryResponse } from "@notionhq/client/build/src/api-endpoints";
import { TitlePropertyValue } from "@notionhq/client/build/src/api-types";

export class Notion {
  private notion: Client;

  constructor(token: string) {
    this.notion = new Client({ auth: token });
  }

  async getQuote(databaseId: string, lessonId: number) {
    const res: DatabasesQueryResponse = await this.notion.databases.query({
      database_id: databaseId,
      filter: {
        property: "ID",
        number: {
          equals: lessonId,
        },
      },
    });

    if (res.results.length !== 1) {
      throw new Error(`There are multiple results! lesson ID: ${lessonId}`);
    }

    const lessonProperty = res.results[0].properties[
      "Lesson"
    ] as TitlePropertyValue;
    const lesson = lessonProperty.title[0].plain_text;
    return lesson;
  }
}
