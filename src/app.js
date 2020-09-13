const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();
const port = process.env.PORT || 3000;

const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");
const publicDirectoryPath = path.join(__dirname, "../public");

app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(path.join(publicDirectoryPath)));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Ask",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    helpText: "This is help text",
    title: "help",
    name: "Ask",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "Ask",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide the location",
    });
  }

  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }
      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({ error });
        }
        res.send({
          forecast: forecastData,
          location,
          address: req.query.address,
        });
      });
    }
  );
  // res.send({
  //   forecast:"snow",
  //   location:"mumbai",
  //   address:req.query.address
  // })
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Ask",
    errorMessage: "Help not found",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Ask",
    errorMessage: "Page not found",
  });
});

app.listen(port, () => {
  console.log("Server is up on port " + port);
});
