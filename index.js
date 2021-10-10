const express = require("express");
const app = express();
const mongoose = require("mongoose");
const PORT = 3000;
require("dotenv").config();

// Middlewares
app.use(express.json());

// Connect to database
mongoose.connect(process.env.DB_URL, { useNewUrlParser: true }, () => {
  console.log("Connected to db");
});

// Import the router
const authRoute = require("./routes/auth");
const likedRoute = require("./routes/liked");

// Routes
app.use("/api/user", authRoute);
app.use("/api", likedRoute);

app.listen(PORT, () => {
  console.log("app is running at port", PORT);
});
