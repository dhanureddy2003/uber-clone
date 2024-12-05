import dotenv from "dotenv";
import express from "express";
import cors from "cors";

const app = express();

dotenv.config();
app.use(cors());

app.listen(process.env.PORT, () => {
  console.log(`Server is listening on port ${process.env.PORT}`);
});