const expect = require('chai').expect;
const app = require('supertest')(require('./app'));

describe('Authentication', ()=> {
  describe('With correct credentials', ()=> {
    it('User can login and logout', ()=> {
      let cookie;
      return app.post('/api/sessions')
        .send({ username: 'moe', password: 'MOE!'})
        .expect(204)
        .then( response => {
          cookie = response.headers['set-cookie'];
          return app.get('/api/sessions')
            .set('cookie', cookie);
        })
        .then( response => {
          expect(response.status).to.equal(200);
          expect(response.body.username).to.equal('moe');
          return app.delete('/api/sessions');
        })
        .then( response => {
          expect(response.status).to.equal(204);
          return app.get('/');
        })
        .then( response => {
          const newCookie = response.headers['set-cookie'];
          expect(newCookie).not.to.equal(cookie);
          return app.get('/api/sessions')
            .set('cookie', newCookie);
        })
        .then( response => {
          expect(response.status).to.equal(401);
        });
    });
  });
  describe('With incorrect credentials', ()=> {
    it('Return 401', ()=> {
      return app.post('/api/sessions')
        .send({ username: 'moe', password: 'MOE'})
        .expect(401);
    });
  });
});