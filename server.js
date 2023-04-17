require("dotenv").config();
const express = require("express");
// express-session will use cookies by default
const session = require("express-session");
const path = require("path");
const routes = require("./controllers");

// for login and password auth via passportjs
const indexRouter = require("./controllers/index");
const authRouter = require("./controllers/auth");
// for handlebars
const exphbs = require("express-handlebars");
// const helpers = require("./utils/helpers");
// var db = require("./models");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const sequelize = require("./config/connection");
// initializes Sequelize with session store
const SequelizeStore = require("connect-session-sequelize")(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

//sets up session to connect with our sequelize db
const sess = {
  secret: "Very Secret",
  saveUninitialized: true,
  cookie: {
    expires: 600000,
  },
  resave: false,
  httpOnly: true,
  // so that https session cookies will show up in dev console.
  secure: false,
  // sets up session store.
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));

const hbs = exphbs.create();

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use("/", indexRouter);
app.use("/", authRouter);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use(routes);

sequelize.sync({ force: false }).then(function () {
  app.listen(PORT, function () {
    console.log("Listening on localhost:" + PORT);
  });
});
