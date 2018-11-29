//import jwt from 'jsonwebtoken';
const express= require('express')
require('dotenv').config()
const execute = require('../models/db').execute

const router = express.Router();
router.use(express.json());
const jwtkey = process.env.jwtkey;

router.get('/:userID', (req, res) => { 
  const user = req.params.userID;
  const getSpecificUserQuery = `SELECT * from users where username='${user}';`;
  const result = execute(getSpecificUserQuery);
  if (result.rowCount) {
    res.status(200).json({ message: result.rows });
  }

});

router.get('/:userID/parcels', (req, res) => { // working **2
  
});
// let getAllParcelsFromSpecificUserQuery=`SELECT * from parcels where userID=${userID}`; //userid as foreign key in parcels db



module.exports= router;
