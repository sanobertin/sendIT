
const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs'); //
const bodyparser = require('body-parser').json();
const parcelsRoutes= require('./api/routes/parcels')
const usersRoutes= require('./api/routes/users')
const staticRoutes= require('./api/routes/staticfiles')
app.use('', parcelsRoutes)
app.use('', usersRoutes)
app.use('', staticRoutes)
app.use(express.urlencoded()); // to support URL-encoded bodies
app.use(express.static(path.join(`${__dirname}/UI`)));
app.set('views', path.join(`${__dirname}/UI`)); // specify the views directory







port = process.env.PORT || 3000;
app.listen(port ,() => {
  console.log(`server is OK on port ${port}`);
});



module.exports = app;
