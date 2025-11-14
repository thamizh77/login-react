const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt"); // Import bcrypt
const app = express();
const saltRounds = 10; // Recommended number of salt rounds

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// In a real application, you would store user credentials in a database
const users = [];

app.post("/register", async function (req, res) {
  const { name, username, password } = req.body;

  // Check if the username already exists
  const existingUser = users.find((u) => u.username === username);
  if (existingUser) {
    return res.status(409).send("Username already exists"); // 409 Conflict
  }

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    users.push({ username, password: hashedPassword, name });
    console.log("New user registered:", { name, username }); // For demonstration
    res.status(201).send("Registration successful"); // 201 Created
  } catch (error) {
    console.error("Error hashing password:", error);
    return res.status(500).send("Registration failed"); // 500 Internal Server Error
  }
});

app.post("/login", async function (req, res) {
  const { username, password } = req.body;
  const user = users.find((u) => u.username === username);

  if (user) {
    try {
      // Compare the entered password with the stored hash
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (passwordMatch) {
        return res.send(true);
      }
    } catch (error) {
      console.error("Error comparing passwords:", error);
      return res.status(500).send("Login failed"); // 500 Internal Server Error
    }
  }

  res.send(false);
});

app.listen(5000, function () {
  console.log("Server Started on port 5000...");
});