
const express = require('express');

const app = express();
const path = require('path');
const execute = require('./api/models/db').execute;
const parcelsRoutes = require('./api/routes/parcels');
const usersRoutes = require('./api/routes/users');
const staticRoutes = require('./api/routes/staticfiles');

// change
app.use('', parcelsRoutes);
app.use('', usersRoutes);
app.use('', staticRoutes);
app.use(express.urlencoded()); // to support URL-encoded bodies
app.use(express.static(path.join(`${__dirname}/UI`)));
app.set('views', path.join(`${__dirname}/UI`)); // specify the views directory


const a = 'CREATE TABLE parcels('
+ 'parcelID SERIAL,'
+ 'owner VARCHAR(100) not null,'
+ 'parcelName VARCHAR(100) not null,'
+ 'fromlocation VARCHAR(100) not null, '
+ 'tolocation VARCHAR(100) not null, '
+ 'presentLocation VARCHAR(100) not null, '
+ 'price DECIMAL(600, 3) not null, '
+ 'status VARCHAR(100) not null, '
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
