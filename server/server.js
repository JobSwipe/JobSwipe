const express = require('express');
const authRoutes = require('./routes/auth-routes');
const profileRoutes = require('./routes/profile-routes');
const app = express();
const passportSetup = require('../config/passport-setup')
const path = require('path');
const bodyParser = require("body-parser");
const passport = require('passport');
const keys = require('../config/keys');
const queryController = require("./controllers/queryController");
const cookieSession = require('cookie-session');
const cookieParser = require('cookie-parser');
const jobsRouter = require('./routes/jobs');
const fetch = require('node-fetch');
const db = require('./dbModels.js');
const cors = require('cors');
const PORT = 3333;

// handle parsing request body and cookies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
// const userRouter = require('./routes/user');
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// use cookieSeession to make sessions
// encrypts cookie and makes sure it lives just a day long
app.use(cookieSession({
  // one day in milliseconds
  maxAge: 24 * 60 * 60 * 1000,
  // hide the secret key in the keys file
  keys: [keys.session.cookieKey]
}));


// we want passport to initialize and then use cookies
// this has to be run early on here in app
app.use(passport.initialize());
app.use(passport.session());

// use auth-routes at /auth
app.use('/auth', authRoutes);

// use profile routes
app.use('/profile', profileRoutes);

async function populateDb() {
  try {
    await fetch(
      'https://api.adzuna.com/v1/api/jobs/us/search/1?app_id=159d625a&app_key=2b033222da664bdad70008618275b412&results_per_page=50&what=javascript&where=cupertino&distance=20&sort_by=date&salary_min=90000'
    )
      .then((res) => res.json())
      .then((data) => {
        data.results.forEach((job) => {
          let exist = false;
          // make a query for that specific jsonId if it does not exist
          db.query(
            'SELECT * FROM jobs WHERE jsonid = $1',
            [job.id],
            (err, response) => {
              if (err) console.log(err);
              else if (response.rows.length) exist = true;
            }
          );
          // add the job to the table
          console.log('exist', exist);
          if (!exist) {
            const addJob = `INSERT INTO jobs (title, description, url, jsonid, location, salary)
            VALUES ($1, $2, $3, $4, $5, $6) RETURNING job_id`;
            const values = [
              job.title,
              job.description,
              job.redirect_url,
              job.id,
              job.location.display_name,
              job.salary_min,
            ];
            db.query(addJob, values, (err, response) => {
              if (err) console.log(err);
              else {
                console.log('response.rows', response.rows);
              }
            });
          }
        });
      });
  } catch (error) {
    console.log('error', error);
  }
}
// commented out since no data required for the moment
// populateDb();

//* GET JOBS FROM API
app.use('/jobs', jobsRouter);
// app.use('/user', userRouter); // login in (save the users)//auth(res.cookies with jwt)//logout
app.get('/*', (req, res) => {
  // console.log('you are in wildcard')
  res.sendFile(path.join(__dirname, '../client/index.html'));
});

// error handling
app.use((err, req, res, next) => {
  const defaultErr = {
    log:
      'Express error handler caught unknown middleware error (default error handler)',
    status: 400,
    message: { err: 'An error occurred' },
  };
  const errorObj = { ...defaultErr, ...err };
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}.`);
});
