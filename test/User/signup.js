process.env.NODE_ENV = true;
const { expect } = require("chai");
const request = require("supertest");
const app = require("../../server");
const { connect, close } = require("../../database/config");

describe("POST /signup", () => {
  before((done) => {
    connect()
      .then(() => done())
      .catch((err) => done(err));
  });

  after((done) => {
    close()
      .then(() => done())
      .catch((err) => done(err));
  });

  it("Success, Creating new user", (done) => {
    const payload = {
      username: "Antony Raj",
      email: "anto@gmail.com",
      password: "abcd@1234",
    };
    request(app)
      .post("/signup")
      .send(payload)
      .then((response) => {
        const body = response.body;
        expect(body).to.contain.property("success");
        expect(body).to.contain.property("message");
        expect(body).to.contain.property("token");
        expect(body.success).to.equal(true)
        done();
      })
      .catch((err) => done(err));
  });

  it("Failure, Creating new user with validation issue", (done) => {
    const payload = {
      username: "Antony Raj",
      email: "anto@gmail.com",
      password: "abcd@",
    };
    request(app)
      .post("/signup")
      .send(payload)
      .then((response) => {
        const body = response.body;
        expect(body).to.contain.property("success");
        expect(body).to.contain.property("error");
        expect(body.success).to.equal(false)
        done();
      })
      .catch((err) => done(err));
  });

  it("Failure, Creating new user without payload", (done) => {
    const payload = {};
    request(app)
      .post("/signup")
      .send(payload)
      .then((response) => {
        const body = response.body;
        expect(body).to.contain.property("success");
        expect(body).to.contain.property("error");
        expect(body.success).to.equal(false)
        done();
      })
      .catch((err) => done(err));
  });
});
