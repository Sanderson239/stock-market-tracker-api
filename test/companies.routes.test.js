'use strict';

process.env.NODE_ENV = 'test';

const { suite, test } = require('mocha');
const request = require('supertest');
const knex = require('../knex.js');
const server = require('../index.js');
const { addDatabaseHooks } = require('./utils.js')
suite('companies routes', addDatabaseHooks(() => {
  test('GET /companies', (done) => {
    /* eslint-disable max-len */
    request(server)
      .get('/companies')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, [
        {
          companyId: 1,
          companyName: 'Google',
          ticker: 'goog',
          country: 'usa',
          lastFilingDate: 1,
          marketCap: 1000000001,
          sector: 'a'
        }, {
          companyId: 2,
          companyName: 'Apple',
          ticker: 'apple',
          country: 'usa',
          lastFilingDate: 2,
          marketCap: 5000000,
          sector: 'a'
        },
      ], done);
    /* eslint-enable max-len */
  });

  test('GET /companies/:id', (done) => {
    /* eslint-disable max-len */
    request(server)
      .get('/companies/1')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, {
        companyId: 1,
        companyName: 'Google',
        ticker: 'goog',
        country: 'usa',
        lastFilingDate: 1,
        marketCap: 1000000001,
        sector: 'a'
      }, done);
  });

  test('POST /companies', (done) => {
    request(server)
      .post('/companies')
      .set('Accept', 'application/json')
      .send({
        company_id: 3,
        company_name: 'Amazon',
        ticker: 'amzn',
        country: 'usa',
        last_filing_date: 1,
        market_cap: 700000001,
        sector: 'a'
      })
    .expect('Content-Type', /json/)
    .expect(200, {
      companyId: 3,
      companyName: 'Amazon',
      ticker: 'amzn',
      country: 'usa',
      lastFilingDate: 1,
      marketCap: 700000001,
      sector: 'a'
    }, done);
      /* eslint-enable max-len */
  });

  test('DELETE /companies/:id', (done) => {
    request(server)
      .del('/companies/1')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, [{
        companyId: 1,
        companyName: 'Google',
        ticker: 'goog',
        country: 'usa',
        lastFilingDate: 1,
        marketCap: 1000000001,
        sector: 'a'
      }], done);
  });

  test('GET /companies/:id that doesn\'t exist', (done) => {
    request(server)
      .get('/companies/1000')
      .set('Accept', 'application/json')
      .expect('Content-Type', /plain/)
      .expect(404, 'Not Found', done);
  });


  test('POST /companies/:id', (done) => {
    request(server)
      .post('/companies/1')
      .set('Accept', 'application/json')
      .send({
        company_id: 1,
        company_name: 'Google',
        ticker: 'goog',
        country: 'america',
        last_filing_date: 1,
        market_cap: 2000000001,
        sector: 'a'
      })
    .expect('Content-Type', /json/)
    .expect(200, {
      companyId: 1,
      companyName: 'Google',
      ticker: 'goog',
      country: 'america',
      lastFilingDate: 1,
      marketCap: 2000000001,
      sector: 'a'
    }, done);
      /* eslint-enable max-len */
  });
}));
