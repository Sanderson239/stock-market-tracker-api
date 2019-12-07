// 'use strict';
//
// const fs = require('fs');
// var request = require("request");
// var zlib = require('zlib');
// const companyData = require ('../../new-company-data.json');
// const otherCompanyData = require ('../../new-company-data-copy.json');
// const dates = require ('../../dates.json');
// const bodyParser = require('body-parser');
// const express = require('express');
// const humps = require('humps');
// const fetch = require('node-fetch');
// let dailyStockInfoId = companyData.dailyStockInfo;
//
// const DailyStockInfo = require('../controllers/daily_stock_info.js');
//
// const router = express.Router();
//
// const dailyStockInfo = new DailyStockInfo();
//
// function constructUrl(date) {
//
//   // return `https://eodhistoricaldata.com/api/eod/${ticker}.US?from=1999-06-18&to=2019-06-21&api_token=5d0a9197716548.97282992&period=d&fmt=json`;
//   return `http://eodhistoricaldata.com/api/eod-bulk-last-day/US?api_token=5d0a9197716548.97282992&date=${date}&fmt=json`;
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
//   let thisDate = dates[dates.length - 1];
//   let url = constructUrl(thisDate.date);
//
//   request(
//     { method: 'GET',
//     uri: url,
//     gzip: true,
//   }, function (error, response, body) {
//     // if (!body) {
//     //   console.log(url);
//     // }
//     let responseData = JSON.parse(body);
//     let currentKeys = Object.keys(companyData);
//     for(let i = 3; i < currentKeys;) {
//       let currentCompany = companyData[`${currentKeys[i]}`];
//       if (responseData[currentCompany.mostRecentPosition].code == currentCompany.code) {
//         if (responseData[currentCompany.mostRecentPosition].volume > 0) {
//           let updateCompany = {
//             daily_stock_info_id: dailyStockInfoId,
//             company_id: currentCompany.companyId,
//             open_price: currentCompany.open,
//             closing_price: currentCompany.close,
//             date_id: companyData.dateId,
//             last_filing_date: 1,
//             eod_to_eod_percent_change: calculatePercentage(responseData[currentCompany.mostRecentPosition].close, currentCompany.close),
//             eod_to_sod_percent_change: calculatePercentage(responseData[currentCompany.mostRecentPosition].close, currentCompany.open),
//             sod_to_eod_percent_change: calculatePercentage(currentCompany.open, currentCompany.close),
//             eod_to_eod_absolute_change: calculateAbsolute(responseData[currentCompany.mostRecentPosition].close, currentCompany.close),
//             eod_to_sod_absolute_change: calculateAbsolute(responseData[currentCompany.mostRecentPosition].close, currentCompany.open),
//             sod_to_eod_absolute_change: calculateAbsolute(currentCompany.open, currentCompany.close),
//             volume: currentCompany.volume,
//           }
//           companyData[`${currentKeys[i]}`].open = responseData[currentCompany.mostRecentPosition].open;
//           companyData[`${currentKeys[i]}`].close = responseData[currentCompany.mostRecentPosition].close;
//           companyData[`${currentKeys[i]}`].volume = responseData[currentCompany.mostRecentPosition].volume;
//
//           dailyStockInfoId++;
//           i++;
//
//           dailyStockInfo.updateDailyStockInfo(updateCompany)
//           .then(thisDailyStockInfo) => {
//             // res.setHeader('Content-Type', 'application/json');
//             // return res.send(thisDailyStockInfo[0]);
//           }
//         }
//         else {
//           let updateCompany = {
//             daily_stock_info_id: dailyStockInfoId,
//             company_id: currentCompany.companyId,
//             open_price: currentCompany.open,
//             closing_price: currentCompany.close,
//             date_id: companyData.dateId,
//             last_filing_date: 1,
//             sod_to_eod_percent_change: calculatePercentage(currentCompany.open, currentCompany.close),
//             sod_to_eod_absolute_change: calculateAbsolute(currentCompany.open, currentCompany.close),
//           }
//
//           dailyStockInfoId++;
//           i++;
//           delete companyData[`${currentKeys[i]}`];
//
//           dailyStockInfo.updateDailyStockInfo(updateCompany)
//           .then(thisDailyStockInfo) => {
//             // res.setHeader('Content-Type', 'application/json');
//
//             // return res.send(thisDailyStockInfo[0]);
//
//           }
//
//         }
//       }
//
//       else if (responseData[currentCompany.mostRecentPosition].code > currentCompany.code) {
//         for (let j = currentCompany.mostRecentPosition; responseData[j].code >= currentCompany.code || j < 4; j--) {
//           if (responseData[j].code == currentCompany.code) {
//             if (responseData[j].volume > 0) {
//               let updateCompany = {
//                 daily_stock_info_id: dailyStockInfoId,
//                 company_id: currentCompany.companyId,
//                 open_price: currentCompany.open,
//                 closing_price: currentCompany.close,
//                 date_id: companyData.dateId,
//                 last_filing_date: 1,
//                 eod_to_eod_percent_change: calculatePercentage(responseData[j].close, currentCompany.close),
//                 eod_to_sod_percent_change: calculatePercentage(responseData[j].close, currentCompany.open),
//                 sod_to_eod_percent_change: calculatePercentage(currentCompany.open, currentCompany.close),
//                 eod_to_eod_absolute_change: calculateAbsolute(responseData[j].close, currentCompany.close),
//                 eod_to_sod_absolute_change: calculateAbsolute(responseData[j].close, currentCompany.open),
//                 sod_to_eod_absolute_change: calculateAbsolute(currentCompany.open, currentCompany.close),
//                 volume: currentCompany.volume,
//               }
//
//               companyData[`${currentKeys[i]}`].open = responseData[j].open;
//               companyData[`${currentKeys[i]}`].close = responseData[j].close;
//               companyData[`${currentKeys[i]}`].volume = responseData[j].volume;
//               companyData[`${currentKeys[i]}`].mostRecentPosition = j;
//
//               dailyStockInfoId++;
//               i++;
//
//               dailyStockInfo.updateDailyStockInfo(updateCompany)
//               .then(thisDailyStockInfo) => {
//                 // res.setHeader('Content-Type', 'application/json');
//
//                 // return res.send(thisDailyStockInfo[0]);
//               }
//             }
//             else {
//               let updateCompany = {
//                 daily_stock_info_id: dailyStockInfoId,
//                 company_id: currentCompany.companyId,
//                 open_price: currentCompany.open,
//                 closing_price: currentCompany.close,
//                 date_id: companyData.dateId,
//                 last_filing_date: 1,
//                 sod_to_eod_percent_change: calculatePercentage(currentCompany.open, currentCompany.close),
//                 sod_to_eod_absolute_change: calculateAbsolute(currentCompany.open, currentCompany.close),
//               }
//
//               dailyStockInfoId++;
//               i++;
//               delete companyData[`${currentKeys[i]}`];
//
//               dailyStockInfo.updateDailyStockInfo(updateCompany)
//               .then(thisDailyStockInfo) => {
//                 // res.setHeader('Content-Type', 'application/json');
//
//                 // return res.send(thisDailyStockInfo[0]);
//               }
//             }
//           }
//         }
//       }
//
//       else if (responseData[currentCompany.mostRecentPosition].code < currentCompany.code) {
//         for (let j = currentCompany.mostRecentPosition; responseData[j].code <= currentCompany.code; j++) {
//           if (responseData[j].code == currentCompany.code) {
//             if (responseData[j].volume > 0) {
//               let updateCompany = {
//                 company_id: currentCompany.companyId,
//                 open_price: currentCompany.open,
//                 closing_price: currentCompany.close,
//                 date_id: companyData.dateId,
//                 last_filing_date: 1,
//                 eod_to_eod_percent_change: calculatePercentage(responseData[j].close, currentCompany.close),
//                 eod_to_sod_percent_change: calculatePercentage(responseData[j].close, currentCompany.open),
//                 sod_to_eod_percent_change: calculatePercentage(currentCompany.open, currentCompany.close),
//                 eod_to_eod_absolute_change: calculateAbsolute(responseData[j].close, currentCompany.close),
//                 eod_to_sod_absolute_change: calculateAbsolute(responseData[j].close, currentCompany.open),
//                 sod_to_eod_absolute_change: calculateAbsolute(currentCompany.open, currentCompany.close),
//                 volume: currentCompany.volume,
//               }
//               companyData[`${currentKeys[i]}`].open = responseData[j].open;
//               companyData[`${currentKeys[i]}`].close = responseData[j].close;
//               companyData[`${currentKeys[i]}`].volume = responseData[j].volume;
//               companyData[`${currentKeys[i]}`].mostRecentPosition = j;
//
//               dailyStockInfoId++;
//               i++;
//
//               dailyStockInfo.updateDailyStockInfo(updateCompany)
//               .then(thisDailyStockInfo) => {
//                 // res.setHeader('Content-Type', 'application/json');
//
//                 // return res.send(thisDailyStockInfo[0]);
//               }
//             }
//               else {
//                 let updateCompany = {
//                   company_id: currentCompany.companyId,
//                   open_price: currentCompany.open,
//                   closing_price: currentCompany.close,
//                   date_id: companyData.dateId,
//                   last_filing_date: 1,
//                   sod_to_eod_percent_change: calculatePercentage(currentCompany.open, currentCompany.close),
//                   sod_to_eod_absolute_change: calculateAbsolute(currentCompany.open, currentCompany.close),
//                 }
//
//                 dailyStockInfoId++;
//                 i++;
//                 delete companyData[`${currentKeys[i]}`];
//
//                 dailyStockInfo.updateDailyStockInfo(updateCompany)
//                 .then(thisDailyStockInfo) => {
//                   // res.setHeader('Content-Type', 'application/json');
//
//                   // return res.send(thisDailyStockInfo[0]);
//                 }
//               }
//             }
//           }
//         }
//       }
//       dates.pop();
//       companyData.date = dates[dates.length - 1].date;
//       companyData.dateId = dates[dates.length - 1].dateId;
//       companyData.dailyStockInfoId = dailyStockInfoId;
//       otherCompanyData.dailyStockInfo = dailyStockInfoId;
//       fs.writeFileSync('../../dates.json', JSON.stringify(dates));
//       fs.writeFileSync('../../new-company-data.json', JSON.stringify(companyData));
//       fs.writeFileSync('../../new-company-data-copy.json', JSON.stringify(otherCompanyData));
//
//     }
//   )
// }
//
// module.exports = router;
