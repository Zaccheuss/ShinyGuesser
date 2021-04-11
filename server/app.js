const express = require('express');
require('dotenv').config();

const app = express();
const port = process.env.SERVER_PORT;
console.log(process.env.DB_USER);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
})

app.get('/', () => {
  console.log('hello world');
})