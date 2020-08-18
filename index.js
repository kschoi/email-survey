const express = require("express");
const app = express();
const dotenv = require("dotenv");

dotenv.config();

const PORT = process.env.PORT || 5000;
let isDisableKeepAlive = false;

app.use((req, res, next) => {
  if (isDisableKeepAlive) {
    res.set("Connection", "close");
  }
  next();
});

app.get("/", (req, res) => {
  res.send({ hi: "there" });
});

app.listen(PORT, () => {
  process.send("ready");
  console.log(`application is listening on port ${PORT}...`);
});

process.on("SIGINT", () => {
  isDisableKeepAlive = true;
  app.close(() => {
    console.log("server closed");
    process.exit(0);
  });
});
