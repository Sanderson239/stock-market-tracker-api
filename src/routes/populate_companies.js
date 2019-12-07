'use strict';
const fs = require('fs');
var request = require("request");
var zlib = require('zlib');
// let companyData = require ('../../new-new-company-data.json')
let oldCompanyData = require ('../../old-company-data.json')

const bodyParser = require('body-parser');
const express = require('express');
const humps = require('humps');
const fetch = require('node-fetch');
let newDates = [];

const url = 'https://eodhistoricaldata.com/api/eod/aapl.US?from=2017-06-18&to=2017-06-23&api_token=5d0a9197716548.97282992&period=d&fmt=json'

const Date = require('../controllers/dates.js');

const Company = require('../controllers/companies.js');

const router = express.Router();

const companies = new Company();
const dates = new Date();


function fetchCompanyData() {

//   request(
//   { method: 'GET'
//   , uri: url
//   , gzip: true,
//   }
// , function (error, response, body) {
//     // body is the decompressed response body
//     console.log('server encoded the data as: ' + (response.headers['content-encoding'] || 'identity'))
//     console.log('the decoded data is: ' + body);
//     return body
//   }
// )
 //  return fetch(url, {method : "GET", api_token: '5d0a9197716548.97282992', headers: {'cache-control': 'no-cache', Connection: 'keep-alive',
 //  'accept-encoding': 'gzip, deflate',}})
 //  .then(response => {
 //    console.log(response);
 //    // console.log(JSON.stringify(response));
 //      return response.json()
 //  })
 //  .then(data => {
 //    return data
 // })
}

// router.get('/populateCompanies', (req, res) => {
//   let info = fetchCompanyData();
//   // console.log(info.body);
// })


// router.get('/populateCompanies', (req, res) => {
//   for (let i = 4; i < companyData.length; i++) {
//     console.log(i);
//   //   let companyToAdd = {
//   //     company_name: companyData[i].name,
//   //     ticker: companyData[i].code,
//   //     last_filing_date: 1,
//   //     market_cap: companyData[i].MarketCapitalization
//   //   }
//   //
//   //   if(companyToAdd.company_name === null)
//   //     companyToAdd.company_name = '';
//   //
//   //   if(companyToAdd.ticker === null)
//   //     companyToAdd.ticker = '';
//   //
//   //   if(companyToAdd.market_cap === null)
//   //     companyToAdd.market_cap = 0;
//   //
//   //   companies.addCompany(companyToAdd)
//   //   .then(company => {
//   //     // res.setHeader('Content-Type', 'application/json')
//   //     // return res.send(company[0]);
//   //   })
//   //   .catch(err => {
//   //     res.sendStatus(500);
//   //   });
//   }
//   console.log('done');
// })

// router.get('/populateCompanies', (req, res) => {
// // let test = require ('../../test.json');
// console.log('first', companyData.A);
//
// companies.getCompany()
// .then(result => {
//   let keys = Object.keys(companyData);
//   for (let j = 0; j < result.length; j++) {
//     if (companyData[`${result[j].ticker}`] != undefined) {
//       companyData[`${result[j].ticker}`].companyId = result[j].companyId;
//       // console.log('company id', companyData[`${result[j].ticker}`].companyId);
//       // console.log('j',companyData[`${result[j].ticker}`].companyId, companyData[`${result[j].ticker}`].code);
//     }
//
//   }
//   // console.log(companyData.A);
//
//   test.push(test.length + 1)
//   companyData.A.companyId = 4;
//   fs.writeFile('new-company-data.json', JSON.stringify(companyData), function(err) {
//       if(err) {
//         console.log('this');
//           return console.log(err);
//         }
//       });
//       console.log('final', companyData.A);
//
//   // companyData = require ('../../new-company-data.json');
//   // console.log('final data', companyData.A);
//
// })
// })



// router.get('/populateCompanies', (req, res) => {
// // let test = require ('../../test.json');
//
//
// dates.getDate()
// .then(result => {
//   for (let j = 0; j < result.length; j++) {
//     newDates[j] = {date: result[j].date, dateId: result[j].dateId};
//
//     // newDates[j] = {date: result[j].date, dateId: result[j].dateId}
//     // console.log(newDates[j]);
//     // console.log(result[j].date, result[j].dateId);
//
//   }
//   console.log('done');
//   // console.log(companyData.A);
//
//   // test.push(test.length + 1)
//   // companyData.A.companyId = 4;
//   // fs.writeFile('dates.json', JSON.stringify(newDates), function(err) {
//   //     if(err) {
//   //       console.log('this');
//   //         return console.log(err);
//   //       }
//   //     });
//   //     console.log('done');
//
//   // companyData = require ('../../new-company-data.json');
//   // console.log('final data', companyData.A);
//
// })
// })

router.get('/populateCompanies', (req, res) => {
//   let count = 1;
// // let test = require ('../../test.json');
//   // companies.getCompany()
//   // .then(companies => {
//     for (let i = 0; i < oldCompanyData.length; i++) {
//       if (!companyData[`${oldCompanyData[i].ticker}`]) {
//         // let companyToAdd = {
//         //   company_name:
//         // }
//         // companies.addCompany(companyToAdd)
//         // .then(result => {
//           console.log(count);
//           count++
//         // })
//
//       }
//     }
//     console.log(Object.keys(companyData).length);


  // })


})







module.exports = router;
