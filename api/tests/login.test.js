//=====================  login-tests.js  ======================

const assert = require('assert');
const request = require('supertest');
const User = require('../models/Users.models');
const helpers = require('./test_helper');
const test_user = helpers.test_user;
const app = require('../server');


describe('/login tests', function() {
  
  //------------ login page works  ------------
  describe('GET tests', function(done){
    it('responds with ok', function(done) {
      request(app)
        .get('/login')
        .expect(200);
        done();
    });
  })

  describe('POST tests', function(done){

    //------------ suite of valid post requests  ------------
    describe('valid POST tests', function(done){

      // duplicate email, same everything else
      beforeEach(function(done){
        this.timeout(15000); 
         helpers.addDummyData(helpers.test_data)
          .then(() => done())
      })

      // clear database of any writes made
      afterEach(function(done){
        this.timeout(15000); 
        User.deleteMany({email:test_user.email})
         .then(() => done())
     })

      // good login
      it('responds success and status 200', function(done){
        request(app)
          .post('/login')
          .send({
            email: "john@email.com",
            password:"testpassword123"
          })
          .expect(response => {
             assert(response.body.success === true)
          })
          .expect(200);
          done();
      })

      
    })

    //------------ suite of invalid post requests  ------------
    describe('invalid POST tests', function(done){

      // incorrect properties ie. username instead of email
      it('responds with unauthorized code 401 and failure msg', function(done){
        request(app)
        .post('/login')
        .send({
          "username":"john@email.com",
          "password":"nottherightpassword"
        })
        .expect(response => {
          assert(response.body.success === false);
          assert(response.body.msg === "no user with that email");
        })
        .expect(401);
        done();
      })
      
      // incorrect email
      it('responds with unauthorized code 401 and failure msg', function(done){
        request(app)
        .post('/login')
        .send({
          "email":"notrightemail@email.com",
          "password":"notherightpassword"
        })
        .expect(response => {
          assert(response.body.success === false);
          assert(response.body.msg === "no user with that email");
        })
        .expect(401);
        done();
        
      })
      
      // incorrect password
      it('responds with unauthorized code 401 and wrong password msg', function(done){
        request(app)
        .post('/login')
        .send({
          "email":"john@email.com",
          "password":"nottherightpassword"
        })
        .expect(response => {
          assert(response.body.success === false);
          assert(response.body.msg === "wrong password");
        })
        .expect(401);
        done();
      })
    })
  })
});