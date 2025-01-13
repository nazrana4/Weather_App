const express = require('express');
const app = express();
const sqlite3 = require('sqlite3').verbose();
const fetchWeatherData = require('./middleware/fetchData');

const cors = require('cors');
app.use(cors());

const db = new sqlite3.Database('cities.db');

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

app.get('/:city', fetchWeatherData, (req, res) => {
  if (req.error) {
    switch (req.error.status) {
      case 404:
        return res.status(404).json({msg : 'City not found'});
      case 500:
        return res.status(500).json({msg : 'Server error. Please try after some time'});
      default:
        return res.status(req.error.status || 400).json({msg : 'An unexpected error occurred'});
    }
  }

  res.status(200).json(req.weatherInfo);
});

app.get('/suggestions/:name', (req, res) => {
  const name = req.params.name.toLowerCase() + '%';

  const sql = 'SELECT name FROM cities WHERE name LIKE ?';

  db.all(sql, [name], (err, rows) => {
    if (err) {
      console.error('Error fetching suggestions:', err.message);
      return res.status(500).json({ msg: 'Internal Server Error' });
    }

    const suggestions = rows.map(row => row.name);
    res.json({suggestions : suggestions.slice(0,5)});
  });
});
