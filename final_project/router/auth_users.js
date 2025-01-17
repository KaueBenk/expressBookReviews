const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username) => {
  let userswithsamename = users.filter((user) => {
    return user.username === username
  });
  if (userswithsamename.length > 0) {
    return true;
  } else {
    return false;
  }
}

const authenticatedUser = (username, password) => {
  let validusers = users.filter((user) => {
    return (user.username === username && user.password === password)
  });
  if (validusers.length > 0) {
    return true;
  } else {
    return false;
  }
}

//only registered users can login
regd_users.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (!username || !password) {
    return res.status(404).json({ message: "Error logging in" });
  }

  if (authenticatedUser(username, password)) {
    let accessToken = jwt.sign({
      data: password
    }, 'access', { expiresIn: 60 * 60 });

    req.session.authorization = {
      accessToken, username
    }
    return res.status(200).send("User successfully logged in");
  } else {
    return res.status(208).json({ message: "Invalid Login. Check username and password" });
  }
  return res.status(300).json({ message: "Yet to be implemented" });
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  let isbn = req.params.isbn
  let review = req.body.review
  let user
  
  try {
    user = req.session.authorization.username
    if (!user) {
      return res.status(300).json("User not authenticated");
    }
  } catch {
    return res.status(300).json("User not authenticated");
  }

  books[isbn].reviews[user] = review
  return res.status(300).json(books[isbn]);
});

regd_users.delete("/auth/review/:isbn", (req, res) => {
  let user
  
  try {
    user = req.session.authorization.username
    if (!user) {
      return res.status(300).json("User not authenticated");
    }
  } catch {
    return res.status(300).json("User not authenticated");
  }

  let isbn = req.params.isbn
  
  delete books[isbn].reviews[user]

  return res.status(300).json(books[isbn]);

})

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
