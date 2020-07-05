process.env.NODE_ENV = true;
const { expect } = require("chai");
const request = require("supertest");
const app = require("../../server");
const { connect, close } = require("../../database/config");

describe("GET /invoice", () => {
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

  it("Success, Getting all invoices", (done) => {
    const token =
      "eyJhbGciOiJIUzI1NiJ9.NWVmZGE3Y2QwZWEzMjE5NWQwNGZhMmVm.faYcj_YijKweWJG72tgmNU2Fjdr-mVjRpPUadqHY1Dg";
    request(app)
      .get("/invoice")
      .set("Authorization", `Bearer ${token}`)
      .expect(200)
      .then((response) => {
        const body = response.body;
        expect(body).to.contain.property("success");
        expect(body).to.contain.property("message");
        expect(body).to.contain.property("data");
        expect(body.success).to.equal(true);
        expect(body.data[0]).to.contain.property("amount");
        expect(body.data[0]).to.contain.property("date");
        expect(body.data[0]).to.contain.property("updatedon");
        expect(body.data[0]).to.contain.property("_id");
        expect(body.data[0]).to.contain.property("name");
        expect(body.data[0]).to.contain.property("userid");
        done();
      })
      .catch((err) => done(err));
  });

  it("Failure, Get all invoices using invalid token.", (done) => {
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
