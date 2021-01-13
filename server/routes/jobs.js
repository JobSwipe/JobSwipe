const express = require('express');

const router = express.Router();

const jobsController = require('../controllers/jobsController.js');

// SAVED JOBS
router.get('/retrieveSavedJobs', jobsController.getAcceptedJobs, (req, res) => {
  console.log('finished');
  res.status(200).json({ savedJobs: res.locals.userYesJobs });
});
// UNSEEN JOBS
router.get('/retrieveAllUnseenJobs', jobsController.getAllJobs, (req, res) => {
  console.log('finished');
  res.status(200).json();
});
// SAVE JOB
router.post('/', jobsController.addJob, (req, res) => {
  console.log();
  res.status(200).json(res.locals.results);
});

module.exports = router;
