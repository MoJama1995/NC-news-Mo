process.env.NODE_ENV = "test";

const chai = require("chai");
const { expect } = chai;
const chaiSorted = require("chai-sorted");
const request = require("supertest");

const app = require("../app");
const connection = require("../db/connection");

chai.use(chaiSorted);

describe.only("/api", () => {
  beforeEach(() => connection.seed.run());
  after(() => connection.destroy());

  describe("/topics", () => {
    it("GET status:200 and has a body property", () => {
      return request(app)
        .get("/api/topics")
        .expect(200)
        .then(({ body }) => {
          expect(body.topics[0]).to.haveOwnProperty("slug");
        });
    });
  });
  describe("/articles", () => {
    it("GET status: 200, it GETS all articles and has all properties as stated in the read me", () => {
      return request(app)
        .get("/api/articles")
        .expect(200)
        .then(({ body }) => {
          expect(body.articles[0]).to.haveOwnProperty("author");
          expect(body.articles[0]).to.haveOwnProperty("title");
          expect(body.articles[0]).to.haveOwnProperty("article_id");
          expect(body.articles[0]).to.haveOwnProperty("body");
          expect(body.articles[0]).to.haveOwnProperty("topic");
          expect(body.articles[0]).to.haveOwnProperty("created_at");
          expect(body.articles[0]).to.haveOwnProperty("votes");
          expect(body.articles[0]).to.haveOwnProperty("comment_count");
          console.log(body.articles[0]);
        });
    });
    it("GET status: 200, it gets a single article and has all properties as stated in the read me", () => {
      return request(app)
        .get("/api/articles/1")
        .expect(200)
        .then(({ body }) => {
          expect(body.article.topic).to.eql("mitch");
        });
    });
    it("GET request : 200 and filters for authorname", () => {
      return request(app)
        .get("/api/articles?author=butter_bridge")
        .expect(200)
        .then(({ body }) => {
          expect(body.articles[0].author).to.eql("butter_bridge");
        });
    });
    it("GET request : 200 and filters for topics", () => {
      return request(app)
        .get("/api/articles?topic=mitch")
        .expect(200)
        .then(({ body }) => {
          expect(body.articles[0].topic).to.eql("mitch");
        });
    });
    it("GET request : 200 and sorts by articles by author ", () => {
      return request(app)
        .get("/api/articles?order=asc")
        .expect(200)
        .then(({ body }) => {
          expect(body.articles[0].author).to.eql("butter_bridge");
        });
    });
    it.only("GET Request : 200 and returns article based on articleID", () => {
      return request(app)
        .get("/api/articles/12")
        .expect(200)
        .then(({ body }) => {
          expect(body.article.topic).to.eql("mitch");
          expect(body.article.created_at).to.eql(
            "1974-11-26T12:21:54.171+00:00"
          );
          expect(body.article.comment_count).to.eql("0");
        });
    });
    it("PATCH status: 200 responds with an updated vote count", () => {
      return request(app)
        .patch("/api/articles/12")
        .send({ inc_votes: 1 })
        .expect(200)
        .then(({ body }) => {
          expect(body.articles[0].article_id).to.eql(12);
          expect(body.articles[0].votes).to.eql(1);
        });
    });
    it("GET status : 200 and responds with all of the comments belonging to an article", () => {
      return request(app)
        .get("/api/articles/17/comments")
        .expect(200)
        .then(({ body }) => {
          expect(body.comments.length).to.eql(0);
        });
    });
    it("POST status : 201 and responds with an added new comment", () => {
      return request(app)
        .post("/api/articles/11/comments")
        .send({
          username: "rogersop",
          body: "lol"
        })
        .expect(201)
        .then(({ body }) => {
          expect(body.comment[0]).to.haveOwnProperty("author");
          expect(body.comment[0]).to.haveOwnProperty("created_at");
        });
    });
  });
  describe("/comments", () => {
    it("Patch status:200 and has an updated comment votes", () => {
      return request(app)
        .patch("/api/comments/12")
        .send({ inc_votes: 1 })
        .expect(200)
        .then(({ body }) => {
          expect(body.comments[0].comments_id).to.eql(12);
          expect(body.comments[0].votes).to.eql(0);
        });
    });
    it("Delete status:204 and has removed comments", () => {
      return request(app)
        .del("/api/comments/18")
        .expect(204);
    });
  });
  describe("/users", () => {
    it("Get Status : 200 and returns a user and username", () => {
      return request(app)
        .get("/api/users/rogersop")
        .expect(200)
        .then(({ body }) => {
          expect(body[0].username).to.eql("rogersop");
          expect(body[0].avatar_url).to.eql(
            "https://avatars2.githubusercontent.com/u/24394918?s=400&v=4"
          );
          expect(body[0].name).to.eql("paul");
        });
    });
  });

  describe("Articles errors", () => {
    it("GET status:400 responds with error message when request is made with a bad ID", () => {
      return request(app)
        .get("/api/articles/invalid_id")
        .expect(400)
        .then(res => {
          expect(res.body.msg).to.equal("invalid input, integers expected");
        });
    });
    it("Articles Get Status: 404 responds with error message when request is made with a well formed ID but not an existing ID", () => {
      return request(app)
        .get("/api/articles/9999")
        .expect(404)
        .then(res => {
          expect(res.body.msg).to.equal("Not found");
        });
    });
    it("Comments PATCH Status: 404 responds with error message when request is made with a well formed ID but not an existing ID", () => {
      return request(app)
        .patch("/api/comments/9999")
        .send({ votes: 1 })
        .expect(404)
        .then(res => {
          expect(res.body.msg).to.equal("Comment not found");
        });
    });
    it("Articles POST status: 405 - responds with invalid HTTP request", () => {
      return request(app)
        .post("/api/articles/17/")
        .send({
          username: "tickle122",
          body: "lol"
        })
        .expect(405)
        .then(res => {
          expect(res.body.msg).to.eql("Method Not Allowed");
        });
    });
    it("Articles post status: 422 responds with Error Message when a request is made that could be unprocessable", () => {
      return request(app)
        .post("/api/articles/17/comments")
        .send({
          username: "mrbean",
          body: 22
        })
        .expect(422)
        .then(res => {
          expect(res.body.msg).to.eql("user does not exist");
        });
    });
    it("ARTICLES get: returns a 404 if the topic does not exist", () => {
      return request(app)
        .get(`/api/articles?topic=not-a-topic`)
        .expect(404);
    });
    it("ARTICLES get: returns a 404 if the author does not exist", () => {
      return request(app)
        .get(`/api/articles?author=not-an-author`)
        .expect(404);
    });
    it("ARTICLES get: returns a 400 if the column does not exist", () => {
      return request(app)
        .get(`/api/articles?sort_by=not-a-column`)
        .expect(400)
        .then(res => {
          expect(res.body.msg).to.eql("column does not exist");
        });
    });
    it("ARTICLES get: returns a 400 if the column does not exist", () => {
      return request(app)
        .get(`/api/articles?sort_by=not-a-column`)
        .expect(400)
        .then(res => {
          expect(res.body.msg).to.eql("column does not exist");
        });
    });
  });
  describe("topic errors", () => {
    it("topics PATCH status: 405 responds with error message when HTTP method is not allowed", () => {
      return request(app)
        .patch("/api/topics")
        .send({
          slug: "footie",
          description: " none whatsoever"
        })
        .expect(405)
        .then(res => {
          expect(res.body.msg).to.eql("Method Not Allowed");
        });
    });
  });
});
