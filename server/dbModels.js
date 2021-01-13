require('dotenv').config();

const { Pool } = require('pg');
// db link from elephantSQL
const { PG_URI } = process.env;
// create a new pool here using the connection string above
const pool = new Pool({
  connectionString: PG_URI,
  max: 3,
  min: 0,
  idle: 10000,
});

// const SALT_WORK_FACTOR = 10;
// const bcrypt =

// We export an object that contains a property called query,
// which is a function that returns the invocation of pool.query() after logging the query
// This will be required in the controllers to be the access point to the database
module.exports = {
  query: (text, params, callback) => {
    console.log('Executed query:', text);
    return pool.query(text, params, callback);
  },
};
