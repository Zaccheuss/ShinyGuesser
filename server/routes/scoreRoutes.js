import express from "express";
import { scoreController } from "../controllers/scoreController.js";

export const router = express.Router();

router.get("/scores", scoreController.getAllHighScores);
router.post("/scores", scoreController.insertHighScore);
