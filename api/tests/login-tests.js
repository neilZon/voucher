//=====================  login-tests.js  ======================

const assert = require('assert');
const request = require('supertest');
const app = require('../server');

// login page works
describe('/login tests', function() {
    it('responds with ok', function(done) {
      request(app)
        .get('/login')
        .expect(200, done);
    });
  });