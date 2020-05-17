//=====================  login-tests.js  ======================

const assert = require('assert');
const request = require('supertest');
const app = require('../server');

// // login page works
// describe('/login tests', function() {
//   describe('GET tests', function(done){
//     it('responds with ok', function(done) {
//       request(app)
//         .get('/login')
//         .expect(200, done);
//     });
//   })

//   describe('POST tests', function(done){
//     describe('valid POST tests', function(done){
//       it('responds with landing page and status 200', function(done){
//         request(app)
//           .post('/login')
//           .send({
//             "username":"testUsername",
//             "password":"testpassword123"
//           })
//           .expect(200, done)
//       })
//     })

//     describe('invalid POST tests', function(done){
//       it('responds with unauthorized and status 401', function(done){
//         request(app)
//           .post('login')
//           .send({
//             "username":"jfpieaf",
//             "password":"ioajwfsa;df"
//           })
//           .expect(401, done)
//       })

//     })
//   })
// });