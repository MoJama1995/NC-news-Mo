process.env.NODE_ENV = "test";

const { expect } = require("chai");
const request = require("supertest");

const app = require("../app");
const connection = require("../db/connection");

describe("/api", () => {
  beforeEach(() => connection.seed.run());
  after(() => connection.destroy());

  describe("/topics", () => {
    it("GET status:200 and has a body property", () => {
      return request(app)
        .get("/api/topics")
        .expect(200)
        .then(({ body }) => {
          expect(body.topics).to.haveOwnProperty("slug");
        });
    });
  });
  // describe("/articles", () => {

  // });
});

module;
