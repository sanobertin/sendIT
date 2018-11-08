const express= require('express');
const app= express();
const path= require('path')
const fs= require('fs')
app.use(express.static(path.join(__dirname+ '/UI')));

app.set('views', path.join(__dirname+ '/UI')) // specify the views directory


app.route('/api/v1/signup')

    .get(function(req, res) {
    	console.log('GET: signup page')
        res.sendFile('signup.html', {root: __dirname +'/UI'})
    })

    
    .post(function(req, res, next) {
        console.log('POST: sign up page');
        var _name= req.params.name;
		var mail= req.params.email;
		var usern= req.params.usern;
		var pass= req.params.pass;
		var rights= 'normal';
		fs.appendFile('users.txt', JSON.stringify({name: _name, email: mail, usernname: usern, password:pass, right:rights}), (error) => {if (error) console.log(error)} )
		res.status(200).json({message:' Succeed!'})
		res.end()
	})

app.route('/api/v1/signin')
	.get( (req, res) => {
		res.sendFile('signin.html', {root: __dirname +'/UI'});
	});
//Data
var admin= {name:'admin', email:'Admin@sendit.dv', usernname:'admin', password:'admin1234', right:'admin'}
const users=[];
users.push({name:'Admin', email:'Admin@sendit.dv', usernname:'admin', password:'admin1234', right:'admin'});

var parcels = [
	{parcelID: 1, owner:users[0]['username'], parcelName:'Parcel 1'},
	{parcelID: 2, owner:users[0]['username'], parcelName:'Parcel 2'},
	{parcelID: 3, owner:users[0]['username'], parcelName:'Parcel 3'},
	{parcelID: 4, owner:users[0]['username'], parcelName:'Parcel 4'},
	{parcelID: 5, owner:users[0]['username'], parcelName:'Parcel 5'}
]



app.get('/api/v1/parcels', (req, res) => {
	res.status(200).send(parcels);
})

app.get('/api/v1/parcels/:parcel_ID', (req, res) => {
	parcel_ID= req.params.parcel_ID;
	for (var a=0; a <parcels.length; a++){
		if(parcel_ID==parcels[a].parcelID) {
			res.status(200).res.send(parcels[a]);
			res.end;
		}
		else {res.status(500).end()}
	}
	//res.status(200).res.send('OK')
})

app.get('/api/v1/:username', (req, res) => {
	res.send('You are Welcome '+ req.params.username)
	//res.render('index.html', {username: req.params.username});
})

 /*p.get('/api/v1/admin', (req, res) => {
	res.sendFile(path.join(__dirname+'/UI/admin.html'));
}) */




	


   

app.listen(3000);
console.log('Server Is OK');


module.exports= app;