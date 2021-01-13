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
jobsController.getAllJobs = async (req, res, next) => {
  console.log('im in the getAllJobsController');
  console.log('what is req.body', req.body);
  const { _id } = req.body;
  console.log('iddd', _id);
  const getJobs = 'SELECT * FROM jobs ';
  try {
    const { rows } = await db.query(getJobs, [_id]);
    console.log('data.rows', rows);
    res.locals.allUnseenJobs = removeDuplicates(rows);
    return next();
  } catch (err) {
    console.log('whats err', err);
    next(err);
  }
};
// add a job to the choices table as YES or NO
jobsController.addJob = (req, res, next) => {
  const { _id, status, job_id } = req.body;

  const insertJob =
    'INSERT INTO choices (status, job_id, user_id) VALUES ($1, $2, $3)';
  db.query(insertJob, [status, job_id, _id], (err, data) => {
    if (err) next(err);
    else return next();
  });
};
// request all jobs that have a YES status for a specific user
jobsController.getAcceptedJobs = (req, res, next) => {
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
};
// SELECT * FROM jobs INNER JOIN choices ON jobs.job_id = choices.job_id WHERE choices.user_id = 2 AND choices.status = 'Y'
module.exports = jobsController;
