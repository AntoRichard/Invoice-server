const express = require("express");
const path = require("path");
// const morgan = require("morgan");
const cors = require("cors");
const app = express();
const { PORT } = require(path.join(__dirname, "helpers", "env"));
const { connect } = require("./database/config");
const { pageNotFound } = require(path.join(
  __dirname,
  "controller",
  "PageNotFound"
));

// Setup cors
app.use(
  cors({
    origin: "*",
  })
);

// DATABASE SETUP
connect().then(()=> {
  console.log("CONNECTED TO DATABASE");
}).catch(err => {
  console.log("DATABASE CONNECTION FAILED");
  process.exit();
})

// Dev Setup
// app.use(morgan("dev"));

// Response Parser
app.use(express.json());

// Route Setup
app.use(require(path.join(__dirname, "router", "Signup")));
app.use(require(path.join(__dirname, "router", "Signin")));
app.use(require(path.join(__dirname, "router", "Invoice")));
app.use(require(path.join(__dirname, "router", "FilterInvoice")));
app.use(require(path.join(__dirname, "router", "user")));
app.use(pageNotFound);

app.listen(process.env.PORT || PORT, () =>
  console.log(`Server connected to PORT ${PORT}`)
);

module.exports = app;
