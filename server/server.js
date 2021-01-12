const express = require('express');
const app = express();
const PORT = 3333;
const path = require('path');

// TODO: finish user routes in user.js and user controller in userController.js
const userRouter = require('./routes/user.js');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/user', userRouter); //login in (save the users)//auth(res.cookies with jwt)//logout
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/index.html'));
});

// user route

// error handling
app.use((err, req, res, next) => {
  const defaultErr = {
    log:
      'Express error handler caught unknown middleware error (default error handler)',
    status: 400,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}.`);
});
