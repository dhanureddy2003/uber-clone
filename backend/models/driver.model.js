import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
export const driverSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      min: [3, "username must be of length 3 or more"],
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: [6, "password must be of length 6 or more"],
      select: false,
    },
    socketId: {
      type: String,
    },

    status: {
      type: String,
      enum: ["available", "busy"],
      default: "available",
    },

    vehicle: {
      color: {
        type: String,
        required: true,
      },
      vehicleNo: {
        type: String,
        required: true,
      },
      capacity: {
        type: Number,
        required: true,
      },
      vehicleType: {
        type: String,
        enum: ["car", "bike", "rickshaw"],
        required: true,
      },
    },

    location: {
      latitude: {
        type: Number,
      },
      longitude: {
        type: Number,
      },
    },
  },
  { timestamps: true }
);

driverSchema.methods.generateTokenAndSetCookie = function (userId, res) {
  const token = jwt.sign({ _id: userId }, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });
  res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });

  return token;
};

driverSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Password Validation Method
driverSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

export const Driver = mongoose.model("Driver", driverSchema);
