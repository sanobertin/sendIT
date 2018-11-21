const parcels= require('../models/db').parcels
const users= require('../models/db').users
const express = require('express');
const router = express.Router()

router.get('/api/v1/users/:userID/', (req, res) => { // Working
  userID = req.params.userID;
  for (let a = 0; a < users.length; a++) {
    while (userID == users[a].username) {
      //console.log(`${users[a].username} fetched!!`);
      res.status(200).json(users[a]);
    }
    // else { res.status(404).json({message: 'user does not exist'}).end()}
  }
  for (let a = 0; a < users.length; a++) {
    while (userID != users[a].username) {
      //console.log('User doesnt exist');
      res.status(404).json({message:'User doesnt exist'});
    }
    // else { res.status(404).json({message: 'user does not exist'}).end()}
  }
});

router.get('/api/v1/users/:userID/parcels', (req, res) => { // working **2 
  userID = req.params.userID;
  const temp = [];
  for (let a = 0; a < users.length; a++) {
    
    if (userID == users[a].username) {

      for (let b = 0; b < parcels.length; b++) {
        if (userID == parcels[b].owner) { temp.push(parcels[b]); } // returning parcels of a specific user
      }
    }
  }
  res.status(200).json(temp);
  //console.log(temp);
  res.end();
})

module.exports= router