const db = require("../dbModels");
let bodyParser = require("body-parser");
let urlencodedParser = bodyParser.urlencoded({ extended: false });

const queryController = {};

// GET request to get all db info for schema_list and fields tables
queryController.addNewUser = async (req, res, next) => {
  console.log("we made it, addNewUser")
  try {
  // console.log('req in addNewUser', req.body)
  const { googleid, usernam } = req.body;
    console.log('googleid', googleid);
    console.log('usernam', usernam);
  const text = `INSERT INTO users (name, oauth_data) VALUES ($1, $2) RETURNING *`;

  const newEntry = await db.query(text, [usernam, googleid])
  console.log("this is the new entry", newEntry.rows[0])
  res.locals.newEntry = newEntry.rows[0]
    // .then((data) => {
    //   console.log('data from addNewUser', data)
    //   res.status(200).send("new user via oauth added to users table");
      return next();
    } catch(err) {
      return console.error(err.message)
    };
};

queryController.getOneUser = async (req, res, next) => {
  console.log('getting one user');
  try {
    const { googleid } = req.params;
    console.log('googleid getOneUser', googleid);
    const text = `SELECT id FROM "public"."users" WHERE "oauth_data" = $1`;

    const foundOne = await db.query(text, [googleid]);
    console.log("we found one", foundOne.rows[0]);
    res.locals.foundOne = foundOne.rows[0];
    console.log("this is our res.locals.foundOne", res.locals.foundOne)
      return next();
  } catch(err) {
    return console.error(err.message);
  };
};


module.exports = queryController;
