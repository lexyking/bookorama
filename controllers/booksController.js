const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();

// Connect to the database
mongoose.connect(
  `mongodb://${process.env.USER_LOGIN}:${process.env.PWD_LOGIN}@ds137404.mlab.com:37404/heroku_2l73s4dq`
);

//Database schema
const BookSchema = new mongoose.Schema({
  title: String,
});

const Book = mongoose.model("book", BookSchema);

const booksController = (app) => {
  app.get("/", (req, res) => {
    Book.find({}, (err, books) => {
      if (err) throw err;
      res.render("books", { books });
    });
  });

  app.post("/", (req, res) => {
    Book(req.body).save((err) => {
      if (err) throw err;
      res.status(200).json({ result: "book added" });
    });
  });

  app.delete("/:book", (req, res) => {
    Book.find({ title: req.params.book.replace(/\-/g, " ") }).remove(
      (err, book) => {
        if (err) throw err;
        res.json(book);
      }
    );
  });
};

module.exports = booksController;
