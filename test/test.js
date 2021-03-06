const axios = require("axios");
const chai = require("chai");
const path = require("path");
const expect = chai.expect;
const chaiResponseValidator = require("chai-openapi-response-validator");
const openAPIpath = path.resolve("./docs/openapi.yml");
chai.use(chaiResponseValidator(openAPIpath));

// Starts the server

describe("GET /books", function () {
  let server;

  before(function () {
    server = require("../lib/server");
  });

  after(function () {
    server.close();
  });

  it("should satisfy OpenAPI spec", async function () {
    const res = await axios.get("http://localhost:3000/books");
    await expect(res).to.satisfyApiSpec;
  });
});
