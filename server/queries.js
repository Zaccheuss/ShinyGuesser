import dotenv from "dotenv";
import pg from "pg";
import { pwd } from "./directory-helper.js";

dotenv.config({ path: pwd + "/.env" });

const pool = new pg.Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

const getAllHighScores = (request, response) => {
  const { regions } = request.query;
  // if (regions) {
    pool.query("SELECT * FROM high_scores WHERE regions = $1;", [regions], (error, result) => {
          if (error) {
            throw error;
          } else {
            response.status(200).json(result.rows);
          }
    });
  // } 
  // else {
  //   pool.query("SELECT * FROM high_scores;", (error, result) => {
  //     if (error) {
  //       throw error;
  //     } else {
  //       response.status(200).json(result.rows);
  //     }
  //   });
  // }
}

const insertHighScore = (request, response) => {
  const { name, score, completionTime, regions } = request.body;
  pool.query(
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