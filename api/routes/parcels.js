const express= require('express')
const router = express.Router()
const bodyparser = require('body-parser').json();
const parcels= require('../models/db').parcels
const users= require('../models/db').users

router.get('/api/v1/parcels', (req, res) => { // working *2
	if(parcels===undefined){
		res.status(404).json({message:'Not parcels exist'})
	} else {
  res.status(200).json(parcels); }
});

router.post('/api/v1/parcels', bodyparser, (req, res) => { 
  newp = req.body.parcel;
  if (Object.keys(newp).length == 0) { // testing empty obj
    res.status(404).json({ message: 'Empty object!' });
  } else {
    parcels.push(newp);
    console.log('new parcel order Created');
    //console.log(parcels[this.length -1]);
    res.status(201).json({ message: 'Created' });
  }
});

router.get('/api/v1/parcels/:parcel_ID', (req, res) => { // Working *2
  parcel_ID = parseInt(req.params.parcel_ID);
  let fetched_parcel= parcels.find(parcel => parcel.parcelID===parcel_ID);
  if(fetched_parcel===undefined){
  	res.status(404).json({message:'Such a parcel not found'})
  } else {
  res.status(200).json(fetched_parcel)}  
 
});

router.put('/api/v1/parcels/:parcel_ID/cancel', (req, res) => { // Working not as i need
	parcel_ID = req.params.parcel_ID;
	for (let a = 0; a < parcels.length; a++) {
		if (parcel_ID == parcels[a].parcelID) {
		  console.log('ID found!');

		  if (parcels[a].status.toLowerCase() == 'in transit') {
		    console.log('Status match!');
		    parcels[a].status = 'Canceled';
		    res.status(200).json({ message: 'Success' });
		  } else { console.log('word doesnt match\n'); }
		}
	// else{res.status(404).json({message:'Parcel doesnt exist or it has Delivered'})}
	}
	console.log(parcels);
});


module.exports= router
