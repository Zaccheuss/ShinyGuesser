import dotenv from 'dotenv';
import pg from 'pg';
import { pwd } from './directory-helper.js';

dotenv.config({ path: pwd + '/.env' });

const pool = new pg.Pool({
	user: process.env.DB_USER,
	host: process.env.DB_HOST,
	database: process.env.DB_NAME,
	password: process.env.DB_PASSWORD,
	port: process.env.DB_PORT,
});


const getHighScores = (reqest, response) => {
	pool.query('SELECT * FROM high_scores;', (error, result) => {
		if (error) {
			console.log(error);
		} else {
			response.status(200).json(result.rows);
		}
	})
}

export const queries = {
	getHighScores
}