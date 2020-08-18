const express = require("express");
const app = express();
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const dotenv = require("dotenv");

dotenv.config();

const PORT = process.env.PORT || 5000;
let isDisableKeepAlive = false;

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    (accessToken) => {
      console.log(acessToken);
    }
  )
);

app.use((req, res, next) => {
  if (isDisableKeepAlive) {
    res.set("Connection", "close");
  }
  next();
});

app.get("/", (req, res) => {
  res.send("hello world");
});

app.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

app.listen(PORT, () => {
  // process.send("ready");
  console.log(`application is listening on port ${PORT}...`);
});

process.on("SIGINT", () => {
  isDisableKeepAlive = true;
  app.close(() => {
    console.log("server closed");
    process.exit(0);
  });
});
