
const express= require('express');
const router = express.Router();
router.use(express.json());
const execute = require('../models/db').execute

//import dotenv from 'dotenv'
require('dotenv').config();



router.get('', async(req, res) => {
  const getAllParcelsQuery= 'SELECT * from parcels'; 
  let parcels= await execute(getAllParcelsQuery);
  if (!parcels.rowCount) {
    res.status(404).json({ message: 'no parcels found' });
  } else {
  	res.status(200).json({parcels : parcels.rows});
  }
});

router.get('/:parcel_ID', async(req, res) => { 
  parcel_ID = parseInt(req.params.parcel_ID);
  let getSpecificParcelQuery= `SELECT * from parcels where parcelid=${parcel_ID}`;
  let fetched_parcel = await execute(getSpecificParcelQuery);
  if (!fetched_parcel.rowCount) {
  	res.status(404).json({ message: 'Such a parcel not found' });
  } else {
    res.status(200).json({parcel:fetched_parcel.rows});
  }
});

router.put('/:parcel_ID/cancel', async (req, res) => {
  let parcel_ID = parseInt(req.params.parcel_ID);
  let getSpecificParcelQuery= `SELECT * from parcels where parcelid=${parcel_ID}`;
  let updateSpecificParcelStatusQuery=`UPDATE parcels set status='Canceled' where parcelid=${parcel_ID}`
  let fetchedParcel = await execute(getSpecificParcelQuery);
  if (!fetchedParcel.rowCount) {
    res.status(404).json({ message: 'Parcel not found' });
  } else if (fetchedParcel.rows.status !== 'In transit') {
    res.status(404).json({ message: 'Parcel either Delivered or already canceled' });
  } else {
    let resp= await execute(updateSpecificParcelStatusQuery);
    const parcel= await execute(`select * from parcels where parcelid=${parcel_ID}`);
    res.status(202).json({ message: 'Successfully updated', parcel: parcel.rows}); 
  }
});

router.post('', async(req, res) => { 
  let newParcel = req.body.parcel;
  let createNewParcelQuery=`INSERT INTO parcels
   (owne, parcelName, fromlocation, tolocation, presentlocation, price, status)
   VALUES ('${newParcel.owne}', '${newParcel.parcelName}', '${newParcel.fromlocation}',
    '${newParcel.tolocation}','${newParcel.presentlocation}', ${parseInt(newParcel.price)},
     '${'In Transit'}' )`;
  
  if (!newParcel) {
    res.status(404).json({ message: 'Empty object or invalid data!' });
  } else {
    let resp= await execute(createNewParcelQuery);
    const parcel= await execute('SELECT * FROM parcels ORDER BY parcelid DESC LIMIT 1;');
    res.status(201).json({ message: 'Created', parcel: parcel.rows});
  }
});





router.put('/:parcelID/destination', async (req, res) => {
  //user who created this parcel are only allowed to edit
  let user= req.body.user;
  let newDestination= req.body.destination;
  let parcel_ID = parseInt(req.params.parcelID);
  let updateSpecificDestinationQuery=`UPDATE parcels set tolocation='${newDestination}' where parcelid='${parcel_ID}';`
  let checkQuery= `select distinct parcelid, owne, parcelname, fromlocation, 
  tolocation, presentlocation, price, status, parcels.date_created 
  from parcels,users where parcels.owne= '${user}';`
  let check= await execute(checkQuery)
  if(!check.rowCount){
    res.status(404).json({message:'Something wrong happens!'})
  } else {
    const update= await execute(updateSpecificDestinationQuery);
    res.status(202).json({message: 'Successfully update'})
  }
  
  let getSpecificParcelQuery= `SELECT * from parcels where parcelid=${parcel_ID}`;
});
router.put('/:parcelID/status', async (req, res) => { //
  // accessible by admins only
  // change the status of a specific parcel order
  let user= req.body.user
  let newStatus= req.body.status;
  let parcelID = parseInt(req.params.parcelID);
  if(user!=='admin'){
    res.status(403).json({message:'Unauthorized user denied.'});
  } else {
    const updateStatusQuery=`UPDATE parcels set status='${newStatus}' where parcelid=${parcelID};`
    await execute(updateStatusQuery);
    res.status(202).json({message: 'Successful updated!'})
  }
});
//

router.put('/:parcelID/presentLocation', async(req, res) => { 
  // accessible by admins only
  let user= req.body.user;
  let presentloc= req.body.location;
  let parcelID= parseInt(req.params.parcelID);
  let updateSpecificPresentlocQuery=`UPDATE parcels set presentLocation='${presentloc}' where parcelid=${parcelID};`
  if(user !=='admin'){
    res.status(403).json({message:'Unauthorized user denied.'})
  }
  else {
    await execute(updateSpecificPresentlocQuery);
    res.status(202).json({message:'Present location updated'});
  }
});

module.exports = router;
