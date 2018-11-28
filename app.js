
//import express from 'express';
const express = require('express');
const app = express();
const path = require('path');
const execute = require('./api/models/db').execute;
const parcelsRoutes = require('./api/routes/parcels');
const usersRoutes = require('./api/routes/users');
const staticRoutes = require('./api/routes/staticfiles');

app.use('/api/v1/parcels', parcelsRoutes);
app.use('/api/v1/users', usersRoutes);
app.use('/api/v1', staticRoutes);
app.use(express.static(path.join(`${__dirname}/UI`)));
app.set('views', path.join(`${__dirname}/UI`)); // specify the views directory


const a = 'CREATE TABLE parcels('
+ 'parcelID SERIAL,'
+ 'owner TEXT NOT NULL,'
+ 'parcelName TEXT NOT NULL,'
+ 'fromlocation TEXT NOT NULL, '
+ 'tolocation TEXT NOT NULL, '
+ 'presentLocation TEXT NOT NULL, '
+ 'price DECIMAL(600, 3) NOT NULL, '
+ 'status TEXT NOT NULL, '
+ 'PRIMARY KEY (parcelID), '
+ 'FOREIGN KEY (userID) REFERENCES users(userID)'
+ ');';
app.get('/test', async (req, res) => {
  const result = await execute(a);
  res.send(result);
});


const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`server is OK on port ${port}`);
});


module.exports = app;
