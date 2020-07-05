process.env.NODE_ENV = true;
const { expect } = require("chai");
const request = require("supertest");
const app = require("../../server");
const { connect, close } = require("../../database/config");

describe("GET /user", () => {
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

  it("Success, get a specific user based on token", (done) => {
    const token =
      "eyJhbGciOiJIUzI1NiJ9.NWVmZGE3Y2QwZWEzMjE5NWQwNGZhMmVm.faYcj_YijKweWJG72tgmNU2Fjdr-mVjRpPUadqHY1Dg";
    request(app)
      .get("/user")
      .set("Authorization", `Bearer ${token}`)
      .expect(200)
      .then((response) => {
        const body = response.body;
        expect(body).to.contain.property("success");
        expect(body).to.contain.property("message");
        expect(body).to.contain.property("user");
        expect(body.success).to.equal(true);
        expect(body.user).to.contain.property("admin");
        expect(body.user).to.contain.property("username");
        expect(body.user).to.contain.property("email");
        done();
      })
      .catch((err) => done(err));
  });

  it("Failure, Get user using invalid token.", (done) => {
    const token =
      "yJhbGciOiJIUzI1NiJ9.NWVmZGE3Y2QwZWEzMjE5NWQwNGZhMmVm.faYcj_YijKweWJG72tgmNU2Fjdr-mVjRpPUadqHY1Dg";
    request(app)
      .get("/invoice")
      .set("Authorization", `Bearer ${token}`)
      .expect(401)
      .then((response) => {
        const body = response.body;
        expect(body).to.contain.property("success");
        expect(body).to.contain.property("message");
        expect(body.success).to.equal(false);
        expect(body.message).to.equal("UnAuthorized user");
        done();
      })
      .catch((err) => done(err));
  });
});
