import { dbPool } from "./config.js";

function getAllHighScores(request, response) {
  const { regions } = request.query;
  dbPool.query("SELECT id, name, score, completion_time, to_char(date, 'MM-DD-YYYY') as date, regions " + 
             "FROM high_scores " +
             "WHERE regions = $1 " + 
             "ORDER BY score DESC " +
             "LIMIT 10;", 
             [regions], 
             (error, result) => {
                if (error) {
                  throw error;
                }
                response.status(200).json(result.rows);
              });
}

function insertHighScore(request, response) {
  const { name, score, completionTime, regions } = request.body;
  dbPool.query(
    "INSERT INTO high_scores (name, score, completion_time, date, regions) " +
    "VALUES ($1, $2, $3, NOW(), $4) RETURNING id;",
    [name, score, completionTime, regions],
    (error, result) => {
      if (error) {
        throw error;
      }
      response
        .status(201)
        .send("High score added with id: " + result.rows[0].id);
    }
  );
};

export const queries = {
  getAllHighScores,
	insertHighScore
}