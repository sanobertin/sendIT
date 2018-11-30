const express= require('express')
const router = express.Router();
router.use(express.json());
const execute = require('../models/db').execute
require('dotenv').config()

const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
router.post('/signup', async (req, res) => {
  const rights = 'user';
  const name = req.body.name;
  const email = req.body.email;
  const username = req.body.username;
  const pass = req.body.password;
  const check = await execute(`select * from users where users.username='${username}';`);
  const createNewUserQuery = `INSERT INTO users(name, email, username, pass, rights)  
  VALUES('${name}', '${email}', '${username}', '${pass}', '${rights}');`;
  if (check.rowCount) {
    res.status(404).json({ message: 'Username already exists' });
  } else {
    await execute(createNewUserQuery);
    const user = await execute(`select * from users where username='${username}';`);
    res.status(201).json({ message: 'User Created', user: user.rows });
  }
});

router.post('/login', async (req, res) => {  
  const user= req.body.user;
  const password= req.body.password;
  const check = await execute(`select * from users where users.username='${user}' AND users.pass='${password}';`);
  if(check.rowCount){
    res.status(200).json({message: 'Logged in', user:check.rows});
  } else {
    console.log('loggin failed')
    res.status(401).json({message:'Loggin failed'})
  }
  });


module.exports = router