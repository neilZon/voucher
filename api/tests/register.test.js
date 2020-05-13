//=====================  registration-tests.js  ======================

const assert = require('assert');
const request = require('supertest');
const app = require('../server');

// registration route test suite
describe('/registration tests', function(done) {
  
  //-------------- get requests ----------------
  describe('GET request', function(done) {
    it('should respond with ok', function(done) {
      request(app)
          .get('/register')
          .expect("<h1>Registration</h1>")
          .expect(200, done);
    });
  })

  //-------------- post requests ----------------
  describe('POST register request', function(done){

    // valid registration
    it('should redirect to /login', function(done){
      this.timeout(15000); //TODO: need to find out why this takes so long
      request(app)
        .post('/register')
        .send({
          "username": "testUsername",
          "password": "testpassword123",
          "confirmPassword": "testpassword123",
          "email": "email@email.com",
          "firstname": "first",
          "lastname": "last"
        })
        .expect(302)
        .expect('Location', /\/login/,done);
    })

    // no username
    it('should return \'username is required\' and 422 status', function(done){
      request(app)
      .post('/register')
      .send({
        "username": "",
        "password": "testpassword123",
        "confirmPassword": "testpassword123",
        "email": "email@email.com",
        "firstname": "first",
        "lastname": "last"
      })
      .expect(response => {
        assert(response.body[0].msg, 'username is required')
      })
      .expect(422, done);
    })

    // no password
    it('should return \'password is required\' and 422 status', function(done){
      request(app)
      .post('/register')
      .send({
        "username": "testUsername",
        "password": "",
        "confirmPassword": "testpassword123",
        "email": "email@email.com",
        "firstname": "first",
        "lastname": "last"
      })
      .expect(response => {
        assert(response.body[0].msg, 'password is required')
      })
      .expect(422, done);
    })

    // passwords don't match
    it('should return \'passwords do not match\' and 422 status', function(done){
      request(app)
      .post('/register')
      .send({
        "username": "testUsername",
        "password": "testpassword123",
        "confirmPassword": "gkdfhljks",
        "email": "email@email.com",
        "firstname": "first",
        "lastname": "last"
      })
      .expect(422)
      .expect(response => {
        assert(response.body[0].msg, 'Passwords do not match')
      })
      .end(done)
    })

    // no email
    it('should return \'email is required\' and 422 status', function(done){
      request(app)
      .post('/register')
      .send({
        "username": "testUsername",
        "password": "testpassword123",
        "confirmPassword": "testpassword123",
        "email": "",
        "firstname": "first",
        "lastname": "last"
      })
      .expect(422)
      .expect(response => {
        assert(response.body[0].msg === 'Email required')
      })
      .end(done);
    })

    // bad email

    // no first name
    it('should return \'firstname is required\' and 422 status', function(done){
      request(app)
      .post('/register')
      .send({
        "username": "testUsername",
        "password": "testpassword123",
        "confirmPassword": "testpassword123",
        "email": "email@email.com",
        "firstname": "",
        "lastname": "last"
      })
      .expect(422)
      .expect(response => {
        assert(response.body[0].msg === 'Firstname is required')
      })
      .end(done)
    })

    // no last name
    it('should return \'lastname is required\' and 422 status', function(done){
      request(app)
      .post('/register')
      .send({
        "username": "testUsername",
        "password": "testpassword123",
        "confirmPassword": "testpassword123",
        "email": "email@email.com",
        "firstname": "first",
        "lastname": ""
      })
      .expect(422)
      .expect(response => {
        assert(response.body[0].msg === 'Lastname is required');
      })
      .end(done);
    })
  })
});



// user is returned to registration after failure

// data is made persistent after success

// data is not made persistent after fail

// test with incomplete set of data

// test with same emails

