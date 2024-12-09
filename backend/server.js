import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import cookieparser from "cookie-parser";
import { connectDB } from "./db/db.js";
import userRoutes from "./routes/user.routes.js";
import driverRoutes from "./routes/driver.routes.js";

const app = express();
app.use(express.json());
app.use(cookieparser());
app.use(express.urlencoded({ extended: true }));

dotenv.config();
app.use(cors());

//routes
app.use("/api/user", userRoutes);
app.use("/api/driver", driverRoutes);

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

connectDB();
app.listen(process.env.PORT, () => {
  console.log(`Server is listening on port ${process.env.PORT}`);
});
