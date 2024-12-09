import express from "express";
import { body } from "express-validator";
import {
  driverLogin,
  driverRegister,
  driverLogout,
  getDriverProfile,
} from "../controllers/driver.controller.js";
import { protectedRoute } from "../middlewares/auth.middleware.js";
import { Driver } from "../models/driver.model.js";

const router = express.Router();

export const validateDriver = [
  body("username").isLength({ min: 3 }).withMessage("username must be valid"),
  body("email").isEmail().withMessage("email must be valid"),
  body("password").isLength({ min: 6 }).withMessage("password must be valid"),
  body("vehicle.color").notEmpty().withMessage("vehicle color is required"),
  body("vehicle.vehicleNo")
    .notEmpty()
    .withMessage("vehicle number is required"),
  body("vehicle.vehicleType")
    .isIn(["car", "bike", "rickshaw"])
    .withMessage("vehicle type must be car, bike, or rickshaw"),
  body("vehicle.capacity")
    .isInt({ min: 1 })
    .withMessage("capacity must be a positive integer"),
  body("location.latitude").isNumeric().withMessage("latitude must be valid"),
  body("location.longitude").isNumeric().withMessage("longitude must be valid"),
];

router.post("/register", validateDriver, driverRegister);

router.post(
  "/login",
  [
    body("email")
      .isLength({ min: 3 })
      .withMessage("email must be valid")
      .custom((value, { req }) => {
        if (!value && !req.body.email) {
          throw new Error("Please provide email or username");
        }
        return true;
      }),
    body("password").isLength({ min: 6 }).withMessage("password must be valid"),
  ],
  driverLogin
);

router.post("/logout", driverLogout);

router.get("/profile", protectedRoute(Driver), getDriverProfile);

export default router;
