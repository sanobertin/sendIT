const express= require('express');
const app= express();
const path= require('path')
const fs= require('fs')
app.use(express.static(__dirname + '/UI'));
app.set('views', './UI') // specify the views directory


app.get('/api/v1/', (req, res) => {
	res.render('index.html');
})

 app.get('/api/v1//admin', (req, res) => {
	res.sendFile(path.join(__dirname+'/UI/admin.html'));
})

app.get('/api/v1/signin', (req, res) => {
	res.sendFile(path.join(__dirname+'/UI/signin.html'));
})



app.get('/api/v1/:userID', (req, res, next) => {
	res.status(200).json({
		message: 'Handling Profile GET '
	})
})




const users=[];

users.push({name:'Admin', email:'Admin@sendit.dv', usernname:'admin', password:'admin1234', right:'admin'});

app.post('/api/v1/signup', (req, res) => {
	res.send('Good!')
	var _name= req.name;
	var mail= req.email;
	var usern= req.usern;
	var pass= req.pass;
	var rights= 'normal';
	fs.appendFile('users.txt', JSON.stringify({name: _name, email: mail, usernname: usern, password:pass, right:rights}), (err) => {
		res.send('successfully registered')})
	});

	

app.listen(3000);
console.log('Server Is OK');


module.exports= app;