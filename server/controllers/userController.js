const bcrypt = require('bcrypt');
const db = require('../dbModels.js');

const userController = {};

userController.addUser = async (req, res, next) => {
  console.log('inside addUser');
  const { username, email, password, zipcode } = req.body;

  // handle form errors into an array
  //* check if all forms are entered
  if (!username || !email || !password) {
    return res.json({ message: 'please enter all fields' }); // or redirect
  }
  //* check if the password is long enough to be more secure
  if (password.length < 6) {
    res.json({ message: 'Password must be a least 6 characters long' });
  }

  //* form validation has passed
  const hashPassword = await bcrypt.hash(password, 10);
  console.log(hashPassword);

  const addUser = `INSERT INTO users (username, email, password)
    VALUES ($1, $2, $3) RETURNING _id`;
  const values = [username, email, hashPassword];
  db.query(addUser, values, (err, data) => {
    if (err) next(err);
    else {
      console.log('data.rows', data.rows);
      return next();
    }
  });
};
