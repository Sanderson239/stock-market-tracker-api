// 'use strict';
//
// process.env.NODE_ENV = 'test';
//
// const assert = require('chai').assert;
// const { suite, test } = require('mocha');
// const knex = require('../knex');
// const { addDatabaseHooks } = require('./utils');
// suite('daily_stock_info migrations', addDatabaseHooks(() => {
//   test('daily_stock_info columns', (done) => {
//     knex('daily_stock_info').columnInfo()
//     .then((actual) => {
//       const expected = {
//         daily_stock_info_id: {
//           type: 'integer',
//           maxLength: null,
//           nullable: false,
//           defaultValue: 'nextval(\'daily_stock_info_id_seq\'::regclass)'
//         },
//
//         company_id: {
//           type: 'integer',
//           maxLength: null,
//           nullable: false,
//           defaultValue: null
//         },
//
//         open_price: {
//             type: 'float',
//             maxLength: null,
//             nullable: false,
//             defaultValue: '0'
//         },
//
//         closing_price: {
//             type: 'float',
//             maxLength: null,
//             nullable: false,
//             defaultValue: '0'
//         },
//
//         date_id: {
//           type: 'integer',
//           maxLength: null,
//           nullable: false,
//           defaultValue: null
//         },
//
//
//         last_filing_date: {
//           type: 'integer',
//           maxLength: null,
//           nullable: false,
//           defaultValue: null
//         },
//
//         ask_price: {
//             type: 'float',
//             maxLength: null,
//             nullable: false,
//             defaultValue: '0'
//         },
//
//         bid_price: {
//             type: 'float',
//             maxLength: null,
//             nullable: false,
//             defaultValue: '0'
//         },
//
//         last_price: {
//             type: 'float',
//             maxLength: null,
//             nullable: false,
//             defaultValue: '0'
//         },
//
//         eod_to_eod_percent_change: {
//             type: 'float',
//             maxLength: null,
//             nullable: false,
//             defaultValue: '0'
//         },
//
//         eod_to_sod_percent_change: {
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
//         eod_to_eod_absolute_change: {
//             type: 'float',
//             maxLength: null,
//             nullable: false,
//             defaultValue: '0'
//         },
//
//         eod_to_sod_absolute_change: {
//             type: 'float',
//             maxLength: null,
//             nullable: false,
//             defaultValue: '0'
//         },
//
//         sod_to_eod_absolute_change: {
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
//           `Column ${column} is not the same`
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
