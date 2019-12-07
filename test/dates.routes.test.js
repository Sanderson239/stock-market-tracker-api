'use strict';

process.env.NODE_ENV = 'test';

const { suite, test } = require('mocha');
const request = require('supertest');
const knex = require('../knex.js');
const server = require('../index.js');
const { addDatabaseHooks } = require('./utils.js')
suite('dates routes', addDatabaseHooks(() => {
  test('GET /dates', (done) => {
    /* eslint-disable max-len */
    request(server)
      .get('/dates')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, [
        {
          dateId: 1,
          date: 'yesterday',
          sandpTotal: 500.01,
          nasdaqTotal: 300.50,
          dowJonesTotal: 1000,
          sandpEodToEodPercentChange: .02,
          sandpEodToSodPercentChange: .50,
          sandpSodToEodPercentChange: .10,
          sandpEodToEodAbsoluteChange: 100.02,
          sandpEodToSodAbsoluteChange: 100.50,
          sandpSodToEodAbsoluteChange: 100.10,
          nasdaqEodToEodPercentChange: .02,
          nasdaqEodToSodPercentChange: .50,
          nasdaqSodToEodPercentChange: .10,
          nasdaqEodToEodAbsoluteChange: 100.02,
          nasdaqEodToSodAbsoluteChange: 100.50,
          nasdaqSodToEodAbsoluteChange: 100.10,
          dowJonesEodToEodPercentChange: .02,
          dowJonesEodToSodPercentChange: .50,
          dowJonesSodToEodPercentChange: .10,
          dowJonesEodToEodAbsoluteChange: 100.02,
          dowJonesEodToSodAbsoluteChange: 100.50,
          dowJonesSodToEodAbsoluteChange: 100.10,
          shanghaiTotal: 300.50,
          hongKongTotal: 1000,
          shanghaiEodToEodPercentChange: .02,
          shanghaiEodToSodPercentChange: .50,
          shanghaiSodToEodPercentChange: .10,
          shanghaiEodToEodAbsoluteChange: 100.02,
          shanghaiEodToSodAbsoluteChange: 100.50,
          shanghaiSodToEodAbsoluteChange: 100.10,
          hongKongEodToEodPercentChange: .02,
          hongKongEodToSodPercentChange: .50,
          hongKongSodToEodPercentChange: .10,
          hongKongEodToEodAbsoluteChange: 100.02,
          hongKongEodToSodAbsoluteChange: 100.50,
          hongKongSodToEodAbsoluteChange: 100.10,
        },
        {
          dateId: 2,
          date: 'yesterday',
          sandpTotal: 500.01,
          nasdaqTotal: 300.50,
          dowJonesTotal: 1000,
          sandpEodToEodPercentChange: .02,
          sandpEodToSodPercentChange: .50,
          sandpSodToEodPercentChange: .10,
          sandpEodToEodAbsoluteChange: 100.02,
          sandpEodToSodAbsoluteChange: 100.50,
          sandpSodToEodAbsoluteChange: 100.10,
          nasdaqEodToEodPercentChange: .02,
          nasdaqEodToSodPercentChange: .50,
          nasdaqSodToEodPercentChange: .10,
          nasdaqEodToEodAbsoluteChange: 100.02,
          nasdaqEodToSodAbsoluteChange: 100.50,
          nasdaqSodToEodAbsoluteChange: 100.10,
          dowJonesEodToEodPercentChange: .02,
          dowJonesEodToSodPercentChange: .50,
          dowJonesSodToEodPercentChange: .10,
          dowJonesEodToEodAbsoluteChange: 100.02,
          dowJonesEodToSodAbsoluteChange: 100.50,
          dowJonesSodToEodAbsoluteChange: 100.10,
          shanghaiTotal: 300.50,
          hongKongTotal: 1000,
          shanghaiEodToEodPercentChange: .02,
          shanghaiEodToSodPercentChange: .50,
          shanghaiSodToEodPercentChange: .10,
          shanghaiEodToEodAbsoluteChange: 100.02,
          shanghaiEodToSodAbsoluteChange: 100.50,
          shanghaiSodToEodAbsoluteChange: 100.10,
          hongKongEodToEodPercentChange: .02,
          hongKongEodToSodPercentChange: .50,
          hongKongSodToEodPercentChange: .10,
          hongKongEodToEodAbsoluteChange: 100.02,
          hongKongEodToSodAbsoluteChange: 100.50,
          hongKongSodToEodAbsoluteChange: 100.10,
        },
      ], done);
    /* eslint-enable max-len */
  });

  test('GET /dates/:id', (done) => {
    /* eslint-disable max-len */
    request(server)
      .get('/dates/1')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, {
        dateId: 1,
        date: 'yesterday',
        sandpTotal: 500.01,
        nasdaqTotal: 300.50,
        dowJonesTotal: 1000,
        sandpEodToEodPercentChange: .02,
        sandpEodToSodPercentChange: .50,
        sandpSodToEodPercentChange: .10,
        sandpEodToEodAbsoluteChange: 100.02,
        sandpEodToSodAbsoluteChange: 100.50,
        sandpSodToEodAbsoluteChange: 100.10,
        nasdaqEodToEodPercentChange: .02,
        nasdaqEodToSodPercentChange: .50,
        nasdaqSodToEodPercentChange: .10,
        nasdaqEodToEodAbsoluteChange: 100.02,
        nasdaqEodToSodAbsoluteChange: 100.50,
        nasdaqSodToEodAbsoluteChange: 100.10,
        dowJonesEodToEodPercentChange: .02,
        dowJonesEodToSodPercentChange: .50,
        dowJonesSodToEodPercentChange: .10,
        dowJonesEodToEodAbsoluteChange: 100.02,
        dowJonesEodToSodAbsoluteChange: 100.50,
        dowJonesSodToEodAbsoluteChange: 100.10,
        shanghaiTotal: 300.50,
        hongKongTotal: 1000,
        shanghaiEodToEodPercentChange: .02,
        shanghaiEodToSodPercentChange: .50,
        shanghaiSodToEodPercentChange: .10,
        shanghaiEodToEodAbsoluteChange: 100.02,
        shanghaiEodToSodAbsoluteChange: 100.50,
        shanghaiSodToEodAbsoluteChange: 100.10,
        hongKongEodToEodPercentChange: .02,
        hongKongEodToSodPercentChange: .50,
        hongKongSodToEodPercentChange: .10,
        hongKongEodToEodAbsoluteChange: 100.02,
        hongKongEodToSodAbsoluteChange: 100.50,
        hongKongSodToEodAbsoluteChange: 100.10,
      }, done);
  });

  test('POST /dates', (done) => {
    request(server)
      .post('/dates')
      .set('Accept', 'application/json')
      .send(JSON.stringify({
        date_id: 3,
        date: 'yesterday',
        sandp_total: 500.01,
        nasdaq_total: 300.50,
        dow_jones_total: 1000,
        sandp_eod_to_eod_percent_change: .02,
        sandp_eod_to_sod_percent_change: .50,
        sandp_sod_to_eod_percent_change: .10,
        sandp_eod_to_eod_absolute_change: 100.02,
        sandp_eod_to_sod_absolute_change: 100.50,
        sandp_sod_to_eod_absolute_change: 100.10,
        nasdaq_eod_to_eod_percent_change: .02,
        nasdaq_eod_to_sod_percent_change: .50,
        nasdaq_sod_to_eod_percent_change: .10,
        nasdaq_eod_to_eod_absolute_change: 100.02,
        nasdaq_eod_to_sod_absolute_change: 100.50,
        nasdaq_sod_to_eod_absolute_change: 100.10,
        dow_jones_eod_to_eod_percent_change: .02,
        dow_jones_eod_to_sod_percent_change: .50,
        dow_jones_sod_to_eod_percent_change: .10,
        dow_jones_eod_to_eod_absolute_change: 100.02,
        dow_jones_eod_to_sod_absolute_change: 100.50,
        dow_jones_sod_to_eod_absolute_change: 100.10,
        shanghai_total: 300.50,
        hong_kong_total: 1000,
        shanghai_eod_to_eod_percent_change: .02,
        shanghai_eod_to_sod_percent_change: .50,
        shanghai_sod_to_eod_percent_change: .10,
        shanghai_eod_to_eod_absolute_change: 100.02,
        shanghai_eod_to_sod_absolute_change: 100.50,
        shanghai_sod_to_eod_absolute_change: 100.10,
        hong_kong_eod_to_eod_percent_change: .02,
        hong_kong_eod_to_sod_percent_change: .50,
        hong_kong_sod_to_eod_percent_change: .10,
        hong_kong_eod_to_eod_absolute_change: 100.02,
        hong_kong_eod_to_sod_absolute_change: 100.50,
        hong_kong_sod_to_eod_absolute_change: 100.10,
      }))
    .expect('Content-Type', /json/)
    .expect(200, {
      dateId: 3,
      date: 'yesterday',
      sandpTotal: 500.01,
      nasdaqTotal: 300.50,
      dowJonesTotal: 1000,
      sandpEodToEodPercentChange: .02,
      sandpEodToSodPercentChange: .50,
      sandpSodToEodPercentChange: .10,
      sandpEodToEodAbsoluteChange: 100.02,
      sandpEodToSodAbsoluteChange: 100.50,
      sandpSodToEodAbsoluteChange: 100.10,
      nasdaqEodToEodPercentChange: .02,
      nasdaqEodToSodPercentChange: .50,
      nasdaqSodToEodPercentChange: .10,
      nasdaqEodToEodAbsoluteChange: 100.02,
      nasdaqEodToSodAbsoluteChange: 100.50,
      nasdaqSodToEodAbsoluteChange: 100.10,
      dowJonesEodToEodPercentChange: .02,
      dowJonesEodToSodPercentChange: .50,
      dowJonesSodToEodPercentChange: .10,
      dowJonesEodToEodAbsoluteChange: 100.02,
      dowJonesEodToSodAbsoluteChange: 100.50,
      dowJonesSodToEodAbsoluteChange: 100.10,
      shanghaiTotal: 300.50,
      hongKongTotal: 1000,
      shanghaiEodToEodPercentChange: .02,
      shanghaiEodToSodPercentChange: .50,
      shanghaiSodToEodPercentChange: .10,
      shanghaiEodToEodAbsoluteChange: 100.02,
      shanghaiEodToSodAbsoluteChange: 100.50,
      shanghaiSodToEodAbsoluteChange: 100.10,
      hongKongEodToEodPercentChange: .02,
      hongKongEodToSodPercentChange: .50,
      hongKongSodToEodPercentChange: .10,
      hongKongEodToEodAbsoluteChange: 100.02,
      hongKongEodToSodAbsoluteChange: 100.50,
      hongKongSodToEodAbsoluteChange: 100.10,
    }, done);
      /* eslint-enable max-len */
  });

  test('DELETE /dates/:id', (done) => {
    request(server)
      .del('/dates/1')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, [{
        dateId: 1,
        date: 'yesterday',
        sandpTotal: 500.01,
        nasdaqTotal: 300.50,
        dowJonesTotal: 1000,
        sandpEodToEodPercentChange: .02,
        sandpEodToSodPercentChange: .50,
        sandpSodToEodPercentChange: .10,
        sandpEodToEodAbsoluteChange: 100.02,
        sandpEodToSodAbsoluteChange: 100.50,
        sandpSodToEodAbsoluteChange: 100.10,
        nasdaqEodToEodPercentChange: .02,
        nasdaqEodToSodPercentChange: .50,
        nasdaqSodToEodPercentChange: .10,
        nasdaqEodToEodAbsoluteChange: 100.02,
        nasdaqEodToSodAbsoluteChange: 100.50,
        nasdaqSodToEodAbsoluteChange: 100.10,
        dowJonesEodToEodPercentChange: .02,
        dowJonesEodToSodPercentChange: .50,
        dowJonesSodToEodPercentChange: .10,
        dowJonesEodToEodAbsoluteChange: 100.02,
        dowJonesEodToSodAbsoluteChange: 100.50,
        dowJonesSodToEodAbsoluteChange: 100.10,
        shanghaiTotal: 300.50,
        hongKongTotal: 1000,
        shanghaiEodToEodPercentChange: .02,
        shanghaiEodToSodPercentChange: .50,
        shanghaiSodToEodPercentChange: .10,
        shanghaiEodToEodAbsoluteChange: 100.02,
        shanghaiEodToSodAbsoluteChange: 100.50,
        shanghaiSodToEodAbsoluteChange: 100.10,
        hongKongEodToEodPercentChange: .02,
        hongKongEodToSodPercentChange: .50,
        hongKongSodToEodPercentChange: .10,
        hongKongEodToEodAbsoluteChange: 100.02,
        hongKongEodToSodAbsoluteChange: 100.50,
        hongKongSodToEodAbsoluteChange: 100.10,
      }], done);
  });

  test('GET /dates/:id that doesn\'t exist', (done) => {
    request(server)
      .get('/dates/1000')
      .set('Accept', 'application/json')
      .expect('Content-Type', /plain/)
      .expect(404, 'Not Found', done);
  });


  test('POST /dates/:id', (done) => {
    request(server)
      .post('/dates/1')
      .set('Accept', 'application/json')
      .send({
        date_id: 1,
        date: 'today',
        sandp_total: 500.01,
        nasdaq_total: 300.50,
        dow_jones_total: 1000,
        sandp_eod_to_eod_percent_change: .02,
        sandp_eod_to_sod_percent_change: .50,
        sandp_sod_to_eod_percent_change: .10,
        sandp_eod_to_eod_absolute_change: 100.02,
        sandp_eod_to_sod_absolute_change: 100.50,
        sandp_sod_to_eod_absolute_change: 100.10,
        nasdaq_eod_to_eod_percent_change: .02,
        nasdaq_eod_to_sod_percent_change: .50,
        nasdaq_sod_to_eod_percent_change: .10,
        nasdaq_eod_to_eod_absolute_change: 100.02,
        nasdaq_eod_to_sod_absolute_change: 100.50,
        nasdaq_sod_to_eod_absolute_change: 100.10,
        dow_jones_eod_to_eod_percent_change: .02,
        dow_jones_eod_to_sod_percent_change: .50,
        dow_jones_sod_to_eod_percent_change: .10,
        dow_jones_eod_to_eod_absolute_change: 100.02,
        dow_jones_eod_to_sod_absolute_change: 100.50,
        dow_jones_sod_to_eod_absolute_change: 100.10,
        shanghai_total: 300.50,
        hong_kong_total: 1000,
        shanghai_eod_to_eod_percent_change: .02,
        shanghai_eod_to_sod_percent_change: .50,
        shanghai_sod_to_eod_percent_change: .10,
        shanghai_eod_to_eod_absolute_change: 100.02,
        shanghai_eod_to_sod_absolute_change: 100.50,
        shanghai_sod_to_eod_absolute_change: 100.10,
        hong_kong_eod_to_eod_percent_change: .02,
        hong_kong_eod_to_sod_percent_change: .50,
        hong_kong_sod_to_eod_percent_change: .10,
        hong_kong_eod_to_eod_absolute_change: 100.02,
        hong_kong_eod_to_sod_absolute_change: 100.50,
        hong_kong_sod_to_eod_absolute_change: 100.10,
      })
    .expect('Content-Type', /json/)
    .expect(200, {
        dateId: 1,
        date: 'today',
        sandpTotal: 500.01,
        nasdaqTotal: 300.50,
        dowJonesTotal: 1000,
        sandpEodToEodPercentChange: .02,
        sandpEodToSodPercentChange: .50,
        sandpSodToEodPercentChange: .10,
        sandpEodToEodAbsoluteChange: 100.02,
        sandpEodToSodAbsoluteChange: 100.50,
        sandpSodToEodAbsoluteChange: 100.10,
        nasdaqEodToEodPercentChange: .02,
        nasdaqEodToSodPercentChange: .50,
        nasdaqSodToEodPercentChange: .10,
        nasdaqEodToEodAbsoluteChange: 100.02,
        nasdaqEodToSodAbsoluteChange: 100.50,
        nasdaqSodToEodAbsoluteChange: 100.10,
        dowJonesEodToEodPercentChange: .02,
        dowJonesEodToSodPercentChange: .50,
        dowJonesSodToEodPercentChange: .10,
        dowJonesEodToEodAbsoluteChange: 100.02,
        dowJonesEodToSodAbsoluteChange: 100.50,
        dowJonesSodToEodAbsoluteChange: 100.10,
        shanghaiTotal: 300.50,
        hongKongTotal: 1000,
        shanghaiEodToEodPercentChange: .02,
        shanghaiEodToSodPercentChange: .50,
        shanghaiSodToEodPercentChange: .10,
        shanghaiEodToEodAbsoluteChange: 100.02,
        shanghaiEodToSodAbsoluteChange: 100.50,
        shanghaiSodToEodAbsoluteChange: 100.10,
        hongKongEodToEodPercentChange: .02,
        hongKongEodToSodPercentChange: .50,
        hongKongSodToEodPercentChange: .10,
        hongKongEodToEodAbsoluteChange: 100.02,
        hongKongEodToSodAbsoluteChange: 100.50,
        hongKongSodToEodAbsoluteChange: 100.10,
      }, done);
      /* eslint-enable max-len */
  });
}));
