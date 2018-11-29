const express= require('express')
const path= require('path')
const router = express.Router();
const users = require('../models/db').users;

router.get('', (req, res) => {
 	res.sendFile('index.html', { root: './UI' });
});

router.get('/profile', (req, res) => {
 	// console.log('GET: profile');
 	res.sendFile('profile.html', { root: './UI' });
});

router.get('/admin', (req, res) => {
 	console.log('GET: admin');
 	res.sendFile('admin.html', { root: './UI' });
});


router.route('/signup')

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
    res.status(200).json({ message: ' Succeed!' });
    res.end();
  });

router.route('/signin')
  .get((req, res) => {
    res.sendFile('signin.html', { root: './UI' });
  });


module.exports = router;
