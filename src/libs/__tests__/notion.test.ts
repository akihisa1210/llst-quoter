import { rest } from "msw";
import { setupServer } from "msw/node";
import { Notion } from "../notion";

describe("Notion", () => {
  const dummyResponse = {
    object: "list",
    results: [
      {
        object: "page",
        id: "11111111-1111-1111-1111-11111111",
        created_time: "2021-10-06T00:00:00.000Z",
        last_edited_time: "2021-10-06T00:00:00.000Z",
        cover: null,
        icon: null,
        parent: {
          type: "database_id",
          database_id: "00000000-0000-0000-0000-00000000",
        },
        archived: false,
        properties: {
          ID: {
            id: "aaaa",
            type: "number",
            number: 1,
          },
          Lesson: {
            id: "title",
            type: "title",
            title: [
              {
                type: "text",
                text: {
                  content: "test-lesson-1",
                  link: null,
                },
                annotations: {
                  bold: false,
                  italic: false,
                  strikethrough: false,
                  underline: false,
                  code: false,
                  color: "default",
                },
                plain_text: "test-lesson-1",
                href: null,
              },
            ],
          },
          ChapterNumber: {
            id: "aaaa",
            type: "number",
            number: 2,
          },
          ChapterName: {
            id: "aaaa",
            type: "rich_text",
            rich_text: [
              {
                type: "text",
                text: {
                  content: "test-chapter-name-2",
                  link: null,
                },
                annotations: {
                  bold: false,
                  italic: false,
                  strikethrough: false,
                  underline: false,
                  code: false,
                  color: "default",
                },
                plain_text: "test-chapter-name-2",
                href: null,
              },
            ],
          },
        },
        url: "https://www.notion.so/1234",
      },
    ],
    next_cursor: null,
    has_more: false,
  };

  const mockServer = setupServer(
    rest.post(
      "https://api.notion.com/v1/databases/:database_id/query",
      (_, res, ctx) => {
        return res(ctx.status(200), ctx.json(dummyResponse));
      }
    )
  );

  it("get a quote from the database", async () => {
    mockServer.listen();

    const notion = new Notion("dummy-token");

    const databaseId = "00000000-0000-0000-0000-00000000";

    const lesson = await notion.getQuote(databaseId, 1);
    expect(lesson.id).toEqual(1);
    expect(lesson.lesson).toEqual("test-lesson-1");
    expect(lesson.chapterNumber).toEqual(2);
    expect(lesson.chapterName).toEqual("test-chapter-name-2");

    mockServer.close();
  });
});
