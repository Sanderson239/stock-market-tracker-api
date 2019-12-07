// 'use strict';
//
// process.env.NODE_ENV = 'test';
//
// const assert = require('chai').assert;
// const { suite, test } = require('mocha');
// const knex = require('../knex');
// const { addDatabaseHooks } = require('./utils');
// suite('dates migrations', addDatabaseHooks(() => {
//   test('dates columns', (done) => {
//     knex('dates').columnInfo()
//     .then((actual) => {
//       const expected = {
//         date_id: {
//           type: 'integer',
//           maxLength: null,
//           nullable: false,
//           defaultValue: 'nextval(\'dates_date_id_seq\'::regclass)'
//         },
//
//         date: {
//           type: 'character varying',
//           maxLength: 255,
//           nullable: false,
//           defaultValue: '\'\'::character varying'
//         },
//
//         sandp_total: {
//             type: 'float',
//             maxLength: null,
//             nullable: false,
//             defaultValue: '0'
//         },
//
//         nasdaq_total: {
//             type: 'float',
//             maxLength: null,
//             nullable: false,
//             defaultValue: '0'
//         },
//
//         dow_jones_total: {
//             type: 'float',
//             maxLength: null,
//             nullable: false,
//             defaultValue: '0'
//         },
//
//         sandp_eod_to_eod_percent_change: {
//             type: 'float',
//             maxLength: null,
//             nullable: false,
//             defaultValue: '0'
//         },
//
//         sandp_eod_to_sod_percent_change: {
//             type: 'float',
//             maxLength: null,
//             nullable: false,
//             defaultValue: '0'
//         },
//
//         sandp_sod_to_eod_percent_change: {
//             type: 'float',
//             maxLength: null,
//             nullable: false,
//             defaultValue: '0'
//         },
//
//         sandp_eod_to_eod_absolute_change: {
//             type: 'float',
//             maxLength: null,
//             nullable: false,
//             defaultValue: '0'
//         },
//
//         sandp_eod_to_sod_absolute_change: {
//             type: 'float',
//             maxLength: null,
//             nullable: false,
//             defaultValue: '0'
//         },
//
//         sandp_sod_to_eod_absolute_change: {
//             type: 'float',
//             maxLength: null,
//             nullable: false,
//             defaultValue: '0'
//         },
//
//         nasdaq_eod_to_eod_percent_change: {
//             type: 'float',
//             maxLength: null,
//             nullable: false,
//             defaultValue: '0'
//         },
//
//         nasdaq_eod_to_sod_percent_change: {
//             type: 'float',
//             maxLength: null,
//             nullable: false,
//             defaultValue: '0'
//         },
//
//         nasdaq_sod_to_eod_percent_change: {
//             type: 'float',
//             maxLength: null,
//             nullable: false,
//             defaultValue: '0'
//         },
//
//         nasdaq_eod_to_eod_absolute_change: {
//             type: 'float',
//             maxLength: null,
//             nullable: false,
//             defaultValue: '0'
//         },
//
//         nasdaq_eod_to_sod_absolute_change: {
//             type: 'float',
//             maxLength: null,
//             nullable: false,
//             defaultValue: '0'
//         },
//
//         nasdaq_sod_to_eod_absolute_change: {
//             type: 'float',
//             maxLength: null,
//             nullable: false,
//             defaultValue: '0'
//         },
//
//         dow_jones_eod_to_eod_percent_change: {
//             type: 'float',
//             maxLength: null,
//             nullable: false,
//             defaultValue: '0'
//         },
//
//         dow_jones_eod_to_sod_percent_change: {
//             type: 'float',
//             maxLength: null,
//             nullable: false,
//             defaultValue: '0'
//         },
//
//         dow_jones_sod_to_eod_percent_change: {
//             type: 'float',
//             maxLength: null,
//             nullable: false,
//             defaultValue: '0'
//         },
//
//         dow_jones_eod_to_eod_absolute_change: {
//             type: 'float',
//             maxLength: null,
//             nullable: false,
//             defaultValue: '0'
//         },
//
//         dow_jones_eod_to_sod_absolute_change: {
//             type: 'float',
//             maxLength: null,
//             nullable: false,
//             defaultValue: '0'
//         },
//
//         dow_jones_sod_to_eod_absolute_change: {
//             type: 'float',
//             maxLength: null,
//             nullable: false,
//             defaultValue: '0'
//         },
//
//         shanhai_total: {
//             type: 'float',
//             maxLength: null,
//             nullable: false,
//             defaultValue: '0'
//         },
//
//         hong_kong_total: {
//             type: 'float',
//             maxLength: null,
//             nullable: false,
//             defaultValue: '0'
//         },
//
//         shanghai_eod_to_eod_percent_change: {
//             type: 'float',
//             maxLength: null,
//             nullable: false,
//             defaultValue: '0'
//         },
//
//         shanghai_eod_to_sod_percent_change: {
//             type: 'float',
//             maxLength: null,
//             nullable: false,
//             defaultValue: '0'
//         },
//
//         shanghai_sod_to_eod_percent_change: {
//             type: 'float',
//             maxLength: null,
//             nullable: false,
//             defaultValue: '0'
//         },
//
//         shanghai_eod_to_eod_absolute_change: {
//             type: 'float',
//             maxLength: null,
//             nullable: false,
//             defaultValue: '0'
//         },
//
//         shanghai_eod_to_sod_absolute_change: {
//             type: 'float',
//             maxLength: null,
//             nullable: false,
//             defaultValue: '0'
//         },
//
//         shanghai_sod_to_eod_absolute_change: {
//             type: 'float',
//             maxLength: null,
//             nullable: false,
//             defaultValue: '0'
//         },
//
//         hong_kong_eod_to_eod_percent_change: {
//             type: 'float',
//             maxLength: null,
//             nullable: false,
//             defaultValue: '0'
//         },
//
//         hong_kong_eod_to_sod_percent_change: {
//             type: 'float',
//             maxLength: null,
//             nullable: false,
//             defaultValue: '0'
//         },
//
//         hong_kong_sod_to_eod_percent_change: {
//             type: 'float',
//             maxLength: null,
//             nullable: false,
//             defaultValue: '0'
//         },
//
//         hong_kong_eod_to_eod_absolute_change: {
//             type: 'float',
//             maxLength: null,
//             nullable: false,
//             defaultValue: '0'
//         },
//
//         hong_kong_eod_to_sod_absolute_change: {
//             type: 'float',
//             maxLength: null,
//             nullable: false,
//             defaultValue: '0'
//         },
//
//         hong_kong_sod_to_eod_absolute_change: {
//             type: 'float',
//             maxLength: null,
//             nullable: false,
//             defaultValue: '0'
//         },
//       };
//
//       for (const column in expected) {
//         assert.deepEqual(
//           actual[column],
//           expected[column],
//           `Column ${column} is not the same` + JSON.stringify(actual[column]) + 'fdasfdsf' + JSON.stringify(expected[column]) + 'fdsfdsafds'
//         );
//       };
//
//
//       done()
//       // .catch((err) => {
//       //   done(err);
//       // });
//     });
//   });
// }));
