const express = require('express');
const router = express.Router();
const parcels = require('../models/db').parcels;
const users = require('../models/db').users;
const jwt = require('jsonwebtoken');
const uuid = require('uuid/v1');
router.use(express.json());
require('dotenv').config();

jwtkey = process.env.jwtkey;

router.get('', (req, res) => { 
  if (!parcels) {
    res.status(404).json({ message: 'no parcels found' });
  } else {
    // token= jwt.sign({parcels}, jwtkey, { expiresIn: '1h' })
  	res.status(200).json({parcels : parcels});
  }
});
// const getAllParcelsQuery= 'SELECT * from parcels';

router.post('', (req, res) => { 
  let newParcel = req.body.parcel; 
  if (!newParcel) {
    res.status(404).json({ message: 'Empty object!' });
  } else {
    parcels.push(newParcel);
    res.status(201).json({ message: 'Created', parcel: newParcel });
  }
});
// let createNewParcelQuery=`INSERT INTO parcels () VALUES ()`; //not ending

router.get('/:parcel_ID', (req, res) => { 
  parcel_ID = parseInt(req.params.parcel_ID);
  const fetched_parcel = parcels.find(parcel => parcel.parcelID === parcel_ID);
  if (!fetched_parcel) {
  	res.status(404).json({ message: 'Such a parcel not found' });
  } else {
    res.status(200).json({parcel:fetched_parcel});
  }
});
// let getSpecificParcelQuery= `SELECT * from parcels where id=${parcel_ID}`;

router.put('/:parcel_ID/cancel', (req, res) => {
  parcel_ID = parseInt(req.params.parcel_ID);
  const fp = parcels.find(parcel => parcel.parcelID === parcel_ID);
  if (!fp) {
    res.status(404).json({ message: 'Parcel not found' });
  } else if (fp.status !== 'In transit') {
    res.status(404).json({ message: 'Parcel either Delivered or already canceled' });
  } else {
    fp.status = 'Canceled';
    res.status(200).json({ message: 'Successfully updated', parcel:fp }); 
  }
});
router.put('/:parcelID/destination', (req, res) => {
  // change the location of a specific parcel order
});
// let updateSpecificDestinationQuery=`UPDATE parcels set destination=${newDestination} where id=${parcel_ID}`
router.put('/:parcelID/status', (req, res) => { // accessible by admins only
  // change the status of a specific parcel order
});
// let updateSpecificParcelStatusQuery=`UPDATE parcels set status=${newStatus} where id=${parcel_ID}`

router.put('/:parcelID/presentLocation', (req, res) => { // accessible by admins only
  // change the status of a specific parcel order
});
// let updateSpecificPresentlocQuery=`UPDATE parcels set presentLocation=${presentloc} where id=${parcel_ID}`

module.exports = router;
