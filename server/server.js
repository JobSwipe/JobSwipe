const express = require("express");
const path = require("path");
const fetch = require("node-fetch");
const db = require("./dbModels.js");
const cors = require("cors");
const app = express();
const PORT = 3333;

// const userRouter = require('./routes/user');
const jobsRouter = require("./routes/jobs");
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
async function populateDb() {
  try {
    await fetch(
      "https://api.adzuna.com/v1/api/jobs/us/search/1?app_id=159d625a&app_key=2b033222da664bdad70008618275b412&results_per_page=50&what=javascript&where=cupertino&distance=20&sort_by=date&salary_min=90000"
    )
      .then((res) => res.json())
      .then((data) => {
        data.results.forEach((job) => {
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
              console.log("response.rows", response.rows);
            }
          });
        });
      });
  } catch (error) {
    console.log("error", error);
  }
}
// commented out since no data required for the moment
// populateDb();

//* GET JOBS FROM API
app.use("/jobs", jobsRouter);
// app.use('/user', userRouter); // login in (save the users)//auth(res.cookies with jwt)//logout
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/index.html"));
});

// error handling
app.use((err, req, res, next) => {
  const defaultErr = {
    log:
      "Express error handler caught unknown middleware error (default error handler)",
    status: 400,
    message: { err: "An error occurred" },
  };
  const errorObj = { ...defaultErr, ...err };
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}.`);
});
