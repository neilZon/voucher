//=====================  registration-tests.js  ======================

const supertest = require('supertest');
const assert = require('assert');
const app = require('../server');

// data is made persistent after success

// data is not made persistent after fail

// test with incomplete set of data

// test with same emails

// user is redirected to the login page after successful registration

// user is returned to registration after failure