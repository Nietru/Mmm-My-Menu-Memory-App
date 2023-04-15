const express = require("express");
// express-session will use cookies by default
const session = require("express-session");
const path = require('path');
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
  saveUninitialized:true,
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

//feature/homeroutes
// Define the local strategy for Passport.js
//  ------------------------------------------------------- not sure about this code yet t.t.
// passport.use(
//   new LocalStrategy(
//     {
//       usernameField: "email",
//       passwordField: "password",
//     },
//     (email, password, done) => {
//       User.findOne({
//         where: { email: email },
//       })
//         .then((user) => {
//           if (!user) {
//             return done(null, false, { message: "Incorrect email." });
//           }

//           bcrypt.compare(password, user.password, (err, result) => {
//             if (err) {
//               return done(err);
//             }

//             if (!result) {
//               return done(null, false, { message: "Incorrect password." });
//             }

//             return done(null, user);
//           });
//         })
//         .catch((err) => {
//           return done(err);
//         });
//     }
//   )
// );
//  ------------------------------------------------------------

sequelize.sync({ force: false }).then(() => {

sequelize.sync({ force: true }).then(() => {
 main
  app.listen(PORT, () =>
    console.log(
      `\nServer running on port ${PORT}.`
    )
  );
});
