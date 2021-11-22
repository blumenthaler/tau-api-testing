const app = require("../src/app");
const request = require("supertest");
const expect = require("chai").expect;

describe("response", () => {
  // check value of ID for desired value, structured in the body
  it("json response", () => {
    request(app)
      .get("/course")
      .end((err, res) => {
        expect(res.body.id).to.be.equal("1");
      });
  });

  // check simply if text has desired value (not based on structure)
  it("text response", () => {
    request(app)
      .get("/course")
      .end((err, res) => {
        expect(res.text).to.contain("1");
      });
  });

  // returns 200 status code
  it("status response", () => {
    request(app)
      .get("/course")
      .end((err, res) => {
        expect(res.ok).to.be.true;
      });
  });
});
