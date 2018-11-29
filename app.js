const express = require('express')
const path = require('path')
const parcelsRoutes = require('./api/routes/parcels')
const usersRoutes = require('./api/routes/users')
const staticRoutes= require('./api/routes/staticfiles')
const authRoutes= require('./api/routes/auth')
const execute = require('./api/models/db').execute
const app = express();

app.use('/auth', authRoutes);
app.use('/api/v1/parcels', parcelsRoutes);
app.use('/api/v1/users', usersRoutes);
app.use('/api/v1', staticRoutes);
app.use(express.static(path.join(`${__dirname}/UI`)));
app.set('views', path.join(`${__dirname}/UI`)); // specify the views directory



app.get('/test', async (req, res)=> {
  l//
})

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`server is OK on port ${port}`);
});



module.exports = app;
