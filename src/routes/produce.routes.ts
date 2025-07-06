import express from "express";
import { verifyToken } from "../middleware/verifyToken";

const router = express.Router();

router.get("/dashboard", verifyToken, (req: any, res) => {
  res.json({ message: "You are authenticated!!", user: req.user });
});

export default router;
