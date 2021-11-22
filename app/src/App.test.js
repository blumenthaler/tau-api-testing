import React from "react";
import { render } from "@testing-library/react";
import App from "./App";
import Users from "./components/users.component";
import nock from "nock";

beforeEach(() => {
  nock("http://localhost:4000")
    .get("/users")
    .reply(
      200,
      {
        users: [
          {
            _id: "1",
            name: "axios",
            email: "mock@nock.com",
          },
          {
            _id: "2",
            name: "learn react",
            email: "mock@nock.com",
          },
        ],
      },
      // cors access
      { "Access-Control-Allow-Origin": "*" }
    );
});

it("renders list of users", async () => {
  const { findByText } = render(<Users />);
  const listElement = await findByText(/axios/i);
  expect(listElement).toBeInTheDocument();
});

it("renders learn react link", () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
