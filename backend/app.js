const express = require('express');
const dotenv = require('dotenv');

dotenv.config();
const app = express();
const port = process.env.SERVER_PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
})