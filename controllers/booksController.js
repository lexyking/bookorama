const bodyParser = require("body-parser");
const mongoose = require("mongoose");

// Connect to the database
mongoose.connect(
  "mongodb+srv://joan:joanuser@cluster0-nm1rg.mongodb.net/Bookorama?retryWrites=true&w=majority"
);

//Database schema
const BookSchema = new mongoose.Schema({
  title: String,
});

const Book = mongoose.model("book", BookSchema);

//Save the book title in the database
// Book({ title: "Une saison blanche et seche" }).save((err) => {
//   if (err) throw err;
//   console.log("book saved");
// });

const urlEncoderParse = bodyParser.urlencoded({ extended: false });

const booksController = (app) => {
  app.get("/books", (req, res) => {
    Book.find({}, (err, books) => {
      if (err) throw err;
      res.render("books", { books });
    });
  });

  app.post("/books", (req, res) => {
    Book(req.body).save((err) => {
      if (err) throw err;
      res.status(200).json({ result: "book added" });
    });
  });

  app.delete("/books/:book", (req, res) => {
    Book.find({ title: req.params.book.replace(/\-/g, " ") }).remove(
      (err, book) => {
        if (err) throw err;
        res.json(book);
      }
    );
    // const result = books.filter(
    //   (book) => book.title.replace(/[ ]+/g, "-") !== req.params.book
    // );
    // books = result;
    // console.log(book.title.replace(/[, ']+/g, "-"));
    // const result = books.filter((bookTitle) => bookTitle !== req.params.book);
    // console.log("req.params", result);
    // res.json(result);
  });
};

module.exports = booksController;

// const MongoClient = require('mongodb').MongoClient;
// const uri = "mongodb+srv://joan:<password>@cluster0-nm1rg.mongodb.net/<dbname>?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });
