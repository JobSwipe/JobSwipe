const express = require('express');
const router = express.Router();
const userController = require('../controllers/userControllers.js');
router.get('/', (req, res) => {
  res.status(200).json('user route set up');
});
module.exports = router;
