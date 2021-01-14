const router = require('express').Router();

const authCheck = (req, res, next) => {
  console.log('req.body in authCheck profile-routes', req.body)
  if (!req.user) {
    // if user is not logged in
    res.redirect('/auth/login');
  } else {
    // if they are logged in
    next();
  }
}

router.get('/', authCheck, (req, res) => {
  // console.log('req in profile-routes', req);
  // console.log('this is the req', req)
  // res.send(`you like turtles and you're logged in, this is your profile -- ${req.user.name}`);
  // res.send(console.log(req.user));
  // console.log('req.user in profile routes res.send', req);
  res.render('profile', {
    user: req.user,

  });
    
});

module.exports = router;