const express = require("express");
// express-session will use cookies by default
const session = require("express-session");
const path = require('path');
const routes = require("./controllers");
// for handlebars
const exphbs = require("express-handlebars");
// const helpers = require("./utils/helpers");

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

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () =>
    console.log(
      `\nServer running on port ${PORT}.`
    )
  );
});
