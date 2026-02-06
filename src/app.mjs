import express from "express";

import dotenv from "dotenv";

import { fileURLToPath } from "url";
import { dirname, join } from "path";

import hbs from "hbs";

dotenv.config();
const app = express();

const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const publicDir = join(__dirname, "../public");
const viewsDir = join(__dirname, "../template/views");
const partialsDir = join(__dirname, "../template/partials");

app.set("views", viewsDir);
app.set("view engine", "hbs");
hbs.registerPartials(partialsDir);

app.use(express.static(publicDir));

app.get("/", (req, res) => {
  res.render("index", {
    title: "Weather app",
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
    title: "Help page",
    name: "Vladimer Gabisonia",
  });
});

app.use((req, res) => {
  res.status(404).render("404", {
    title: "Page not found",
    name: "Vladimer Gabisonia",
  });
});

app.listen(PORT, () => {
  console.log("Server is running");
});
