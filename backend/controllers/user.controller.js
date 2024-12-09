import { cookie, validationResult } from "express-validator";
import { User } from "../models/user.model.js"; // assuming you have a user model

export const userRegister = async (req, res, next) => {
  const errors = validationResult(req);

  // If validation errors exist, return them to the client
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { email, username, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create new user
    const newUser = new User({
      email,
      username,
      password,
    });

    // create token

    // Save the new user
    await newUser.save();
    const token = newUser.generateToken();

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });

    res.status(201).json({
      newUser,
      token,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const userLogin = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { username, email, password } = req.body;

    if ((!username && !email) || !password) {
      return res
        .status(400)
        .json({ message: "Please provide email or username and password" });
    }

    // Find user by username or email
    const user = await User.findOne(email ? { email } : { username }).select(
      "+password"
    );

    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }

    // Check if password is valid
    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Password is incorrect" });
    }

    // Generate token
    const token = user.generateToken();

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });

    res.status(200).json({
      user: { id: user._id, username: user.username, email: user.email },
      token,
    });
  } catch (error) {
    console.error("Login Error:", error);
    next(error);
  }
};

export const userLogout = async (req, res, next) => {
  try {
    res.clearCookie("token");
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const getUserProfile = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const user = await User.findById(_id);
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    next(error);
  }
};
