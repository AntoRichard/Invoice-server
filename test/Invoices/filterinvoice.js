process.env.NODE_ENV = true;
const { expect } = require("chai");
const request = require("supertest");
const app = require("../../server");
const { connect, close } = require("../../database/config");
const moment = require("moment");

describe("GET /invoices?asec=1&desc=0&start=0&end=0", () => {
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

  it("Success, Sort ascending base on date", (done) => {
    const desc = 1,
      asec = 0;
    const token =
      "eyJhbGciOiJIUzI1NiJ9.NWYwMmE5OGM1ODY4MGU4YTFiM2E0NTk3.fD4xK_yrZvuQJjJru4kyfV5Q74uaeKqDSWAw_lZ--rc";
    request(app)
      .get(`/invoices?asec=${asec}&desc=${desc}&start=0&end=0`)
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

  it("Success, Sort descending base on date", (done) => {
    const desc = 1,
      asec = 0;
    const token =
      "eyJhbGciOiJIUzI1NiJ9.NWYwMmE5OGM1ODY4MGU4YTFiM2E0NTk3.fD4xK_yrZvuQJjJru4kyfV5Q74uaeKqDSWAw_lZ--rc";
    request(app)
      .get(`/invoices?asec=${asec}&desc=${desc}&start=0&end=0`)
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

  it("Success, Filter based on date", (done) => {
    const token =
      "eyJhbGciOiJIUzI1NiJ9.NWYwMmE5OGM1ODY4MGU4YTFiM2E0NTk3.fD4xK_yrZvuQJjJru4kyfV5Q74uaeKqDSWAw_lZ--rc";
    const startDate = "2020-07-01",
      endDate = "2020-07-11";
    request(app)
      .get(`/invoices?asec=1&desc=0&start=${startDate}&end=${endDate}`)
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
        const start = body.data[0].date;
        const end = body.data[body.data.length - 1].date;
        expect(moment(new Date(startDate)).format("DD-MM-YYYY")).to.equal(
          moment(new Date(start)).format("DD-MM-YYYY")
        );
        expect(moment(new Date(endDate)).format("DD-MM-YYYY")).to.equal(
          moment(new Date(end)).format("DD-MM-YYYY")
        );
        done();
      })
      .catch((err) => done(err));
  });

  it("Failure, Get Invoices using invalid token.", (done) => {
    const desc = 1,
      asec = 0;
    const token =
      "yJhbGciOiJIUzI1NiJ9.NWVmZGE3Y2QwZWEzMjE5NWQwNGZhMmVm.faYcj_YijKweWJG72tgmNU2Fjdr-mVjRpPUadqHY1Dg";
    request(app)
      .get(`/invoices?asec=${asec}&desc=${desc}&start=0&end=0`)
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

  it("Failure, Get Invoices without params.", (done) => {
    const token =
      "eyJhbGciOiJIUzI1NiJ9.NWYwMmE5OGM1ODY4MGU4YTFiM2E0NTk3.fD4xK_yrZvuQJjJru4kyfV5Q74uaeKqDSWAw_lZ--rc";
    request(app)
      .get("/invoices")
      .set("Authorization", `Bearer ${token}`)
      .expect(500)
      .then((response) => {
        const body = response.body;
        expect(body).to.contain.property("success");
        expect(body).to.contain.property("message");
        expect(body.success).to.equal(false);
        done();
      })
      .catch((err) => done(err));
  });
});
