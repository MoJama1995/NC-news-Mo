const { expect } = require("chai");
const { getNewArticles } = require("../utils/seedUtils");

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
