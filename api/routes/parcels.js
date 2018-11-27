const express= require('express')
const router = express.Router()
const bodyparser = require('body-parser').json();
const parcels= require('../models/db').parcels
const users= require('../models/db').users
const jwt= require('jsonwebtoken')
require('dotenv').config()
jwtkey= process.env.jwtkey;

router.get('/api/v1/parcels', (req, res) => { // working *2
	if(parcels===undefined){
		res.status(404).json({message:'Not parcels exist'})
	} else {
		//token= jwt.sign({parcels}, jwtkey, { expiresIn: '1h' })
  	res.status(200).json(parcels); }
});
const getAllParcelsQuery= 'SELECT * from parcels';

router.post('/api/v1/parcels', bodyparser, (req, res) => { 
  newp = JSON.parse(req.body.parcel);
  if (Object.keys(newp).length == 0) { // testing empty obj
    res.status(404).json({ message: 'Empty object!' });
  } else {
    parcels.push(newp);
    console.log('new parcel order Created');
    res.status(201).json({ message: 'Created', "new parcel":newp });
  }
});
let createNewParcelQuery=`INSERT INTO parcels () VALUES ()`; //not ending

router.get('/api/v1/parcels/:parcel_ID', (req, res) => { // Working *2
  parcel_ID = parseInt(req.params.parcel_ID);
  let fetched_parcel= parcels.find(parcel => parcel.parcelID===parcel_ID);
  if(fetched_parcel===undefined){
  	res.status(404).json({message:'Such a parcel not found'})
  } else {
  res.status(200).json(fetched_parcel)}  
 
});
let getSpecificParcelQuery= `SELECT * from parcels where id=${parcel_ID}`

router.put('/api/v1/parcels/:parcel_ID/cancel', (req, res) => { // Working not as i need
	parcel_ID = parseInt(req.params.parcel_ID);
	let fp= parcels.find(parcel => parcel.parcelID===parcel_ID);
	if(fp===undefined){
		res.status(404).json({message:'Parcel not found'})
	} else if(fp.status !== 'In transit'){
		res.status(404).json({message:'Parcel either Delivered or already canceled'})
	} else {
		fp.status='Canceled'
		res.status(200).json({message:"Successfully updated"});
	}
let updateSpecificParcelCancelQuery=`UPDATE parcels set status='canceled' where id=${parcel_ID}`
	/*for (let a = 0; a < parcels.length; a++) {
		if (parcel_ID == parcels[a].parcelID) {
		  console.log('ID found!');
		  if (parcels[a].status.toLowerCase() == 'in transit') {
		    console.log('Status match!');
		    parcels[a].status = 'Canceled';
		    res.status(200).json({ message: 'Success' });
		  } else { console.log('word doesnt match\n'); }
		} else{
			res.status(404).json({message:'Parcel doesnt exist or it has Delivered'})}
	}
	console.log(parcels); */
});
router.put('/api/v1/parcels/:parcelID/destination', (req, res) =>{
	//change the location of a specific parcel order
})
let updateSpecificDestinationQuery=`UPDATE parcels set destination=${newDestination} where id=${parcel_ID}`
router.put('/api/v1/parcels/:parcelID/status', (req, res) =>{ //accessible by admins only
	//change the status of a specific parcel order
})
let updateSpecificParcelStatusQuery=`UPDATE parcels set status=${newStatus} where id=${parcel_ID}`

router.put('/api/v1/parcels/:parcelID/presentLocation', (req, res) =>{ //accessible by admins only
	//change the status of a specific parcel order
})
let updateSpecificPresentlocQuery=`UPDATE parcels set presentLocation=${presentloc} where id=${parcel_ID}`

module.exports= router
