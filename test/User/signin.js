process.env.NODE_ENV = true;
const { expect } = require("chai");
const request = require("supertest");
const app = require("../../server");
const { connect, close } = require("../../database/config");

describe("POST /signin", () => {
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

  it("Success, Signin user with valid and proper Credential", (done) => {
    const payload = {
      username: "Antony Raj",
      email: "anto@gmail.com",
      password: "abcd@1234",
    };
    request(app)
      .post("/signin")
      .send(payload)
      .then((response) => {
        const body = response.body;
        expect(body).to.contain.property("success");
        expect(body).to.contain.property("message");
        expect(body).to.contain.property("token");
        expect(body).to.contain.property("user");
        expect(body.user).to.contain.property("admin");
        expect(body.user).to.contain.property("username");
        expect(body.user).to.contain.property("email");
        expect(body.success).to.equal(true);
        done();
      })
      .catch((err) => done(err));
  });

  it("Failure, Signin user with empty data", (done) => {
    const payload = {};
    request(app)
      .post("/signin")
      .send(payload)
      .then((response) => {
        const body = response.body;
        expect(body).to.contain.property("success");
        expect(body).to.contain.property("error");
        expect(body.error.email).to.equal("Enter a valid email");
        expect(body.error.password).to.equal(
          "password should me min length of 8"
        );
        expect(body.success).to.equal(false);
        done();
      })
      .catch((err) => done(err));
  });

  it("Failure, Signin user without email", (done) => {
    const payload = {
      password: "abcd@1234",
    };
    request(app)
      .post("/signin")
      .send(payload)
      .then((response) => {
        const body = response.body;
        expect(body).to.contain.property("success");
        expect(body).to.contain.property("error");
        expect(body.error.email).to.equal("Enter a valid email");
        expect(body.success).to.equal(false);
        done();
      })
      .catch((err) => done(err));
  });

  it("Failure, Signin user without password", (done) => {
    const payload = {
      email: "anto@gmail.com",
    };
    request(app)
      .post("/signin")
      .send(payload)
      .then((response) => {
        const body = response.body;
        expect(body).to.contain.property("success");
        expect(body).to.contain.property("error");
        expect(body.error.password).to.equal(
          "password should me min length of 8"
        );
        expect(body.success).to.equal(false);
        done();
      })
      .catch((err) => done(err));
  });
});
