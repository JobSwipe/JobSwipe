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
jobsController.getAllJobs((req, res, next) => {
  const { _id } = req.params;
  const getJobs = '';
  db.query(getJobs, [_id], (err, data) => {
    if (err) next(err);
    else {
      console.log('data.rows', data.rows);
      res.locals.allUnseenJobs = removeDuplicates(data.rows);
      return next();
    }
  });
});
// add a job to the choices table as YES or NO
jobsController.addJob((req, res, next) => {
  const { _id, status, job_id } = req.body;

  const insertJob =
    'INSERT INTO choices (status, job_id, user_id) VALUES ($1, $2, $3)';
  db.query(insertJob, [status, job_id, _id], (err, data) => {
    if (err) next(err);
    else return next();
  });
});
// request all jobs that have a YES status for a specific user
jobsController.getAcceptedJobs((req, res, next) => {
  const { _id } = req.params;

  const getAccepted =
    'SELECT * FROM jobs INNER JOIN choices ON jobs.job_id = choices.job_id WHERE choices.user_id = $1 AND choices.status = "Y"';
  db.query(getAccepted, [_id], (err, data) => {
    if (err) next(err);
    else {
      console.log('data.rows', data.rows);
      res.locals.userYesJobs = removeDuplicates(data.rows);
      return next();
    }
  });
});
// SELECT * FROM jobs INNER JOIN choices ON jobs.job_id = choices.job_id WHERE choices.user_id = 2 AND choices.status = 'Y'
module.exports = jobsController;
