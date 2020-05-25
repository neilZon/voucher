//=====================  business-account.tests.js  ======================

const assert = require('assert');
const request = require('supertest');

const app = require('../server');
const helpers = require('./test_helper');

const routeToTest = "/business/account";


describe("/business/account tests", function(done){

    //========================================
    describe("valid access", function(done){

        describe("access after register", function(done){

            let token;

            // register user and get token
            beforeEach(function(done){
                this.timeout(15000)

                request(app)
                    .post('/business/register')
                    .send(helpers.businessFormTestData)
                    .end((err, response) => {
                        if(err){
                            console.log(err);
                            return;
                        }
                        token = response.body.token;
                        done();
                    });
            })

            it("should allow access to our business account info", function(done){
                this.timeout(10000);
                
                request(app)
                    .get(routeToTest)
                    .set("Authorization", token) // set token header
                .expect(200,done);
                
            })

            // clear database of any writes made
            afterEach(function(done){
                this.timeout(15000);
                helpers.removeDummyBusinessData({email:helpers.businessFormTestData.email})
                    .then(() => done())
            })
        })

        describe("access after login", function(done){
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

            it("should allow access to our account info", function(done){
                this.timeout(15000);

                request(app)
                    .get(routeToTest)
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



    //========================================
    describe("invalid access", function(done){

        describe("no token", function(done){

            it("should respond with 401 unauthorized", function(done){
                request(app)
                    .get(routeToTest)
                    .expect(401);
                done();

            })
        })

        describe("non token", function(done){

            it("should respond with 401 unauthorized", function(done){
                request(app)
                    .get(routeToTest)
                    .set("Authorization", "Beaere blahbalhblahNOTATOKENblah")
                    .expect(401);
                done();

            })
        })

        describe("customer user jwt", function(done){
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

            it("should respond with 401 unauthorized", function(done){
                this.timeout(15000);

                request(app)
                    .get(routeToTest)
                    .set("Authorization", token) // set token header
                    .expect(401);
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

})
