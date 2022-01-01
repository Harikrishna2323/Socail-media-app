const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//TEST => /api/auth/
exports.getUserPage = (req, res) => {
  res.send("Welcome to auth page.");
};

//REGISTER => /api/auth/register
exports.registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await new User({
      username,
      email,
      password: hashedPassword,
    });
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
};

//LOGIN => /api/auth/login
exports.loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email && !password) {
    return res.status(400).json({
      message: "Please provide your email and password",
    });
  }
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: "User not Found.",
      });
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);
    if (!isPasswordMatched) {
      return res.status(401).json({
        message: "Please provide valid email and password.",
      });
    }
    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.SECRET_KEY,
      {
        expiresIn: "5d",
      }
    );
    res.cookie("token", token);

    res.status(200).json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};
