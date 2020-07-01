const express = require("express");
const path = require("path");
const morgan = require("morgan");
const { databaseConnection } = require("./database/config");
const app = express();
const PORT = process.env.PORT || 5000;

// Database connection
databaseConnection();

// Dev Setup
app.use(morgan("dev"));
// Response Parser
app.use(express.json());

// Route Setup
app.use(require(path.join(__dirname, "router", "Signup")));

app.listen(PORT, () => console.log(`Server connected to PORT ${PORT}`));
