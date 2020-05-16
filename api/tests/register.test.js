//=====================  registration.tests.js  ======================

const assert = require('assert');
const request = require('supertest');
const superagent = require('superagent');
const app = require('../server');
const helpers = require('./test_helper');
const test_user = helpers.test_user;
var chai = require('chai');
var chaiHttp = require('chai-http');

chai.use(chaiHttp);

// registration route test suite
describe('/registration tests', function(done) {
  
  //-------------- get requests ----------------
  describe('GET requests', function(done) {
    it('should respond with ok', function(done) {
      request(app)
          .get('/register')
          .expect("<h1>Registration</h1>")
          .expect(200, done);
    });
  })

  //-------------- post requests ----------------
  describe('POST requests', function(done){

    // test suite of valid post requests
    describe('valid post requests', function(done){

      // clear database of any writes made
      afterEach(function(done){
        helpers.removeDummyData();
        done();
      });
  
      // valid registration
      it('should redirect to /login', function(done){
        this.timeout(15000); //TODO: find out why this test takes so long
        request(app)
          .post('/register')
          .send(test_user)
          .expect(302)
          .expect('Location', /\/login/, done);
      });
    })

    // test suite of invalid post requests
    describe('invalid post requests', function(done){

      describe('duplicate credentials', function(done){
        
        describe('duplicate username', function(done){
          // add user to db for testing duplicate credentials 
          before(function(done){
            helpers.addDummyData(test_user);
            done();
          })
  
          // duplicate username
          it('should return \'username already exists\' and 409 status', function(done){
            this.timeout(15000);
            request(app)
              .post('/register')
              .send(test_user)
              .expect(409, done);
          })
          
          // clear database of any writes made
          after(function(done){
            helpers.removeDummyData();
            done();
          })

        })

        describe('duplicate email', function(done){
            // duplicate email, same everything else
          let duplicateEmail = {...test_user}
          duplicateEmail.username = 'adifferentusername' 
          before(function(done){
            helpers.addDummyData(duplicateEmail);
            done();
          })

          // duplicate email
          it('should return \'email already exists\' and 409 status', function(done){
            this.timeout(15000);
              request(app)
                .post('/register')
                .send(test_user)
                .expect(response => {
                  assert(response.body.msg === 'email already exists');
                })
                .expect(409, done);
          })

          // clear database of any writes made
          after(function(done){
            helpers.removeDummyData()
            done();
          })
          
        })
      })

      describe('invalid inputs', function(done){
        // no username
        it('should return \'username is required\' and 422 status', function(done){
          let invalidUser = {...test_user};
          invalidUser.username="";

            request(app)
            .post('/register')
            .send(invalidUser)
            .expect(response => {
              assert(response.body[0].msg === 'Username is required')
            })
            .expect(422, done);
        })

        // no password
        it('should return \'password is required\' and 422 status', function(done){
          let invalidUser = {...test_user};
          invalidUser.password="";

          request(app)
            .post('/register')
            .send(invalidUser)
            .expect(response => {
              assert(response.body[0].msg === 'Password is required')
            })
            .expect(422, done);
        })

        // passwords don't match
        it('should return \'passwords do not match\' and 422 status', function(done){
          let invalidUser = {...test_user};
          invalidUser.confirmPassword="non-matchingpassword";

          request(app)
            .post('/register')
            .send(invalidUser)
            .expect(422)
            .expect(response => {
              assert(response.body[0].msg, 'Passwords do not match')
            })
            .end(done);
        })

        // no email
        it('should return \'email is required\' and 422 status', function(done){
          let invalidUser = {...test_user};
          invalidUser.email="";

          request(app)
            .post('/register')
            .send(invalidUser)
            .expect(422)
            .expect(response => {
              assert(response.body[0].msg === 'Email required')
            })
            .end(done);
        })

        // bad email
        it('should return \'Invalid email\' and 422 status', function(done){
          let invalidUser = {...test_user};
          invalidUser.email="notanemail";

          request(app)
            .post('/register')
            .send(invalidUser)
            .expect(422)
            .expect(response => {
              assert(response.body[0].msg === 'Invalid email')
            })
            .end(done);
        })

        // no first name
        it('should return \'firstname is required\' and 422 status', function(done){
          let invalidUser = {...test_user};
          invalidUser.firstname="";

          request(app)
            .post('/register')
            .send(invalidUser)
            .expect(422)
            .expect(response => {
              assert(response.body[0].msg === 'Firstname is required')
            })
            .end(done)
        })

        // no last name
        it('should return \'lastname is required\' and 422 status', function(done){
          let invalidUser = {...test_user};
          invalidUser.lastname = "";

          request(app)
            .post('/register')
            .send(invalidUser)
            .expect(422)
            .expect(response => {
              assert(response.body[0].msg === 'Lastname is required');
            })
            .end(done);
        })  
      })
    })
  })
});



