const mongoose = require("mongoose");
const Book = require("./models/book");
const express = require("express");
const app = express();

const URI = `mongodb+srv://raircl:${secretpassword}@cluster0.buw5t.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`

mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => app.listen(3000)).catch(err => console.log(err));

app.use(express.json());

app.post("/books", (req, res) => {
  const { title, author, yearOfRelease } = req.body;

  const book = new Book({
    title,
    author,
    yearOfRelease
  });

  book.save()
    .then(result => res.status(201).json(result));
});

app.get("/books", (req, res) => {
  Book.find()
    .then(result => res.json(result));
});

app.get("/books/:id", (req, res) => {
  const { id } = req.params;
  Book.findById(id)
    .then(result => res.json(result));
});

app.put("/books/:id", (req, res) => {
  const { title, author, yearOfRelease } = req.body;
  const { id } = req.params;

  const book = {
    title,
    author,
    yearOfRelease
  }

  Book.findByIdAndUpdate(id, book)
    .then(() => res.status(201).send());
});

app.delete("/books/:id", (req, res) => {
  const { id } = req.params
  Book.findByIdAndDelete(id)
    .then(result => res.status(204).json(result));
});