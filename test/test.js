const assert = require('assert');
//import chaiHttp from 'chai-http';
chaiHttp= require('chai-http')
const expect= require('expect.js')
const app = require('../app.js');
const request = require("request");
const chai= require('chai')
chai.use(chaiHttp);
let base_url = "http://localhost:3000/api/v1"



describe("List all parcels", function() {//working
     it("GET/ returns status code 200", function(done) {
         request.get(base_url+'/parcels', function(error, response, body) {
         expect(response.statusCode).to.be(200); 
         done();
     });
})
});

describe("List a particular parcel", function() {// working
     it("GET/ returns status code 200 with valid entries", function(done) {
	     request.get(base_url+'/parcels'+'/1', function(error, response, body) {
	     expect(response.statusCode).to.be(200);
	     expect(response.body).to.not.be('empty')

	     done();
     });
})
});

describe("GET/ Fetch a particular user", function() { //working
     it("should return a specific user", function(done) {
         request.get(base_url+'/users/bertin', function(error, response, body) {
         expect(response.statusCode).to.be(200);
         expect(response.body).to.not.be('empty')
         //expect(response.body).to.have.property('name')
         done();
     });
})
});

describe("GET/ all parcels from a particular user", function() { //working
     it("should return 200 status with array of parcels", function(done) {
         request.get(base_url+'/users/bertin/parcels', function(error, response, body) {
         expect(response.statusCode).to.be(200);
         expect(response.body).to.not.be('empty')
         done();
     });
})
}); 

describe("PUT/ Change the status of a parcel", () => {  //working
	it("should change the status of order", (done) =>{
		request.put(base_url+'/parcels/5/cancel', (error, response, body) => {
			expect(response.statusCode).to.be(200);
            done();
		})
	});
    it("should return error 404 if parcel not found or can't be canceled", (done) =>{
        request.put(base_url+'/parcels/1/cancel', (error, response, body) => {
            expect(response.statusCode).to.be(404);
            done()
        })
    });

})

describe("POST/ Creating a new order parcel", () => { // Working
	it("should insert new details with status 201", (done) =>{
		let parcel= { parcelID: 6, owner: 'bertin', parcelName: 'Parcel 6', status: 'In transit' };
		chai.request(app)
          .post(base_url+ 'parcels/')
          .send(parcel)
          .then(res => {
            expect(res).to.have.status(201);
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.property('success').eql(true);
            expect(res.body).to.have.property('parcelId');
            expect(res.body).to.have.property('price'); });
			
			done()
		})
	})
