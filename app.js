const express = require('express');

const app = express();
const path = require('path');
const fs = require('fs');

app.use(express.static(path.join(`${__dirname}/UI`)));
// app.use(express.json());       // to support JSON-encoded bodies
// app.use(express.urlencoded()); // to support URL-encoded bodies
const bodyparser = require('body-parser').json();

app.set('views', path.join(`${__dirname}/UI`)); // specify the views directory

app.get('/api/v1/', (req, res) => {
 	console.log('GET: home');
 	res.sendFile('index.html', { root: `${__dirname}/UI` });
});

app.get('/api/v1/profile', (req, res) => {
 	console.log('GET: profile');
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
// Data
const admin = {
  name: 'admin', email: 'Admin@sendit.dv', usernname: 'admin', password: 'admin1234', right: 'admin',
};
const users = [];
users.push({
  name: 'Admin', email: 'Admin@sendit.dv', username: 'admin', password: 'admin1234', right: 'admin',
}); // admin acc

users.push({
  name: 'bertin', email: 'bertin@sendit.dv', username: 'bertin', password: 'admin1234', right: 'user',
});
users.push({
  name: 'user2', email: 'user2@sendit.dv', username: 'user2', password: 'admin1234', right: 'user',
});

const parcels = [
  {
    parcelID: 1, owner: users[1].username, parcelName: 'Parcel 1', status: 'Delivered',
  },
  {
    parcelID: 2, owner: users[2].username, parcelName: 'Parcel 2', status: 'In transit',
  },
  {
    parcelID: 3, owner: users[1].username, parcelName: 'Parcel 3', status: 'Canceled',
  },
  {
    parcelID: 4, owner: users[2].username, parcelName: 'Parcel 4', status: 'Delivered',
  },
  {
    parcelID: 5, owner: users[1].username, parcelName: 'Parcel 5', status: 'In transit',
  },
];
// End of data


app.get('/api/v1/parcels', (req, res) => { // working
  res.status(200).send(parcels);
});

app.post('/api/v1/parcels', bodyparser, (req, res) => {
  res.setHeader('Content-type', 'application/json');
  newp = req.body.parcel;
  if (Object.keys(newp).length == 0) { // testing empty obj
    console.log('empty object');
    res.status(404).json({ message: 'Empty object!' });
  } else {
    parcels.push(newp);
    console.log('new parcel order Created');
    console.log(parcels);
    res.status(200).json({ message: 'OK' });
  }
  // res.end()
});


app.get('/api/v1/parcels/:parcel_ID', (req, res) => { // Working
  parcel_ID = req.params.parcel_ID;
  for (let a = 0; a < parcels.length; a++) {
    if (parcel_ID == parcels[a].parcelID) {
      console.log(`${toString(parcels[a].parcelID)} fetched!`);
      res.status(200).send(parcels[a]);
      res.end;
      break;
    } else { res.status(404).end(); }
  }
  // res.status(200).res.send('OK')
});

app.put('/api/v1/parcels/:parcel_ID/cancel', (req, res) => { // Working
  parcel_ID = req.params.parcel_ID;
  for (let a = 0; a < parcels.length; a++) {
    if (parcel_ID == parcels[a].parcelID) {
      console.log('ID found!');
      if (parcels[a].status.toLowerCase() == 'in transit') {
        console.log('Status match!');
        parcels[a].status = 'Canceled';
        res.status(200).json({ message: parcels[a] });
      } else { console.log('word doesnt match\n'); }
    }
    // else{res.status(404).json({message:'Parcel doesnt exist or it has Delivered'})}
  }
  console.log(parcels);
});

app.get('/api/v1/users/:userID/', (req, res) => { // Working
  userID = req.params.userID;
  for (var a = 0; a < users.length; a++) {
    while (userID == users[a].username) {
      console.log(`${users[a].username} fetched!!`);
      res.status(200).json(users[a]);
      res.end();
    }
    // else { res.status(404).json({message: 'user does not exist'}).end()}
  }
  for (var a = 0; a < users.length; a++) {
    while (userID != users[a].username) {
      console.log('User doesnt exist');
      res.status(404).send('User doesnt exist');
      res.end();
    }
    // else { res.status(404).json({message: 'user does not exist'}).end()}
  }
});

app.get('/api/v1/users/:userID/parcels', (req, res) => { // working
  userID = req.params.userID;
  const temp = [];
  for (let a = 0; a < users.length; a++) {
    if (userID == users[a].username) {
      for (let b = 0; b < parcels.length; b++) {
        if (userID == parcels[b].owner) { temp.push(parcels[b]); } // returning parcels of a specific user
      }
    }
  }
  res.status(200).json(temp);
  console.log(temp);
  res.end();
});

port= process.env.PORT || 3000;
app.listen(port);
console.log('Server Is OK');


module.exports = app;
