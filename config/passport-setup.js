const passport = require('passport');
// you can have many strategies
const GoogleStrategy = require('passport-google-oauth20');
const fetch = require('node-fetch');
const queryController = require("../server/controllers/queryController");
const db = require("../server/dbModels");

// import the keys file that you add to gitignore
const keys = require('./keys');

// create serialized user ids
passport.serializeUser((user, done) => {
  // we want the SQL-created id of the user we query for
  console.log('serializeUser user.id', user.rows[0].user_id)
  //user.id is being stuffed into the cookie;
  // console.log('req.session.passport.user in SERIAL', req);
  return done(null, user.rows[0].user_id);

});

passport.deserializeUser(async (id, done) => {
  // we want the SQL-created id of the user we query for
  console.log('deserializeUser user.id', id)
  const user = await db.query('SELECT * FROM users WHERE "user_id" = $1', [id])
  console.log('our user inside deSERIAL is...', user.rows)
  done(null, user.rows[0]);
});

// passport.authenticate('google')
// 1st param strategy, 2nd param a cb func
passport.use(
  new GoogleStrategy({
    
    // opts for the goog strategy
    callbackURL: '/auth/google/redirect',
    clientID: keys.google.clientID,
    clientSecret: keys.google.clientSecret
  },async (accessToken, refreshToken, profile, done) => {
    console.log("inside the Google Strategy")
    try {
      
    console.log('i like turtles')
    
    const body = {
      googleid: profile.id,
      usernam: profile.displayName
    }

   
      //check if user exists in db
      const response = await db.query('SELECT * FROM users WHERE "oauth_data" = $1', [body.googleid])
     //if user does not exist, query the db again to add the user
      if (!response.rows[0]) await db.query(`INSERT INTO users (username, oauth_data) VALUES ($1, $2) RETURNING *`, [body.usernam, body.googleid])
       //else query the database to find the ID of the newly added user 
       const newUser = await db.query('SELECT * FROM users WHERE "oauth_data" = $1', [body.googleid])
       done(null, newUser);
  } catch (error) {
    console.log("we got an error", error)
  }
}
)
)