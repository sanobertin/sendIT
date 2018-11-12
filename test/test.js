const assert = require('assert');
const app = require('../app.js');
const request = require("request");

var base_url = "http://localhost:3000/parcels"

let User = {
   _id:1,
   name:'',
   email:'',
   password:''
};

describe("List all parcels", function() {
     it("returns status code 200", function(done) {
         request.get(base_url, function(error, response, body) {
         expect(response.statusCode).toBe(200);
         done();
     });
});

