import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/userRoute.js";
import authRouter from "./routes/authRoute.js";

dotenv.config();


// Database connection
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected to Database!!!");
  })
  .catch((err) => {
    console.log(err);
  });

  //  Server Creation
const app = express();
app.use(express.json());

app.listen(3000, () => {
  console.log("Server is running on port 3000!!");
});

//  Routes
app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);

// Middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  })
})