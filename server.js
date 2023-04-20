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
const sequelize = require("./config/connection");
// initializes Sequelize with session store
const SequelizeStore = require("connect-session-sequelize")(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

const bodyParser = require('body-parser');
app.use(bodyParser.json());

//sets up session to connect with our sequelize db
const sess = {
  secret: "A private key",
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
// give our session's middleware to passport:
const passport = require("./passport");
app.use(passport.authenticate("session"));

const hbs = exphbs.create();

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");
//what is this used for? breaks homeroute and over rides current homeroutes "/" path
// app.get("/", (req, res) => {
//   res.render("homepage.handlebars");
// });
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// tells express where to find client-side code
app.use(express.static(path.join(__dirname, "public")));

// TODO: add notes for this functionality
// app.use("/", indexRouter);
// app.use("/", authRouter);
app.use(function (req, res, next) {
  console.log(req.session);
  next();
});
app.use(routes);

sequelize.sync({ force: false }).then(function () {
  app.listen(PORT, function () {
    console.log("Listening on localhost:" + PORT);
  });
});
