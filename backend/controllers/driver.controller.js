import { validationResult } from "express-validator";
import { Driver } from "../models/driver.model.js";

export const driverRegister = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { username, email, password, vehicle, location } = req.body;

    const existingUser = await Driver.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const newDriver = await Driver.create({
      username,
      email,
      password,
      vehicle: {
        color: vehicle.color,
        vehicleNo: vehicle.vehicleNo,
        vehicleType: vehicle.vehicleType,
        capacity: vehicle.capacity,
      },
      location: {
        latitude: location.latitude,
        longitude: location.longitude,
      },
    });

    const token = newDriver.generateTokenAndSetCookie(newDriver._id, res);

    res
      .status(201)
      .json({ token, message: "Driver registered successfully", newDriver });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const driverLogin = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Please provide email and password" });
    }

    const driver = await Driver.findOne({ email }).select("+password");

    if (!driver) {
      return res.status(400).json({ message: "Driver does not exist" });
    }

    const isPasswordValid = await driver.comparePassword(password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Password is incorrect" });
    }
    const token = driver.generateTokenAndSetCookie(driver._id, res);

    res.status(200).json({ token, message: "Driver logged in successfully" });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const driverLogout = async (req, res, next) => {
  try {
    res.clearCookie("token");
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.error("error in driver logout", error);
    next(error);
  }
};

export const getDriverProfile = async (req, res, next) => {
  try {
    const { _id } = req.user;
    if (!_id) {
      return res
        .status(401)
        .json({ message: "Unauthorized access no id found" });
    }
    const driver = await Driver.findById(_id);
    if (!driver) {
      return res
        .status(401)
        .json({ message: "Unauthorized access no account found" });
    }
    res.status(200).json(driver);
  } catch (error) {
    console.error("error in get driver profile", error);
    next(error);
  }
};
