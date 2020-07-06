process.env.NODE_ENV = true;
const { expect } = require("chai");
const request = require("supertest");
const app = require("../../server");
const { connect, close } = require("../../database/config");

describe("POST /invoice", () => {
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

  it("Success, Creating a invoice using valid data.", (done) => {
    const payload = {
      name: "Graphics Card 2GB",
      amount: "4999",
    };
    const token =
      "eyJhbGciOiJIUzI1NiJ9.NWYwMmE5OGM1ODY4MGU4YTFiM2E0NTk3.fD4xK_yrZvuQJjJru4kyfV5Q74uaeKqDSWAw_lZ--rc";
    request(app)
      .post("/invoice")
      .send(payload)
      .set("Authorization", `Bearer ${token}`)
      .expect(200)
      .then((response) => {
        const body = response.body;
        expect(body).to.contain.property("success");
        expect(body).to.contain.property("message");
        expect(body.success).to.equal(true);
        done();
      })
      .catch((err) => done(err));
  });

  it("Failure, Trying to create invoice with invalid token.", (done) => {
    const payload = {
      name: "invoice test",
      amount: 10000,
    };
    const token =
      "yJhbGciOiJIUzI1NiJ9.NWVmZGE3Y2QwZWEzMjE5NWQwNGZhMmVm.faYcj_YijKweWJG72tgmNU2Fjdr-mVjRpPUadqHY1Dg";
    request(app)
      .post("/invoice")
      .send(payload)
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

  it("Failure, Trying to create a invoice using invaid amount.", (done) => {
    const payload = {
      name: "invoice test",
      amount: "asdada",
    };
    const token =
      "eyJhbGciOiJIUzI1NiJ9.NWYwMmE5OGM1ODY4MGU4YTFiM2E0NTk3.fD4xK_yrZvuQJjJru4kyfV5Q74uaeKqDSWAw_lZ--rc";
    request(app)
      .post("/invoice")
      .send(payload)
      .set("Authorization", `Bearer ${token}`)
      .expect(500)
      .then((response) => {
        const body = response.body;
        expect(body).to.contain.property("success");
        expect(body).to.contain.property("message");
        expect(body).to.contain.property("error");
        expect(body.success).to.equal(false);
        done();
      })
      .catch((err) => done(err));
  });

  it("Failure, Trying to create invoice with  invalid invoice name.", (done) => {
    const payload = {
      name: "",
      amount: 10000,
    };
    const token =
      "eyJhbGciOiJIUzI1NiJ9.NWYwMmE5OGM1ODY4MGU4YTFiM2E0NTk3.fD4xK_yrZvuQJjJru4kyfV5Q74uaeKqDSWAw_lZ--rc";
    request(app)
      .post("/invoice")
      .send(payload)
      .set("Authorization", `Bearer ${token}`)
      .expect(422)
      .then((response) => {
        const body = response.body;
        expect(body).to.contain.property("success");
        expect(body).to.contain.property("error");
        expect(body.success).to.equal(false);
        expect(body.error.name).to.equal("Invoice name should not be empty");
        done();
      })
      .catch((err) => done(err));
  });

  it("Failure, Trying to create invoice using Empty payload.", (done) => {
    const payload = {
      name: "",
      amount: "",
    };
    const token =
      "eyJhbGciOiJIUzI1NiJ9.NWYwMmE5OGM1ODY4MGU4YTFiM2E0NTk3.fD4xK_yrZvuQJjJru4kyfV5Q74uaeKqDSWAw_lZ--rc";
    request(app)
      .post("/invoice")
      .send(payload)
      .set("Authorization", `Bearer ${token}`)
      .expect(422)
      .then((response) => {
        const body = response.body;
        expect(body).to.contain.property("success");
        expect(body).to.contain.property("error");
        expect(body.success).to.equal(false);
        expect(body.error.name).to.equal("Invoice name should not be empty");
        expect(body.error.amount).to.equal(
          "Invoice amount should not be empty"
        );
        done();
      })
      .catch((err) => done(err));
  });
});
