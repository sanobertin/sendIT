const express = require('express');

const router = express.Router();
const bodyparser = require('body-parser').json();
const parcels = require('../models/db').parcels;
const users = require('../models/db').users;
const path = require('path');

router.get('/api/v1/', (req, res) => {
 	res.sendFile('index.html', { root: './UI' });
});

router.get('/api/v1/profile', (req, res) => {
 	// console.log('GET: profile');
 	res.sendFile('profile.html', { root: './UI' });
});

router.get('/api/v1/admin', (req, res) => {
 	console.log('GET: admin');
 	res.sendFile('admin.html', { root: './UI' });
});


router.route('/api/v1/signup')

  .get((req, res) => {
    	console.log('GET: signup page');
    res.sendFile('signup.html', { root: './UI' });
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

router.route('/api/v1/signin')
  .get((req, res) => {
    res.sendFile('signin.html', { root: './UI' });
  });


module.exports = router;
