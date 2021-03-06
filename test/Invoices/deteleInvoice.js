process.env.NODE_ENV = true;
const { expect } = require("chai");
const request = require("supertest");
const app = require("../../server");
const { connect, close } = require("../../database/config");

describe("DELETE /invoice/:invoiceid", () => {
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

  it("Failure,request to delete invoice without id.", (done) => {
    const invoiceID = "";
    const token =
      "eyJhbGciOiJIUzI1NiJ9.NWYwMmE5OGM1ODY4MGU4YTFiM2E0NTk3.fD4xK_yrZvuQJjJru4kyfV5Q74uaeKqDSWAw_lZ--rc";
    request(app)
      .delete(`/invoice/${invoiceID}`)
      .set("Authorization", `Bearer ${token}`)
      .expect(404)
      .then((response) => {
        const body = response.body;
        expect(body).to.contain.property("success");
        expect(body).to.contain.property("message");
        expect(body.success).to.equal(false);
        expect(body.message).to.equal("Page not found.");
        done();
      })
      .catch((err) => done(err));
  });

  it("Failure,trying to delete invoice with invalid id or invalid user.", (done) => {
    const invoiceID = "5efdb24d4b538e985c1cdb38";
    const token =
      "eyJhbGciOiJIUzI1NiJ9.NWYwMmE5OGM1ODY4MGU4YTFiM2E0NTk3.fD4xK_yrZvuQJjJru4kyfV5Q74uaeKqDSWAw_lZ--rc";
    request(app)
      .delete(`/invoice/${invoiceID}`)
      .set("Authorization", `Bearer ${token}`)
      .expect(500)
      .then((response) => {
        const body = response.body;
        expect(body).to.contain.property("success");
        expect(body).to.contain.property("message");
        expect(body.success).to.equal(false);
        expect(body.message).to.equal("Internal server problem");
        done();
      })
      .catch((err) => done(err));
  });
  it("Failure,trying to delete invoice with invalid token.", (done) => {
    const invoiceID = "5efdb24d4b538e985c1cdb38";
    const token =
      "eyJhbGciOiJIUzI1NiJ9.NWVmZGE3ZTIwZWEzMjE5NWQwNGZhmYw.3WjWIBVzApvRUlIKzT9MOqNxLnY45uQkx4rJF-NOQtY";
    request(app)
      .delete(`/invoice/${invoiceID}`)
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
