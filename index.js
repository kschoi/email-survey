const express = require("express");
const app = express();
const dotenv = require("dotenv");

dotenv.config();

app.get("/", (req, res) => {
	res.send({ hi: "there" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT);
