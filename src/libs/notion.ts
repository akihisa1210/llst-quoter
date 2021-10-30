import { Client } from "@notionhq/client";
import { DatabasesQueryResponse } from "@notionhq/client/build/src/api-endpoints";
import {
  NumberPropertyValue,
  RichTextPropertyValue,
  TitlePropertyValue,
} from "@notionhq/client/build/src/api-types";
import { Lesson } from "./llst";

export class Notion {
  private notion: Client;

  constructor(token: string) {
    this.notion = new Client({ auth: token });
  }

  async getQuote(databaseId: string, lessonId: number): Promise<Lesson> {
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

    const chapterNumberProperty = res.results[0].properties[
      "ChapterNumber"
    ] as NumberPropertyValue;
    const chapterNumber = chapterNumberProperty.number;

    const chapterNameProperty = res.results[0].properties[
      "ChapterName"
    ] as RichTextPropertyValue;
    const chapterName = chapterNameProperty.rich_text[0].plain_text;

    return {
      id: lessonId,
      lesson,
      chapterNumber,
      chapterName,
    };
  }
}
