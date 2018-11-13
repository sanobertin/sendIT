[![Build Status](https://travis-ci.org/sanobertin/sendIT.svg?branch=editor)](https://travis-ci.org/sanobertin/sendIT) <br />

[![Coverage Status](https://coveralls.io/repos/github/sanobertin/sendIT/badge.svg?branch=master)](https://coveralls.io/github/sanobertin/sendIT?branch=master) <br />

[![Maintainability](https://api.codeclimate.com/v1/badges/b9730dc36784773c6953/maintainability)](https://codeclimate.com/github/sanobertin/sendIT/maintainability) <br />

Project Overview<br />
SendIT is a courier service that helps users deliver parcels to different destinations. SendIT
provides courier quotes based on weight categories.<br />

Access to all API endpoints<br />

GET: /api/v1/parcels           >> Fetch all parcel delivery orders<br />
GET: /api/v1/parcels<parcelId>   >>Fetch a specific parcel delivery order<br />
GET: /api/v1/users/<usersId>/parcels  >>Fetch all parcel delivery orders by a specific user<br />
PUT: /api/v1/parcels<parcelID>/cancel >>Cancel the specific parcel delivery order<br />
POST: /api/v1/parcels >> Create a parcel delivery order<br />
  
API access site: https://sendit3.herokuapp.com/ <br />

Running the application <br />
clone the repo :<br />
cd sendIT <br />
run: npm start<br />
run: npm test  for test development <br />

