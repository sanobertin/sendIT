const express= require('express')
const router = express.Router()
const bodyparser = require('body-parser').json();
const parcels= require('../models/db').parcels
const users= require('../models/db').users

module.exports= router