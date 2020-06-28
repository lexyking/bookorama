const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const booksController = require("./controllers/booksController");

const app = express();

app.set("view engine", "ejs");

app.use(express.static("./public"));
app.use(bodyParser.json());
app.use(cors());

booksController(app);

app.listen(process.env.port || 3000);
console.log(`Listening to port ${process.env.port}`);
