const express = require("express");

const { databaseConnection } = require("./database/config");
const app = express();
const PORT = process.env.PORT || 5000;

// Database connection
databaseConnection();

app.listen(PORT, () => console.log(`Server connected to PORT ${PORT}`));