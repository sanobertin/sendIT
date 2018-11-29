const assert = require('assert');
//import chaiHttp from 'chai-http';
chaiHttp= require('chai-http')
const expect= require('expect.js')
const app = require('../app.js');
const request = require("request");
const chai= require('chai')
chai.use(chaiHttp);
let base_url = "http://localhost:3000/api/v1" //change



describe("List all parcels", function() {
     it("should have parcels property with status 200", function(done) {
         request.get(base_url+'/parcels', function(error, response, body) {
         expect(response.statusCode).to.be(200);
         expect(JSON.parse(response.body)).to.have.property('parcels'); 
         done();})
    });
    
});



describe("List a particular parcel", function() {
     it("GET/ returns status code 200", function(done) {
	     request.get(base_url+'/parcels'+'/1', function(error, response, body) {
	     expect(response.statusCode).to.be(200);
        done();})
     });

     it('should have property parcel', (done)=>{
        request.get(base_url+'/parcels'+'/1', (error, response, body) =>{
            expect(JSON.parse(response.body)).to.have.property('parcel');
            done();})
     });

});

describe("GET/ Fetch a particular user", function() {
     it("should return status 200", function(done) {
         request.get(base_url+'/users/bertin', function(error, response, body) {
         expect(response.statusCode).to.be(200);   
         done(); })
     });
     it('should have property user', (done)=>{
        request.get(base_url+'/users/bertin', (error, response, body) =>{
            expect(JSON.parse(response.body)).to.have.property('user'); 
            done();})
     });
     it('user property should not be empty', (done)=>{
        request.get(base_url+'/users/bertin', (error, response, body) =>{
            expect(response.body.user).to.not.be('empty');
            done();})
     });
})


describe("GET/ all parcels from a particular user", function() { 
    //some
     it("should return 200 status with array of parcels", function(done) {
         request.get(base_url+'/users/bertin/parcels', function(error, response, body) {
         expect(response.statusCode).to.be(200);
         done();})
    })
}); 

describe("PUT/ Change the status of a parcel", () => { 
	it("should return status 200", (done) =>{
		request.put(base_url+'/parcels/5/cancel', (error, response, body) => {
            expect(response.statusCode).to.be(200);
            done();})
    });
    it('should have property message', (done)=>{
        request.put(base_url+'/parcels/5/cancel', (error, response, body) =>{
            expect(JSON.parse(response.body)).to.have.property('message'); 
            done(); })
     });


    it("should return error 404 if parcel not found or can't be canceled", (done) =>{
        request.put(base_url+'/parcels/1/cancel', (error, response, body) => {
            expect(response.statusCode).to.be(404);
            done()})
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
