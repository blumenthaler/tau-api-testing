const nock = require("nock");
const request = require("supertest");
const expect = require("chai").expect;

describe("mock response", () => {
  // before running the tests, set up a mock response with an array of user(s)
  // here the server is not running
  beforeEach(() => {
    nock("http://localhost:4000")
      .get("/users")
      // set up with multiple iterations; one interception removes it from the list
      // chain `twice` or `thrice`
      .twice()
      .reply(
        200,
        { users: [{ id: "1" }] }
        //ALT: "users 1" (this broke, not sure if still supported)
      );
  });

  // check the response for desired value (array of users, first user id === 1)
  it("nock intercepts", () => {
    request("http://localhost:4000")
      .get("/users")
      .end((err, res) => {
        expect(res.body.users[0].id).to.be.equal("1");
      });
  });
});
