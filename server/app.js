import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { queries } from './queries.js';
import { pwd } from './directory-helper.js';

dotenv.config({ path: pwd + '/.env' });

const app = express();
const port = process.env.SERVER_PORT;

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
})

app.get('/', (req, res) => {
  res.send('Hello World');
})

app.get('/scores', queries.getAllHighScores);
app.post('/scores', queries.insertHighScore);