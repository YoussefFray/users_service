const express = require("express");
const route = express.Router();
const db = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authenticateToken = require('../middleware/authMiddleware');

//login
route.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user exists
    const user = await db.User.findOne({
      where: {
        email: email,
      },
    });

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    // Compare the provided password with the hashed password in the database
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    // generate a token or handle the login logic here
    // JWT for authentication
    let token = jwt.sign(
      { email: user.email, userId: user.userId },
      process.env.JWT_SECRET,
      {
        expiresIn: "1y",
        algorithm: "HS256",
      }
    );

    // Return a success message or token
    res.status(200).json({ token: token });
  } catch (err) {
    console.error("Error in login route:", err);  // Log the error
    res.status(500).json({ message: "Internal Server Error" });  // Return a more specific error message
  }
});

//register
route.post("/user", async (req, res) => {
  try {
    // Check if the email already exists
    const existingUser = await db.User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (existingUser) {
      // Email already exists, return an error
      return res.status(400).json({ message: "Email is already in use" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    // Create a new user
    const newUser = await db.User.create({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      password: hashedPassword,
      birthday: req.body.birthday,
    });

    res.status(201).json(newUser);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});
// Middleware to check token validity
//route.use(authenticateToken);

//get  all users
route.get("/user", (req, res) => {
  db.User.findAll().then((users) => {
    res.json(users);
  });
});

route.get("/user/:id", (req, res) => {
  db.User.findOne({ where: { userId: req.params.id } }).then((user) => {
    res.json(user);
  });
});


route.put("/user/:id", (req, res) => {
  db.User.update(
    {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      password: req.body.password,
      birthday: req.body.birthday,
    },
    {
      where: {
        userId: req.params.id,
      },
    }
  ).then((updatedUser) => {
    res.json(updatedUser);
  });
});

route.delete("/user/:id", (req, res) => {
  db.User.destroy({
    where: {
      userId: req.params.id,
    },
  }).then(() => {
    res.json({ message: "User deleted" });
  });
});


module.exports = route;
