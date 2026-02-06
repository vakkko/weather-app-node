import express from "express";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import hbs from "hbs";

const app = express();

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

app.listen(3000, () => {
  console.log("Server is running");
});
