[![Build Status](https://travis-ci.org/sanobertin/sendIT.svg?branch=develop)](https://travis-ci.org/sanobertin/sendIT) <br />

[![Coverage Status](https://coveralls.io/repos/github/sanobertin/sendIT/badge.svg?branch=develop)](https://coveralls.io/github/sanobertin/sendIT?branch=develop) <br />

[![Maintainability](https://api.codeclimate.com/v1/badges/b9730dc36784773c6953/maintainability)](https://codeclimate.com/github/sanobertin/sendIT/maintainability) <br />

Project Overview<br />
SendIT is a courier service that helps users deliver parcels to different destinations. SendIT
provides courier quotes based on weight categories.<br />

Access to all API endpoints<br />

GET: /api/v1/parcels   <b>Fetch all parcel delivery orders</b><br />
GET: /api/v1/parcels/&lt;parcelId&gt;   <b>Fetch a specific parcel delivery order</b><br />
GET: /api/v1/users/&lt;usersId&gt;/parcels  <b>Fetch all parcel delivery orders by a specific user</b><br />
PUT: /api/v1/parcels/&lt;parcelID&gt;/cancel <b>Cancel the specific parcel delivery order</b><br />
POST: /api/v1/parcels       <b>Create a parcel delivery order</b><br />
{
	"parcel" : { 
		"parcelID": 5, 
		"owner": "bertin", 
		"parcelName": "Parcel 5", 
		"from": "Musanze", 
		"to": "Rubavu", 
		"status": "In transit"
		
	}
}
PUT: /api/v1/parcels/&lt;parcelID&gt;/destination       <b>Changing destination of a parcel order</b><br />
PUT: /api/v1/parcels/&lt;parcelID&gt;/status        <b>Changing the status of a parcel order</b><br />
PUT: /api/v1/parcels/&lt;/:parcelID&gt;/presentLocation     <b>Changing the present location of a parcel order</b><br />
POST: /api/v1/auth/signup       <b>Securely Sign up</b><br />
POST: /api/v1/auth/         <b>Securely Log in</b><br />
API access site: https://sendit3.herokuapp.com/ </b><br />

Running the application <br />
clone the repo :<br />
cd sendIT <br />
run: npm start<br />
run: npm test  for test development <br />

Template hosting site: <br />
https://sanobertin.github.io/sendIT/UI  >> index page <br />
/admin.html  <b> admin panel </b><br />
/profile.html <b>  profile page </b><br />
/signin.html <b> Sign in page </b><br />
/signup.html <b>  Sign up page </b><br />

