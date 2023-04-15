const express = require("express");
// express-session will use cookies by default
const session = require("express-session");
const routes = require("./controllers");
const path = require("path");
// for login and password auth via passportjs
const indexRouter = require("./controllers/index");
const authRouter = require("./controllers/auth");
// for handlebars
const exphbs = require("express-handlebars");
// const helpers = require("./utils/helpers");

// for passportjs
const LocalStrategy = require("passport-local").Strategy;

const sequelize = require("./config/connection");
// initializes Sequelize with session store
const SequelizeStore = require("connect-session-sequelize")(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

//sets up session to connect with our sequelize db
const sess = {
  secret: "Very Secret",
  cookie: {},
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

// ------------------------------------------------------- not sure about this code yet t.t.
// app.use(passport.initialize());
// app.use(passport.session());
// -------------------------------------------------------
// Set up passportjs
app.use("/", indexRouter);
app.use("/", authRouter);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use(routes);

sequelize.sync({ force: true }).then(() => {
  app.listen(PORT, () =>
    console.log(
      `\nServer running on port ${PORT}. Visit http://localhost:${PORT} and create an account!`
    )
  );
});
