//=====================  user-account.test.js  ======================

const assert = require('assert');
const request = require('supertest');
const app = require('../server');
const helpers = require('./test_helper');


describe("/account tests", function(done){

    //=====================  valid tests ======================
    describe("valid access", function(done){

        describe("Access after registration", function(done){
            let token;

            // register user and get token
            beforeEach(function(done){
                this.timeout(15000);

                request(app)
                    .post('/register')
                    .send(helpers.loginFormTestData)
                    .end((err, response) => {
                        if(err){
                            console.log(err);
                            return;
                        }
                        token = response.body.token;
                        done();
                    });
            })

            it("should allow access to our account info", function(done){
                this.timeout(15000);

                request(app)
                    .get('/account')
                    .set("Authorization", token) // set token header
                    .expect(200);
                    done();
            })

            // clear database of any writes made
            afterEach(function(done){
                this.timeout(15000);
                helpers.removeDummyData({email:helpers.loginFormTestData.email})
                    .then(() => done())
            })

        })

        describe("Access after login", function(done){

            let token;

            // register and login user 
            beforeEach(function(done){
                this.timeout(15000);

                request(app)
                    .post('/register')
                    .send(helpers.loginFormTestData)
                    .then(() => {
                        request(app)
                        .post('/login')
                        .send(helpers.loginFormTestData)
                        .end((err, response) => {
                            token = response.body.token;
                            done();
                        })
                    });                
            })

            it("should allow access to our account info", function(done){
                this.timeout(15000);

                request(app)
                    .get('/account')
                    .set("Authorization", token)
                    .expect(200);
                done();
            })

            // clear database of any writes made
            afterEach(function(done){
                this.timeout(15000);
                helpers.removeDummyData({email:helpers.loginFormTestData.email})
                    .then(() => done())
            })

        })

    })

    //=====================  invalid tests ======================
    describe("invalid access", function(done){
        describe("no token", function(donee){
            
            it("should give 401 unauthorized status", function(done){
                this.timeout(15000);
    
                request(app)
                    .get('/account')
                    .expect(401);
                done();
            })
        })

        describe("non token", function(done){
            it("should give 401 unauthorized status", function(done){
                this.timeout(15000);
    
                request(app)
                    .get('/account')
                    .set("Authorization", "Bearer yathisisnotatokenlikeatall")
                    .expect(401);
                    done();
            })
        })
        
        describe("business user jwt", function(done){
            let token;

            // register and login user 
            beforeEach(function(done){
                this.timeout(15000);

                request(app)
                    .post('/business/register')
                    .send(helpers.businessFormTestData)
                    .then(() => {
                        request(app)
                        .post('/business/login')
                        .send(helpers.businessFormTestData)
                        .end((err, response) => {
                            token = response.body.token;
                            done();
                        })
                    });                
            })

            it("should give 401 unauthorized status", function(done){

                request(app)
                    .get('/account')
                    .set("Authorization", token)
                    .expect(401);
                done();
            })

            // clear database of any writes made
            afterEach(function(done){
                this.timeout(15000);
                helpers.removeDummyBusinessData({email:helpers.loginFormTestData.email})
                    .then(() => done())
            })


        })


    })



})