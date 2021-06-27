import { queries } from "../queries.js"

function getAllHighScores(request, response) {
  queries.getAllHighScores(request, response);
}

function insertHighScore(request, response) {
   queries.insertHighScore(request, response);
}

export const scoreController = { 
  getAllHighScores, 
  insertHighScore
}