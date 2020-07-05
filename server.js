const express = require("express");
const path = require("path");
// const morgan = require("morgan");
const cors = require("cors");
const { databaseConnection } = require("./database/config");
const app = express();
const { PORT } = require(path.join(__dirname, "helpers", "env"));
const { pageNotFound } = require(path.join(__dirname, "controller", "PageNotFound"));

// Setup cors
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);


// Database connection
databaseConnection();

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

app.listen(process.env.PORT || PORT, () => console.log(`Server connected to PORT ${PORT}`));
