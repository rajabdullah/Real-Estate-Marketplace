import express from "express"
import { signin, signup } from "../controllers/authController.js";

const router = express.Router();

// for authentication route
router.post("/signup", signup)
router.post("/signin", signin)

export default router;