import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/userRoute.js";

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

app.listen(3000, () => {
  console.log("Server is running on port 3000!!");
});


app.use("/api/user/", userRouter);