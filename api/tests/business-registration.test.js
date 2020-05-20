//=====================  business-registration.test.js  ======================

const assert = require('assert');
const request = require('supertest');

const app = require('../server');
const helpers = require('./test_helper');
const BusinessUser = require('../models/Business-Users.models'); 

const businessRegistrationURL = '/business/register';

describe("/business-register test", function(done){
   //-------------- get requests ----------------
   describe("GET Tests", function(done){
      it("responds with 200 ok", function(done){
         request(app)
            .get(businessRegistrationURL)
            .expect(200, done);
      })
   })

   //-------------- post requests ----------------
   describe("POST tests", function(done){
      describe("Valid post tests", function(done){

         it("responds with ok and success", function(done){
            this.timeout(15000);
            request(app)
               .post(businessRegistrationURL)
               .send(helpers.businessFormTestData)
               .expect(request => {
                  assert(request.body.success === true)
               })
               .expect(200, done)
         })

         // clear database of any writes made
         afterEach(function(done){
            this.timeout(15000);
            helpers.removeDummyBusinessData({email:helpers.businessFormTestData.email})
              .then(() => done());
         })  


      })

      describe("Invalid post tests", function(done){
         describe("Duplicated credentials", function(done){
            // duplicate credentials

            // duplicate phone number

            // duplicate email 

         })

         describe("Invalid credentials", function(done){
            // no business name
            it("responds with business name required and 422 status", function(done){
               const invalidBusinessUser = {...helpers.businessFormTestData};
               invalidBusinessUser.businessName = "";

               request(app)
                  .post(businessRegistrationURL)
                  .send(invalidBusinessUser)
                  .expect(request => {
                     assert(request.body[0].msg === "Business name required")
                  })
                  .expect(422, done);
            })

            // no address
            it("responds with address required and 422 status", function(done){
               const invalidBusinessUser = {...helpers.businessFormTestData};
               invalidBusinessUser.address = "";

               request(app)
                  .post(businessRegistrationURL)
                  .send(invalidBusinessUser)
                  .expect(request => {
                     assert(request.body[0].msg === "Address name required")
                  })
                  .expect(422, done);
            })

            // no phone number
            it("responds with phone number required and 422 status", function(done){
               const invalidBusinessUser= {...helpers.businessFormTestData};
               invalidBusinessUser.phoneNumber = "";
               
               request(app)
                  .post(businessRegistrationURL)
                  .send(invalidBusinessUser)
                  .expect(request => {
                     assert(request.body[0].msg === "Phone number required")
                  })
                  .expect(422, done);
            })

            // invalid phone number
            it("responds with not a phone number and 422 status", function(done){
               const invalidBusinessUser= {...helpers.businessFormTestData};
               invalidBusinessUser.phoneNumber="123";

               request(app)
                  .post(businessRegistrationURL)
                  .send(invalidBusinessUser)
                  .expect(request => {
                     assert(request.body[0].msg === "Not a phone number")
                  })
                  .expect(422, done);
            })

            // no email
            it("responds with email is required and 422 status", function(done){
               const invalidBusinessUser= {...helpers.businessFormTestData};
               invalidBusinessUser.email = ""

               request(app)
                  .post(businessRegistrationURL)
                  .send(invalidBusinessUser)
                  .expect(request => {
                     assert(request.body[0].msg === "Email required")
                  })
                  .expect(422, done);
            })

            // invalid email
            it("responds with invalid email and 422 status", function(done){
               const invalidBusinessUser= {...helpers.businessFormTestData};
               invalidBusinessUser.email = "notemail@.co"

               request(app)
                  .post(businessRegistrationURL)
                  .send(invalidBusinessUser)
                  .expect(request => {
                     assert(request.body[0].msg === "Not a valid email")
                  })
                  .expect(422, done);
            })

            // no password
            it("responds with password is required and 422 status", function(done){
               const invalidBusinessUser= {...helpers.businessFormTestData};
               invalidBusinessUser.password = ""

               request(app)
                  .post(businessRegistrationURL)
                  .send(invalidBusinessUser)
                  .expect(request => {
                     assert(request.body[0].msg === "Password required")
                  })
                  .expect(422, done);
            })

            // non matching password
            it("responds with passwords do not match is required and 422 status", function(done){
               const invalidBusinessUser= {...helpers.businessFormTestData};
               invalidBusinessUser.password = "notrightpassword244"

               request(app)
                  .post(businessRegistrationURL)
                  .send(invalidBusinessUser)
                  .expect(request => {
                     assert(request.body[0].msg === "Passwords do not match")
                  })
                  .expect(422, done);
            })

            // short password 
            it("responds with password must be at least 6 characters and 422 status", function(done){
               const invalidBusinessUser= {...helpers.businessFormTestData};
               invalidBusinessUser.password = "pas12"

               request(app)
                  .post(businessRegistrationURL)
                  .send(invalidBusinessUser)
                  .expect(request => {
                     assert(request.body[0].msg === "Password must be at least 6 characters")
                  })
                  .expect(422, done);
            })

            // no affiliation
            it("responds with affiliation is required and 422 status", function(done){
               const invalidBusinessUser= {...helpers.businessFormTestData};
               invalidBusinessUser.affiliation = ""

               request(app)
                  .post(businessRegistrationURL)
                  .send(invalidBusinessUser)
                  .expect(request => {
                     assert(request.body[0].msg === "Affiliation required")
                  })
                  .expect(422, done);
            })

            // no first name
            it("responds with firstname is required and 422 status", function(done){
               const invalidBusinessUser= {...helpers.businessFormTestData};
               invalidBusinessUser.firstname = ""

               request(app)
                  .post(businessRegistrationURL)
                  .send(invalidBusinessUser)
                  .expect(request => {
                     assert(request.body[0].msg === "Firstname required")
                  })
                  .expect(422, done);
            })

            // no last name
            it("responds with lastname is required and 422 status", function(done){
               const invalidBusinessUser= {...helpers.businessFormTestData};
               invalidBusinessUser.lastname = ""

               request(app)
                  .post(businessRegistrationURL)
                  .send(invalidBusinessUser)
                  .expect(request => {
                     assert(request.body[0].msg === "Lastname required")
                  })
                  .expect(422, done);
            })

         })

      })
   })
})
