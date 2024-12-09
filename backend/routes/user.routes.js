import express from "express";
import { body } from "express-validator";
import {
  getUserProfile,
  userLogin,
  userLogout,
  userRegister,
} from "../controllers/user.controller.js";
import { protectedRoute } from "../middlewares/auth.middleware.js";
import { User } from "../models/user.model.js";

const router = express.Router();

router.post(
  "/register",
  [
    body("username")
      .isLength({ min: 3 })
      .withMessage("username must be of length 3 or more"),
    body("email").isEmail().withMessage("email must be valid"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("password must be of length 6 or more"),
  ],
  userRegister
);
router.post(
  "/login",
  [
    body("email")
      .notEmpty()
      .withMessage("email or username is required")
      .custom((value, { req }) => {
        if (!value && !req.body.username) {
          throw new Error("email or username is required");
        }
        return true;
      }),
    body("password").isLength({ min: 6 }).withMessage("password is required"),
  ],
  userLogin
);

router.post("/logout", userLogout);

router.get("/profile", protectedRoute(User), getUserProfile);

export default router;
