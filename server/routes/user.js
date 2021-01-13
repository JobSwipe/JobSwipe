const express = require('express');

const router = express.Router();

const userController = require('../controllers/userController.js');

// user signs up
router.post('/', userController.addUser, (req, res) => {
  console.log('finished');
  res.status(200).json(true);
});

router.post('/login', userController.verifyUser, (req, res) => {
  console.log('should be true', res.locals.results);
  res.status(200).json(res.locals.results);
});

module.exports = router;
