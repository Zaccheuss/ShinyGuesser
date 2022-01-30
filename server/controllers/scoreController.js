import { queries } from "../queries.js"

function getHighScores(request, response) {
  queries.getHighScores(request, response);
}

function insertHighScore(request, response) {
  queries.insertHighScore(request, response);
}

export const scoreController = { 
  getHighScores, 
  insertHighScore
}