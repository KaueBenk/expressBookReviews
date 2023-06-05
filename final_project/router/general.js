const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

const doesExist = (username) => {
  let userswithsamename = users.filter((user) => {
      return user.username === username
  });
  if (userswithsamename.length > 0) {
      return true;
  } else {
      return false;
  }
}


public_users.post("/register", (req, res) => {
  let username = req.body.username
  let password = req.body.password
  console.log(req.body);

  if (username && password) {
    if (!doesExist(username)) {
        users.push({ "username": username, "password": password });
        return res.status(200).json({ message: "User successfully registred. Now you can login" });
    } else {
        return res.status(404).json({ message: "User already exists!" });
    }
}

  return res.status(300).json({ message: "Yet to be implemented" });
});

// Get the book list available in the shop
public_users.get('/', function (req, res) {
  //Write your code here
  return res.status(200).json(books);
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn', function (req, res) {
  //Write your code here
  isbn = req.params.isbn
  return res.status(200).json(books[isbn]);
});

// Get book details based on author
public_users.get('/author/:author', function (req, res) {
  let author = req.params.author
  const filteredBooks = [];

  for (let isbn in books) {
    if (books[isbn].author === author) {
      filteredBooks.push(books[isbn]);
    }
  }

  return res.status(200).json(filteredBooks);
});

// Get all books based on title
public_users.get('/title/:title', function (req, res) {
  let title = req.params.title
  const filteredBooks = [];

  for (let isbn in books) {
    if (books[isbn].title === title) {
      filteredBooks.push(books[isbn]);
    }
  }

  return res.status(200).json(filteredBooks);
});

//  Get book review
public_users.get('/review/:isbn', function (req, res) {
  let isbn = req.params.isbn
  let reviews = books[isbn].reviews

  return res.status(300).json(reviews);
});

module.exports.general = public_users;
