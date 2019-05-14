const { expect } = require("chai");
const {
  getNewArticles,
  createArticleRef,
  updateArticleFunction
} = require("../utils/seedUtils");

describe("getNewArticles", () => {
  it(" returns a timestamp to the current date ", () => {
    const arr = [
      {
        title: "Running a Node App",
        topic: "coding",
        author: "jessjelly",
        body:
          "This is part two of a series on how to get up and running with Systemd and Node.js. This part dives deeper into how to successfully run your app with systemd long-term, and how to set it up in a production environment.",
        created_at: 1471522072389
      }
    ];
    expect(getNewArticles(arr)).to.eql([]);
  });
});

describe("createArticleRef", () => {
  it("returns an object with the article ID", () => {
    const arr = [
      {
        article_id: 1,
        title: "Running a Node App",
        body:
          "This is part two of a series on how to get up and running with Systemd and Node.js. This part dives deeper into how to successfully run your app with systemd long-term, and how to set it up in a production environment.",
        votes: 0,
        topic: "coding",
        author: "jessjelly",
        created_at: "2016-08-18T13:07:52.389+01:00"
      }
    ];

    const actual = createArticleRef(arr);
    expect(actual).to.eql({ "Running a Node App": 1 });
  });
});

describe.only("updateArticleFunction", () => {
  it("returns an object with article ID instead of belongs_to", () => {
    const lookupObj = { "Running a Node App": 1 };
    const arr = [
      {
        title: "Running a Node App",
        topic: "coding",
        author: "jessjelly",
        body:
          "This is part two of a series on how to get up and running with Systemd and Node.js. This part dives deeper into how to successfully run your app with systemd long-term, and how to set it up in a production environment.",
        created_at: 1471522072389
      }
    ];
    const expected = [
      {
        article_id: 1,
        topic: "coding",
        author: "jessjelly",
        body:
          "This is part two of a series on how to get up and running with Systemd and Node.js. This part dives deeper into how to successfully run your app with systemd long-term, and how to set it up in a production environment.",
        created_at: 1471522072389
      }
    ];
    expect(updateArticleFunction(arr, lookupObj)).to.eql(expected);
  });
});
