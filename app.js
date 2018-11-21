
const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs'); //
const parcelsRoutes= require('./api/routes/parcels')
const usersRoutes= require('./api/routes/users')
//const staticRoutes= require('./api/routes/staticfiles')
app.use('', parcelsRoutes)
app.use('', usersRoutes)
//app.use('', staticRoutes)

app.use(express.static(path.join(`${__dirname}/UI`)));
// app.use(express.json());       // to support JSON-encoded bodies
// app.use(express.urlencoded()); // to support URL-encoded bodies
const bodyparser = require('body-parser').json();

app.set('views', path.join(`${__dirname}/UI`)); // specify the views directory

app.get('/api/v1/', (req, res) => {
 	res.sendFile('index.html', { root: `${__dirname}/UI` });
});

app.get('/api/v1/profile', (req, res) => {
 	//console.log('GET: profile');
 	res.sendFile('profile.html', { root: `${__dirname}/UI` });
});

app.get('/api/v1/admin', (req, res) => {
 	console.log('GET: admin');
 	res.sendFile('admin.html', { root: `${__dirname}/UI` });
});


app.route('/api/v1/signup')

  .get((req, res) => {
    	console.log('GET: signup page');
    res.sendFile('signup.html', { root: `${__dirname}/UI` });
  })


  .post((req, res, next) => {
    console.log('POST: sign up page');
    const _name = req.params.name;
    const mail = req.params.email;
    const usern = req.params.usern;
    const pass = req.params.pass;
    const rights = 'normal';
    fs.appendFile('users.txt', JSON.stringify({
      name: _name, email: mail, usernname: usern, password: pass, right: rights,
    }), (error) => { if (error) console.log(error); });
    res.status(200).json({ message: ' Succeed!' });
    res.end();
  });

app.route('/api/v1/signin')
  .get((req, res) => {
    res.sendFile('signin.html', { root: `${__dirname}/UI` });
  });





port = process.env.PORT || 3000;
app.listen(port ,() => {
  console.log(`server is OK on port ${port}`);
});



module.exports = app;
