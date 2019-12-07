// 'use strict';
//
// process.env.NODE_ENV = 'test';
//
// const assert = require('chai').assert;
// const { suite, test } = require('mocha');
// const knex = require('../knex');
// const { addDatabaseHooks } = require('./utils');
// suite('companies migrations', addDatabaseHooks(() => {
//   test('companies columns', (done) => {
//     knex('companies').columnInfo()
//     .then((actual) => {
//       const expected = {
//         company_id: {
//           type: 'integer',
//           maxLength: null,
//           nullable: false,
//           defaultValue: 'nextval(\'companies_company_id_seq\'::regclass)'
//         },
//
//         company_name: {
//           type: 'character varying',
//           maxLength: 255,
//           nullable: false,
//           defaultValue: '\'\'::character varying'
//         },
//
//         ticker: {
//           type: 'character varying',
//           maxLength: 255,
//           nullable: false,
//           defaultValue: '\'\'::character varying'
//         },
//
//         country: {
//           type: 'character varying',
//           maxLength: 255,
//           nullable: false,
//           defaultValue: '\'\'::character varying'
//         },
//
//         last_filing_date: {
//           type: 'integer',
//           maxLength: null,
//           nullable: false,
//           defaultValue: null
//         },
//
//         market_cap: {
//             type: 'integer',
//             maxLength: null,
//             nullable: false,
//             defaultValue: '0'
//           },
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
