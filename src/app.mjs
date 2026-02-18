import express from "express";

import dotenv from "dotenv";

import { fileURLToPath } from "url";
import { dirname, join } from "path";

import hbs from "hbs";

import cors from "cors";

import { geocode } from "./utils/geocode.js";
import { forecast } from "./utils/forecast.js";

dotenv.config();
const app = express();

const PORT = process.env.PORT || 3000;

const corsOption = {
  credentials: true,
  origin: [
    "http://localhost:3000",
    "http://localhost:5000",
    "https://weather-app-node-lso4.onrender.com",
  ],
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const publicDir = join(__dirname, "../public");
const viewsDir = join(__dirname, "../template/views");
const partialsDir = join(__dirname, "../template/partials");

app.set("views", viewsDir);
app.set("view engine", "hbs");
hbs.registerPartials(partialsDir);

app.use(cors(corsOption));
app.use(express.static(publicDir));

app.get("/", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Vladimer Gabisonia",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About page",
    name: "Vladimer Gabisonia",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    helpText: "This is some helpful text",
    name: "Vladimer Gabisonia",
  });
});

app.get("/weather", (req, res) => {
  const address = req.query.address;
  if (!address) {
    return res.send({
      error: "You must provide an address",
    });
  }

  geocode(address, (error, { latitude, longitude, location } = {}) => {
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
        address,
      });
    });
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term",
    });
  }

  res.send({
    products: [],
  });
});

app.use((req, res) => {
  res.status(404).render("404", {
    title: "404",
    errorMessage: "Page not found",
    name: "Vladimer Gabisonia",
  });
});

app.listen(PORT, () => {
  console.log("Server is running");
});
