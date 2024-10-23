import User from "../models/UserModel.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  // encrypt the password by using bcryptjs package and give 10 as a salt number
  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({ username, email, password: hashedPassword });
  try {
    await newUser.save();
    res.status(201).json("User Created Successfully!!");
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    //  check the requested User's email exist in our database or not
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return next(errorHandler(404, "User not found!"));
    }
    // check the password is correct or not
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      return next(errorHandler(401, "Wrong Credentials!"));
    }

    // generate token
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    // destructure the password so we can't see password even if its hashed
    const {password: pass, ...rest} = validUser._doc;
    // save token in cookie
    res
      .cookie("accessToken", token, { httpOnly: true })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
};
