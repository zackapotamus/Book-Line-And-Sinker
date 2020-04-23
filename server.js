const express = require("express");
const session = require("express-session");
require("dotenv").config();
const PORT = process.env.PORT || 3000;
const passport = require("./config/passport");
const app = express();


const db = require("./models");

// app.use(express.static("public"));
app.use(express.static("dist", {
  setHeaders: (res, path, stat) => {
    let dotIndex = path.indexOf(".");
    if (dotIndex === -1) {
      return;
    } else {
      switch (path.substring(dotIndex)) {
      case ".js":
        res.set("Content-type", "text/javascript");
        break;
      case ".css":
        res.set("Content-type", "text/css");
        break;
      case ".html":
        res.set("Content-type", "text/html");
        break;
      default:
        return;
        // eslint-disable-next-line no-unreachable
        break;
      }
    }
  }
}));

// Parse application body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Authentication status
app.use(session({ secret: "hardhat", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// Set Handlebars.
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Routes
require("./routes/api-routes.js")(app);
require("./routes/html-routes.js")(app);

app.get("")

db.sequelize.sync().then(function () {
  app.listen(PORT, function () {
    console.log(`Server listening on: http://localhost:${PORT}`);
  });
});
