const express= require('express');
const app= express();
const path= require('path')
ejs= require('ejs')
app.use(express.static(__dirname + '/UI'));
app.set('views', './UI') // specify the views directory
app.set('view engine', 'ejs');

const profileroutes= require('./api/routes/profile.js');

app.get('/', (req, res) => {
	res.render('index', {var1:'Bertin did it'});
})

/*/ app.get('/admin', (req, res) => {
	res.sendFile(path.join(__dirname+'/UI/admin.html'));
})

app.get('/signin', (req, res) => {
	res.sendFile(path.join(__dirname+'/UI/signin.html'));
})



app.use('/profile', profileroutes);
app.use(express.static(path.join(__dirname + '/UI')));


var parcels= ['parcel 1', 'parcel 1', 'parcel 2', 'parcel 3', 'parcel 4', 'parcel 5', 'parcel 6']

app.get('/parcels', (req, res) => {
	res.render(path.join(__dirname+'/UI/index.html'), {'var1': 'P1', 'var2':'P2'});
}) */

app.get('/signup', (req, res) => {
	res.render('signup.html')
})
app.listen(3000);
console.log('Server Is OK');


module.exports= app;