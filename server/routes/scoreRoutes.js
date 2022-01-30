import express from "express";
import { scoreController } from "../controllers/scoreController.js";
import { validationResult, check } from "express-validator";

export const router = express.Router();

router.get("/scores",
  scoreController.getHighScores
);
router.post("/scores", 
  [
    check("name")
      .trim()
      .exists()
      .notEmpty()
      .withMessage("Name cannot be empty")
      .isLength({ max: 25 })
      .withMessage("Name must be under 25 characters"),
    check("score")
      .exists()
      .withMessage("Score cannot be empty")
      .isInt({ max: 10 })
      .withMessage("Score cannot be more than 10")
      .isInt({ min: 0 })
      .withMessage("Score cannot be less than zero"),
    check("completionTime")
      .exists()
      .withMessage("Completion time cannot be empty")
      .isInt({ min: 1 })
      .withMessage("Completion time cannot be zero or less"),
    check("regions")
      .isArray()
      .withMessage("Regions must be an array")
      .custom(regionValidator)
      .withMessage("Region name is not valid")
  ],
  (request, response) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() });
    }

    scoreController.insertHighScore(request, response);
  })

  function regionValidator(regionName) {
    const isValid = true;
    const regionArrayNames = 
    ["Kanto", "Johto", "Hoenn", "Sinnoh", "Unova", "Kalos", "Alola", "Galar"]

    regionName.forEach((region) => {
      if (!regionArrayNames.includes(region)) {
        isValid = false;
      }
    })

    return isValid;
  }

