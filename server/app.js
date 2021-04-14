import express from 'express';
import dotenv from 'dotenv';
import { queries } from './queries.js';
import { pwd } from './directory-helper.js';

dotenv.config({ path: pwd + '/.env' });

const app = express();
const port = process.env.SERVER_PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
})

app.get('/', (req, res) => {
  res.send('Hello World');
})

// app.get('/test', queries.test);

app.get('/scores', queries.getHighScores);