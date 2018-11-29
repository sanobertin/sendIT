const express= require('express')
const router = express.Router();
router.use(express.json());
const execute = require('../models/db').execute

const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
router.post('/signup', async (req, res) => {
  const rights = 'user';
  const name = req.body.name;
  const email = req.body.email;
  const username = req.body.username;
  const pass = req.body.password;
  const check = await execute(`select * from users where users.username='${username}';`);
  console.log(check.rowCount);
  const createNewUserQuery = `INSERT INTO users(name, email, username, pass, rights)  
  VALUES('${name}', '${email}', '${username}', '${pass}', '${rights}');`;
  if (check.rowCount) {
    console.log('check failed');
    res.status(404).json({ message: 'Username already exists' });
  } else {
    console.log('check succes');
    await execute(createNewUserQuery);
    const user = await execute(`select * from users where username=${username};`);
    res.status(201).json({ message: 'User Created', user: user.rows });
  }
});

router.post('/login', (req, res) => {
    // new rules for logging in a user
  });


module.exports = router