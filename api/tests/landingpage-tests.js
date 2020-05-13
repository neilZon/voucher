//=====================  landingpage-tests.js  ======================

const assert = require('assert');
const request = require('supertest');
const app = require('../server');

// responds ok
describe('/ tests', function() {
    it('responds with ok', function(done) {
      request(app)
        .get('/')
        .expect("voucher landing page")
        .expect(200, done);
    });
  });