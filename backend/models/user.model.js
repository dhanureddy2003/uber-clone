import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: false, // whenever we try to return a user doc the password will automatically be hidden
    },
    socketId: {
      // required for tracking the location of driver
      type: String,
    },
  },
  { timestamps: true }
);

// do not use arrow function while using this keyword
userSchema.methods.generateToken = function () {
  const token = jwt.sign(
    {
      _id: this._id,
    },
    process.env.JWT_SECRET,
    { expiresIn: "24h" }
  );

  return token;
};

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.comparePassword = async function (password) {
  console.log(password, this.password);
  return await bcrypt.compare(password, this.password);
};

export const User = mongoose.model("User", userSchema);
