const express = require("express");
const mongoose = require("mongoose");
const app = express();
const dotenv = require("dotenv");
const routes = require("./routes");

dotenv.config();

require("./models/User");
require("./services/passport");

const PORT = process.env.PORT || 5000;
let isDisableKeepAlive = false;

app.use((req, res, next) => {
	if (isDisableKeepAlive) {
		res.set("Connection", "close");
	}
	next();
});

routes(app);

mongoose
	.connect(process.env.MONGO_URI, { useNewUrlParser: true })
	.then(() => console.log(`데이터베이스에 연결되었습니다. : ${process.env.MONGO_URI}`))
	.catch((err) => console.log(`데이터베이스 연결 시 에러가 발생했습니다. : ${process.env.MONGO_URI}`));

app.listen(PORT, () => {
	process.send && process.send("ready");
	console.log(`application is listening on port ${PORT}...`);
});

process.on("SIGINT", () => {
	isDisableKeepAlive = true;
	app.close &&
		app.close(() => {
			console.log("server closed");
			process.exit(0);
		});
});
