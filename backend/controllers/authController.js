import User from "../models/UserModel.js";
import bcryptjs from "bcryptjs";

export const signup = async (req, res) => {
  const { username, email, password } = req.body;
  // encrypt the password by using bcryptjs package and give 10 as a salt number
  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({ username, email, password: hashedPassword });
  try {
    await newUser.save();
    res.status(201).json("User Created Successfully!!");
  } catch (error) {
    res.status(500).json(error.message);
  }
};
