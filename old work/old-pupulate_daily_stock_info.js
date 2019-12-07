// 'use strict';
//
// var request = require("request");
// var zlib = require('zlib');
// const companyData = require ('../../company-data.json')
// const bodyParser = require('body-parser');
// const express = require('express');
// const humps = require('humps');
// const fetch = require('node-fetch');
//
// const DailyStockInfo = require('../controllers/daily_stock_info.js');
//
// const router = express.Router();
//
// const dailyStockInfo = new DailyStockInfo();
//
// function formatDate(date) {
//   var d = new Date(date),
//   month = '' + (d.getMonth() + 1),
//   day = '' + d.getDate(),
//   year = d.getFullYear();
//
//   if (month.length < 2) month = '0' + month;
//   if (day.length < 2) day = '0' + day;
//
//   return [year, month, day].join('-');
// }
//
// function fetchCompanyData(url) {
//   request(
//     { method: 'GET',
//     uri: url,
//     gzip: true,
//   }, function (error, response, body) {
//     // body is the decompressed response body
//     console.log('server encoded the data as: ' + (response.headers['content-encoding'] || 'identity'))
//     console.log('the decoded data is: ' + body)
//     let currentData = JSON.parse(body);
//     console.log('parsed', currentData);
//     console.log('body data', currentData[0].date);
//   }
// )}
//
// function constructUrl(ticker) {
//   // return `https://eodhistoricaldata.com/api/eod/${ticker}.US?from=1999-06-18&to=2019-06-21&api_token=5d0a9197716548.97282992&period=d&fmt=json`;
//   return `https://eodhistoricaldata.com/api/eod/${ticker}.US?from=1999-06-18&to=2019-06-21&api_token=5d0a9197716548.97282992&period=d&fmt=json`;
//
// }
//
// function calculatePercentage(first, last) {
//   return ((last / first) - 1);
// }
//
// function calculateAbsolute(first, last) {
//   return (last - first);
// }
// //directions
// //if i know what the company id is i can just check for the last Day
// // make new route to check if it exists with new daily_stock_info route get by company id looking for 5034 date
// // maybe try and do small chunks to analyze most efficient waiting time
//
//
// //maybe add functionality to make this usable any day?
// router.get('/populateDailyStockInfo', (req, res) => {
//   let count = 0;
//   let otherCount = 1;
//   for (let i = 7; i < 8; i++) {
//     let currentCompany = companyData[i];
//     let url = constructUrl(currentCompany.code);
//     if (!companyData[i].code) {
//       console.log(i);
//     }
//
//     request(
//       { method: 'GET',
//       uri: url,
//       gzip: true,
//     }, function (error, response, body) {
//       if (!body) {
//         console.log(url);
//       }
//       let currentData = JSON.parse(body);
//       for(let j = 1; j <= currentData.length; j++) {
//       // for(let j = 1; j < 2; j++) {
//
//         // console.log(currentData[j]);
//         let today = new Date('2019-06-21');
//         let lastDay = new Date(currentData[currentData.length - 1].date);
//         // console.log('today', today);
//         // console.log('company last Day', lastDay);
//
//         if (lastDay < today && j == currentData.length) {
//           lastDay.setDate(lastDay.getDate() + 2);
//           while (lastDay <= today) {
//             let dailyStockInfoToAdd = {
//               open_price: -1,
//               closing_price: -1,
//               last_filing_date: 1,
//               sod_to_eod_percent_change: 0,
//               sod_to_eod_absolute_change: 0,
//               eod_to_eod_percent_change: 0,
//               eod_to_sod_percent_change: 0,
//               sod_to_eod_percent_change: 0,
//               eod_to_eod_absolute_change: 0,
//               eod_to_sod_absolute_change: 0,
//               sod_to_eod_absolute_change: 0,
//               volume: 0,
//             };
//             let dateString = formatDate(lastDay);
//             // console.log('extra', dateString);
//             dailyStockInfo.addDailyStockInfo(dailyStockInfoToAdd, companyData[i].code, dateString)
//             .then(dailyStockInfo => {
//               // res.setHeader('Content-Type', 'application/json')
//               // return res.send(company[0]);
//             })
//             .catch(err => {
//               // res.sendStatus(500);
//             });
//             lastDay.setDate(lastDay.getDate() + 1);
//           }
//         }
//
//         else if (j < currentData.length){
//
//           let dailyStockInfoToAdd = {
//             open_price: currentData[j].open,
//             closing_price: currentData[j].close,
//             last_filing_date: 1,
//             sod_to_eod_percent_change: calculatePercentage(currentData[j].open, currentData[j].close),
//             sod_to_eod_absolute_change: calculateAbsolute(currentData[j].open, currentData[j].close),
//             volume: currentData[j].volume,
//           }
//           if (currentData[j-1].close) {
//             dailyStockInfoToAdd.eod_to_eod_absolute_change = calculateAbsolute(currentData[j - 1].close, currentData[j].close);
//             dailyStockInfoToAdd.eod_to_sod_absolute_change = calculateAbsolute(currentData[j - 1].close, currentData[j].open);
//             dailyStockInfoToAdd.eod_to_eod_percent_change = calculatePercentage(currentData[j - 1].close, currentData[j].close);
//             dailyStockInfoToAdd.eod_to_sod_percent_change = calculatePercentage(currentData[j - 1].close, currentData[j].open);
//           }
//
//           //change this to Object.keys() to make more efficient
//           if(dailyStockInfoToAdd.open_price === null || dailyStockInfoToAdd.open_price == 0) {
//             dailyStockInfoToAdd.open_price = -1;
//             dailyStockInfoToAdd.eod_to_sod_percent_change = 0;
//             dailyStockInfoToAdd.sod_to_eod_percent_change = 0;
//             dailyStockInfoToAdd.eod_to_sod_absolute_change = 0;
//             dailyStockInfoToAdd.sod_to_eod_absolute_change = 0;
//           }
//
//           if(dailyStockInfoToAdd.closing_price === null || dailyStockInfoToAdd.closing_price == 0) {
//             dailyStockInfoToAdd.closing_price = -1;
//             dailyStockInfoToAdd.eod_to_sod_percent_change = 0;
//             dailyStockInfoToAdd.sod_to_eod_percent_change = 0;
//             dailyStockInfoToAdd.eod_to_sod_absolute_change = 0;
//             dailyStockInfoToAdd.sod_to_eod_absolute_change = 0;
//           }
//
//           if(dailyStockInfoToAdd.volume === null) {
//             dailyStockInfoToAdd.volume = 0;
//           }
//
//           console.log(currentData[j].date);
//           // console.log(count, i);
//           // count++;
//           count += currentData.length;
//           // console.log(currentData.length);
//           // console.log(otherCount, count, i, currentData.length);
//           otherCount++;
//
//           // console.log(count);
//
//           dailyStockInfo.addDailyStockInfo(dailyStockInfoToAdd, companyData[i].code, currentData[j].date)
//           .then(dailyStockInfo => {
//             // res.setHeader('Content-Type', 'application/json')
//             // return res.send(dailyStockInfo[0]);
//             res.sendStatus(200);
//             return
//           })
//           .catch(err => {
//             // res.sendStatus(500);
//           });
//
//         }
//       }
//     }
//   )
// }
// })
//
//
// module.exports = router;
