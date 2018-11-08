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
users.push({name:'Admin', email:'Admin@sendit.dv', username:'admin', password:'admin1234', right:'admin'}); //admin acc

users.push({name:'bertin', email:'bertin@sendit.dv', username:'bertin', password:'admin1234', right:'user'});
users.push({name:'user2', email:'user2@sendit.dv', username:'user2', password:'admin1234', right:'user'});

var parcels = [
	{parcelID: 1, owner:users[1].username, parcelName:'Parcel 1', status:'Delivered'},
	{parcelID: 2, owner:users[2].username, parcelName:'Parcel 2', status:'In transit'},
	{parcelID: 3, owner:users[1].username, parcelName:'Parcel 3', status:'Canceled'},
	{parcelID: 4, owner:users[2].username, parcelName:'Parcel 4', status:'Delivered'},
	{parcelID: 5, owner:users[1].username, parcelName:'Parcel 5', status:'In transit'}
];
//End of data


app.get('/api/v1/parcels', (req, res) => { // working
	res.status(200).send(parcels);
});

app.get('/api/v1/parcels/:parcel_ID', (req, res) => { // Working
	parcel_ID= req.params.parcel_ID;
	for (var a=0; a <parcels.length; a++){
		if(parcel_ID==parcels[a].parcelID) {
			console.log(toString(parcels[a].parcelID) + ' fetched!')
			res.status(200).send(parcels[a]);
			res.end;
			break;
		}
		else {res.status(500).end()}
	}
	//res.status(200).res.send('OK')
});

app.get('/api/v1/users/:userID', (req, res) => { // Working 
	userID= req.params.userID;
	for (var a=0; a < users.length; a++){
		if(userID != users[a].username) { res.status(404).json({message: 'User doesnt exist'}); }
		else if(userID==users[a].username){
			console.log(toString(users[a].username) + ' fetched!!');
			res.status(200).send(users[a]);
			res.end();
			break;
		}
		//else { res.status(404).json({message: 'user does not exist'})}
	}


});



app.get('/api/v1/users/:userID/parcels', (req, res) => { // Working 
	userID= req.params.userID;
	for (var a=0; a < users.length; a++){
		if(userID != users[a].username){ res.status(404).json({message: 'User doesnt exist'}); break;}
		else if(userID==users[a].username){
			console.log(toString(users[a].username) + ' fetched!!');
			res.status(200).send(users[a]);
			res.end();
			break;
		}
		//else { res.status(404).json({message: 'user does not exist'}).end()}
	}

});

app.put('/api/v1/parcels/:parcel_ID/cancel', (req, res) => { 
	parcel_ID= req.params.parcel_ID;
	
});

 /*p.get('/api/v1/admin', (req, res) => {
	res.sendFile(path.join(__dirname+'/UI/admin.html'));
}) */




	


   

app.listen(3000);
console.log('Server Is OK');


module.exports= app;