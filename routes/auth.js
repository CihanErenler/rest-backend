const router = require("express").Router();
const User = require("../model/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const validation = require("../validation");

// REGISTRATION
router.post("/register", async (req, res) => {
  const body = req.body;

  // Validate user inputs before send it to database
  const { error } = validation.registerValidation(body);

  // If there is an validation error return a message about it
  if (error) {
    return res.status(400).json({
      success: 0,
      message: error.details[0].message,
    });
  }

  // Check if the user already exists on database
  const userExists = await User.findOne({ email: body.email });
  if (userExists) {
    res.status(400).json({
      success: 0,
      message: "Email already in use",
    });
  }

  // Hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPass = await bcrypt.hash(body.password, salt);

  // Create user object from the request body
  const user = new User({
    name: body.name,
    lastname: body.lastname,
    email: body.email,
    password: hashedPass,
    city: body.city,
  });

  try {
    const savedUser = await user.save();
    res.status(200).json({
      success: 1,
      message: savedUser,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      success: 0,
      message: "Something went wrong",
    });
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  const body = req.body;

  // Validate user inputs before send it to database
  const { error } = validation.loginValidation(body);

  // If there is an validation error return a message about it
  if (error) {
    return res.status(400).json({
      success: 0,
      message: error.details[0].message,
    });
  }

  // Check if the email exist
  const user = await User.findOne({ email: body.email });
  if (!user) {
    return res.status(400).json({
      success: 0,
      message: "Email does not exist",
    });
  }

  const validatePass = await bcrypt.compare(body.password, user.password);
  if (!validatePass) {
    return res.status(400).json({
      success: 0,
      message: "Password is wrong",
    });
  }

  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);

  res.header("auth-token", token).status(200).json({
    success: 1,
    message: "Logged in!",
  });
});

module.exports = router;
