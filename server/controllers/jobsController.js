const db = require('../dbModels.js');

function removeDuplicates(array) {
  const jsonIds = [];
  return array.filter((job) => {
    if (!jsonIds.includes(job.jsonid)) {
      jsonIds.push(job.jsonid);
      return job;
    }
  });
}
const jobsController = {};

// request all jobs for a particular user that weren't seen
jobsController.getAllJobs = (req, res, next) => {
  const { id } = req.params;
  const getJobs =
    'SELECT * FROM jobs WHERE NOT EXISTS (SELECT 1 FROM choices WHERE jobs.job_id = choices.job_id AND choices.user_id =$1)';
  db.query(getJobs, [id], (err, data) => {
    if (err) next(err);
    else {
      console.log('data.rows', data.rows.length);
      res.locals.allUnseenJobs = removeDuplicates(data.rows);
      return next();
    }
  });
};
// add a job to the choices table as YES or NO
jobsController.addJob = (req, res, next) => {
  const { user_id, status, job_id } = req.body;
  console.log(user_id, status, job_id);
  const insertJob =
    'INSERT INTO choices (status, job_id, user_id) VALUES ($1, $2, $3)';
  db.query(insertJob, [status, job_id, user_id], (err, data) => {
    if (err) next(err);
    else return next();
  });
};
// request all jobs that have a YES status for a specific user
jobsController.getAcceptedJobs = (req, res, next) => {
  const { id } = req.params;
  console.log('id', id);
  console.log('Im here');
  const getAccepted =
    "SELECT * FROM jobs INNER JOIN choices ON jobs.job_id = choices.job_id WHERE choices.user_id = $1 AND choices.status = 'Y'";
  db.query(getAccepted, [id], (err, data) => {
    if (err) next(err);
    else {
      console.log('data.rows', data.rows);
      res.locals.userYesJobs = removeDuplicates(data.rows);
      return next();
    }
  });
};
// SELECT * FROM jobs INNER JOIN choices ON jobs.job_id = choices.job_id WHERE choices.user_id = 2 AND choices.status = 'Y'
module.exports = jobsController;
