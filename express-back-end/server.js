const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const knex = require('knex');
const config = require('./knexfile')[process.env.NODE_ENV || 'development'];
const database = knex(config);

const cors = require("cors");

app.use(cors(
  { origin: "http://localhost:3002" }
));

const PORT = 8080;

// Express Configuration
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));

// Sample GET route
app.get('/api/data', (req, res) => res.json({
  message: 'Seems to work!',
}));

// questions
app.get('/api/questions', (req, res) => {
  database
    .select('*')
    .from('question')
    .then(rows => {
      // Process the rows
      console.log(rows);
      res.json({ questions: rows });
    })
    .catch(error => {
      // Handle errors
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    })
});

// highscores
app.get('/api/high-scores', (req, res) => {
  database
    .select('*')
    .from('game')
    .then(rows => {
      // Process the rows
      console.log(rows);
      res.json({ games: rows });
    })
    .catch(error => {
      // Handle errors
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    })
});

app.listen(PORT, () => {
  console.log(`Express seems to be listening on port ${PORT} 👍`);
});

