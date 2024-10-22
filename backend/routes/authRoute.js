import express from "express"
import { signup } from "../controllers/authController.js";

const router = express.Router();

// for authentication route
router.post("/signup", signup)

export default router;