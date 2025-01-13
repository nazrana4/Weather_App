const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('cities.db');

const rawData = fs.readFileSync('city.list.json', 'utf8');
const cities = JSON.parse(rawData);

const cityNames = cities.map(city => city.name);

const insertDataInChunks = async (data, chunkSize = 500) => {
  let totalInserted = 0; 
  try {
    for (let i = 0; i < data.length; i += chunkSize) {
      const chunk = data.slice(i, i + chunkSize); // Create a chunk
      const placeholders = chunk.map(() => '(?)').join(', ');
      const sql = `INSERT INTO cities (name) VALUES ${placeholders}`;

      await new Promise((resolve, reject) => {
        db.run(sql, chunk, function (err) {
          if (err) reject(err);
          else {
            totalInserted += chunk.length; 
            resolve();
          }
        });
      });
    }
    console.log(`Total entries inserted: ${totalInserted}`);
  } catch (error) {
    console.error('Error inserting data:', error.message);
  }
};

// Create the table and insert data
db.serialize(() => {
  db.run('CREATE TABLE IF NOT EXISTS cities (name TEXT)');

  // Insert data in chunks and close the database
  insertDataInChunks(cityNames).then(() => {
    db.close();
  });
});
