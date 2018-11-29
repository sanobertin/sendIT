const express= require('express')
require('dotenv').config()
const execute = require('../models/db').execute
const jwt= require('jsonwebtoken')
const router = express.Router();
router.use(express.json());
const jwtkey = process.env.jwtkey;

router.get('/:userID', async (req, res) => { 
  const user = req.params.userID;
  const getSpecificUserQuery = `SELECT * from users where username='${user}';`;
  const result = await execute(getSpecificUserQuery);
  if (result.rowCount) {
    const token= jwt.sign(result.rows, jwtkey)
    res.status(200).json({ user: result.rows, token: token });
  } else {
    res.status(404).json({message:'User not found'})
  }

});

router.get('/:userID/parcels', async (req, res) => { 
  const user= req.params.userID;
  const getAllParcelsFromSpecificUserQuery=`select distinct parcelid, owne, parcelname, fromlocation, tolocation, 
  presentlocation, price, status, parcels.date_created from parcels, users 
  where parcels.owne='${user}';`
  const check = await execute(`SELECT * from users where username='${user}';`)
  if(check.rowCount){
    const result= await execute(getAllParcelsFromSpecificUserQuery);
    const token= jwt.sign(result.rows[0], jwtkey)
    res.status(200).json({parcels: result.rows, token:token})
  } else {
    res.status(403).json( {message:`${user} doesn\'t exists`})
  }
});




module.exports= router;
