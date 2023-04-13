const express = require("express");
// express-session will use cookies by default
const session = require("express-session");
const routes = require("./controllers");
// for handlebars
const exphbs = require("express-handlebars");
const helpers = require("./utils/helpers");

const sequelize = require("./config/connection");
// initializes Sequelize with session store
const SequelizeStore = require("connect-session-sequelize")(session.Store);

const app = express();
// .env.PORT checks for existing PORT provided by Heroku, our deployment destination, otherwise use 3001
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

const hbs = exphbs.create({ helpers });

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () =>
    console.log(
      `\nServer running on port ${PORT}. Visit http://localhost:${PORT} and create an account!`
    )
  );
});
