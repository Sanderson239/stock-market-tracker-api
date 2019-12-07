'use strict';

process.env.NODE_ENV = 'test';

const { suite, test } = require('mocha');
const request = require('supertest');
const knex = require('../knex.js');
const server = require('../index.js');
const { addDatabaseHooks } = require('./utils.js')
suite('daily_stock_info routes', addDatabaseHooks(() => {
  test('GET /dailyStockInfo', (done) => {
    /* eslint-disable max-len */
    request(server)
      .get('/dailyStockInfo')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, [
        {
          dailyStockInfoId: 1,
          companyId: 1,
          openPrice: 2.01,
          closingPrice: 3.50,
          dateId: 1,
          lastFilingDate: 1,
          askPrice: 2.5,
          bidPrice: 3.1,
          lastPrice: 1,
          eodToEodPercentChange: .5,
          eodToSodPercentChange: .03,
          sodToEodPercentChange: .20,
          eodToEodAbsoluteChange: 50,
          eodToSodAbsoluteChange: 20,
          sodToEodAbsoluteChange: 10
        }, {
          dailyStockInfoId: 2,
          companyId: 2,
          openPrice: 2.01,
          closingPrice: 3.50,
          dateId: 1,
          lastFilingDate: 1,
          askPrice: 2.5,
          bidPrice: 3.1,
          lastPrice: 1,
          eodToEodPercentChange: .5,
          eodToSodPercentChange: .03,
          sodToEodPercentChange: .20,
          eodToEodAbsoluteChange: 50,
          eodToSodAbsoluteChange: 20,
          sodToEodAbsoluteChange: 10
        },
      ], done);
    /* eslint-enable max-len */
  });

  test('GET /dailyStockInfo/:id', (done) => {
    /* eslint-disable max-len */
    request(server)
      .get('/dailyStockInfo/1')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, {
        dailyStockInfoId: 1,
        companyId: 1,
        openPrice: 2.01,
        closingPrice: 3.50,
        dateId: 1,
        lastFilingDate: 1,
        askPrice: 2.5,
        bidPrice: 3.1,
        lastPrice: 1,
        eodToEodPercentChange: .5,
        eodToSodPercentChange: .03,
        sodToEodPercentChange: .20,
        eodToEodAbsoluteChange: 50,
        eodToSodAbsoluteChange: 20,
        sodToEodAbsoluteChange: 10
      }, done);
  });

  test('POST /dailyStockInfo', (done) => {
    request(server)
      .post('/dailyStockInfo')
      .set('Accept', 'application/json')
      .send({
        daily_stock_info_id: 3,
        company_id: 2,
        open_price: 2.01,
        closing_price: 3.50,
        date_id: 1,
        last_filing_date: 1,
        ask_price: 2.5,
        bid_price: 3.1,
        last_price: 1,
        eod_to_eod_percent_change: .5,
        eod_to_sod_percent_change: .03,
        sod_to_eod_percent_change: .20,
        eod_to_eod_absolute_change: 50,
        eod_to_sod_absolute_change: 20,
        sod_to_eod_absolute_change: 50
      })
    .expect('Content-Type', /json/)
    .expect(200, {
      dailyStockInfoId: 3,
      companyId: 2,
      openPrice: 2.01,
      closingPrice: 3.50,
      dateId: 1,
      lastFilingDate: 1,
      askPrice: 2.5,
      bidPrice: 3.1,
      lastPrice: 1,
      eodToEodPercentChange: .5,
      eodToSodPercentChange: .03,
      sodToEodPercentChange: .20,
      eodToEodAbsoluteChange: 50,
      eodToSodAbsoluteChange: 20,
      sodToEodAbsoluteChange: 50
    }, done);
      /* eslint-enable max-len */
  });

  test('DELETE /dailyStockInfo/:id', (done) => {
    request(server)
      .del('/dailyStockInfo/2')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, [{
        dailyStockInfoId: 2,
        companyId: 2,
        openPrice: 2.01,
        closingPrice: 3.50,
        dateId: 1,
        lastFilingDate: 1,
        askPrice: 2.5,
        bidPrice: 3.1,
        lastPrice: 1,
        eodToEodPercentChange: .5,
        eodToSodPercentChange: .03,
        sodToEodPercentChange: .20,
        eodToEodAbsoluteChange: 50,
        eodToSodAbsoluteChange: 20,
        sodToEodAbsoluteChange: 10
      }], done);
  });

  test('GET /dailyStockInfo/:id that doesn\'t exist', (done) => {
    request(server)
      .get('/dailyStockInfo/1000')
      .set('Accept', 'application/json')
      .expect('Content-Type', /plain/)
      .expect(404, 'Not Found', done);
  });


  test('POST /dailyStockInfo/:id', (done) => {
    request(server)
      .post('/dailyStockInfo/1')
      .set('Accept', 'application/json')
      .send({
        daily_stock_info_id: 1,
        company_id: 2,
        open_price: 2.01,
        closing_price: 3.50,
        date_id: 1,
        last_filing_date: 2,
        ask_price: 2.5,
        bid_price: 3.1,
        last_price: 1,
        eod_to_eod_percent_change: .5,
        eod_to_sod_percent_change: .03,
        sod_to_eod_percent_change: .20,
        eod_to_eod_absolute_change: 50,
        eod_to_sod_absolute_change: 20,
        sod_to_eod_absolute_change: 10
      })
    .expect('Content-Type', /json/)
    .expect(200, {
      dailyStockInfoId: 1,
      companyId: 2,
      openPrice: 2.01,
      closingPrice: 3.50,
      dateId: 1,
      lastFilingDate: 2,
      askPrice: 2.5,
      bidPrice: 3.1,
      lastPrice: 1,
      eodToEodPercentChange: .5,
      eodToSodPercentChange: .03,
      sodToEodPercentChange: .20,
      eodToEodAbsoluteChange: 50,
      eodToSodAbsoluteChange: 20,
      sodToEodAbsoluteChange: 10
    }, done);
      /* eslint-enable max-len */
  });
}));
