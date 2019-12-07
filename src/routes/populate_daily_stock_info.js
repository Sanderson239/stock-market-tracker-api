'use strict';

// later take look at how companies with null company id are geting added

const fs = require('fs');
var request = require("request");
var zlib = require('zlib');
let companyData = require ('../../new-new-company-data.json');
let otherCompanyData = require ('../../new-company-data-copy.json');
let dates = require ('../../new-dates.json');
const bodyParser = require('body-parser');
const express = require('express');
const humps = require('humps');
const fetch = require('node-fetch');
// manually change these every time
let dailyStockInfoId = companyData.dailyStockInfoId;
let dateIndex = dates.length - 1;
// let dailyStockInfoId = companyData.dailyStockInfoId;

const DailyStockInfo = require('../controllers/daily_stock_info.js');

const router = express.Router();

const dailyStockInfo = new DailyStockInfo();

function constructUrl(date) {
  console.log(date);

  // return `https://eodhistoricaldata.com/api/eod/${ticker}.US?from=1999-06-18&to=2019-06-21&api_token=5d0a9197716548.97282992&period=d&fmt=json`;
  return `http://eodhistoricaldata.com/api/eod-bulk-last-day/US?api_token=5d0a9197716548.97282992&date=${date}&fmt=json`;

}

function calculatePercentage(first, last) {
  return ((last / first) - 1);
}

function calculateAbsolute(first, last) {
  return (last - first);
}
//directions
//if i know what the company id is i can just check for the last Day
// make new route to check if it exists with new daily_stock_info route get by company id looking for 5034 date
// maybe try and do small chunks to analyze most efficient waiting time


//maybe add functionality to make this usable any day?
router.get('/populateDailyStockInfo/', (req, res) => {
  // if (dailyStockInfoId < 899275) {
  // manually change index of this every time
  let thisDate = dates.pop();
  let url = constructUrl(thisDate.date);
  request(
    { method: 'GET',
    uri: url,
    gzip: true,
  }, function (error, response, body) {
    // if (!body) {
    //   console.log(url);
    // }
    let responseData = JSON.parse(body);
    let currentKeys = Object.keys(companyData);
    for(let i = 3; i < currentKeys.length - 1; i++) {
      let currentCompany = companyData[`${currentKeys[i]}`];
      if (currentCompany.mostRecentPosition >= responseData.length) {
        currentCompany.mostRecentPosition = responseData.length - 1;
      }


      if (responseData[currentCompany.mostRecentPosition].code == currentCompany.code) {
        if (responseData[currentCompany.mostRecentPosition].volume > 0) {
          let updateCompany = {
            daily_stock_info_id: dailyStockInfoId,
            company_id: currentCompany.companyId,
            open_price: currentCompany.open,
            closing_price: currentCompany.close,
            date_id: thisDate.dateId,
            last_filing_date: 1,
            eod_to_eod_percent_change: calculatePercentage(responseData[currentCompany.mostRecentPosition].close, currentCompany.close),
            eod_to_sod_percent_change: calculatePercentage(responseData[currentCompany.mostRecentPosition].close, currentCompany.open),
            sod_to_eod_percent_change: calculatePercentage(currentCompany.open, currentCompany.close),
            eod_to_eod_absolute_change: calculateAbsolute(responseData[currentCompany.mostRecentPosition].close, currentCompany.close),
            eod_to_sod_absolute_change: calculateAbsolute(responseData[currentCompany.mostRecentPosition].close, currentCompany.open),
            sod_to_eod_absolute_change: calculateAbsolute(currentCompany.open, currentCompany.close),
            volume: currentCompany.volume,
          }

          companyData[`${currentKeys[i]}`].open = responseData[currentCompany.mostRecentPosition].open;
          companyData[`${currentKeys[i]}`].close = responseData[currentCompany.mostRecentPosition].close;
          companyData[`${currentKeys[i]}`].volume = responseData[currentCompany.mostRecentPosition].volume;

          dailyStockInfoId++;



          // console.log('if #1.1', i, currentCompany.code, dailyStockInfoId);
          dailyStockInfo.addDailyStockInfo(updateCompany)
          .then(thisDailyStockInfo => {
            // res.setHeader('Content-Type', 'application/json');

            // return res.send(thisDailyStockInfo[0]);
          })
        }
        else {
          let updateCompany = {
            daily_stock_info_id: dailyStockInfoId,
            company_id: currentCompany.companyId,
            open_price: currentCompany.open,
            closing_price: currentCompany.close,
            date_id: thisDate.dateId,
            last_filing_date: 1,
            sod_to_eod_percent_change: calculatePercentage(currentCompany.open, currentCompany.close),
            sod_to_eod_absolute_change: calculateAbsolute(currentCompany.open, currentCompany.close),
          }

          dailyStockInfoId++;
          delete companyData[`${currentKeys[i]}`];


          // console.log('if #1.2', i, currentCompany.code, dailyStockInfoId);
          dailyStockInfo.addDailyStockInfo(updateCompany)
          .then(thisDailyStockInfo => {
            // res.setHeader('Content-Type', 'application/json');

            // return res.send(thisDailyStockInfo[0]);
          })
        }
      }

      else if (responseData[currentCompany.mostRecentPosition].code > currentCompany.code) {
        for (let j = currentCompany.mostRecentPosition; responseData[j].code >= currentCompany.code && j > 3; j--) {
          if (responseData[j].code == currentCompany.code) {
            if (responseData[j].volume > 0) {
              let updateCompany = {
                daily_stock_info_id: dailyStockInfoId,
                company_id: currentCompany.companyId,
                open_price: currentCompany.open,
                closing_price: currentCompany.close,
                date_id: thisDate.dateId,
                last_filing_date: 1,
                eod_to_eod_percent_change: calculatePercentage(responseData[j].close, currentCompany.close),
                eod_to_sod_percent_change: calculatePercentage(responseData[j].close, currentCompany.open),
                sod_to_eod_percent_change: calculatePercentage(currentCompany.open, currentCompany.close),
                eod_to_eod_absolute_change: calculateAbsolute(responseData[j].close, currentCompany.close),
                eod_to_sod_absolute_change: calculateAbsolute(responseData[j].close, currentCompany.open),
                sod_to_eod_absolute_change: calculateAbsolute(currentCompany.open, currentCompany.close),
                volume: currentCompany.volume,
              }

              companyData[`${currentKeys[i]}`].open = responseData[j].open;
              companyData[`${currentKeys[i]}`].close = responseData[j].close;
              companyData[`${currentKeys[i]}`].volume = responseData[j].volume;
              companyData[`${currentKeys[i]}`].mostRecentPosition = j;

              dailyStockInfoId++;



              // console.log('if #2.1', i, currentCompany.code, dailyStockInfoId);

              dailyStockInfo.addDailyStockInfo(updateCompany)
              .then(thisDailyStockInfo => {
                // res.setHeader('Content-Type', 'application/json');

                // return res.send(thisDailyStockInfo[0]);
              })
            }
            else {
              let updateCompany = {
                daily_stock_info_id: dailyStockInfoId,
                company_id: currentCompany.companyId,
                open_price: currentCompany.open,
                closing_price: currentCompany.close,
                date_id: thisDate.dateId,
                last_filing_date: 1,
                sod_to_eod_percent_change: calculatePercentage(currentCompany.open, currentCompany.close),
                sod_to_eod_absolute_change: calculateAbsolute(currentCompany.open, currentCompany.close),
              }

              dailyStockInfoId++;
              delete companyData[`${currentKeys[i]}`];

              // console.log('if #2.2', i, currentCompany.code, dailyStockInfoId);

              dailyStockInfo.addDailyStockInfo(updateCompany)
              .then(thisDailyStockInfo => {
                // res.setHeader('Content-Type', 'application/json');

                // return res.send(thisDailyStockInfo[0]);
              })
            }
          }
        }
      }

      else if (responseData[currentCompany.mostRecentPosition].code < currentCompany.code) {
        for (let j = currentCompany.mostRecentPosition; j < responseData.length && responseData[j].code <= currentCompany.code; j++) {
          if (responseData[j].code == currentCompany.code) {
            if (responseData[j].volume > 0) {
              let updateCompany = {
                daily_stock_info_id: dailyStockInfoId,
                company_id: currentCompany.companyId,
                open_price: currentCompany.open,
                closing_price: currentCompany.close,
                date_id: thisDate.dateId,
                last_filing_date: 1,
                eod_to_eod_percent_change: calculatePercentage(responseData[j].close, currentCompany.close),
                eod_to_sod_percent_change: calculatePercentage(responseData[j].close, currentCompany.open),
                sod_to_eod_percent_change: calculatePercentage(currentCompany.open, currentCompany.close),
                eod_to_eod_absolute_change: calculateAbsolute(responseData[j].close, currentCompany.close),
                eod_to_sod_absolute_change: calculateAbsolute(responseData[j].close, currentCompany.open),
                sod_to_eod_absolute_change: calculateAbsolute(currentCompany.open, currentCompany.close),
                volume: currentCompany.volume,
              }
              companyData[`${currentKeys[i]}`].open = responseData[j].open;
              companyData[`${currentKeys[i]}`].close = responseData[j].close;
              companyData[`${currentKeys[i]}`].volume = responseData[j].volume;
              companyData[`${currentKeys[i]}`].mostRecentPosition = j;

              dailyStockInfoId++;



              // console.log('if #3.1', i, currentCompany.code, dailyStockInfoId);
              dailyStockInfo.addDailyStockInfo(updateCompany)
              .then(thisDailyStockInfo => {
                // res.setHeader('Content-Type', 'application/json');

                // return res.send(thisDailyStockInfo[0]);
              })
            }
            else {
              let updateCompany = {
                daily_stock_info_id: dailyStockInfoId,
                company_id: currentCompany.companyId,
                open_price: currentCompany.open,
                closing_price: currentCompany.close,
                date_id: thisDate.dateId,
                last_filing_date: 1,
                sod_to_eod_percent_change: calculatePercentage(currentCompany.open, currentCompany.close),
                sod_to_eod_absolute_change: calculateAbsolute(currentCompany.open, currentCompany.close),
              }

              dailyStockInfoId++;
              delete companyData[`${currentKeys[i]}`];


              // console.log('if #3.2', i, currentCompany.code, dailyStockInfoId);

              dailyStockInfo.addDailyStockInfo(updateCompany)
              .then(thisDailyStockInfo => {
                // res.setHeader('Content-Type', 'application/json');

                // return res.send(thisDailyStockInfo[0]);
              })
            }
          }
        }
      }
    }
    // console.log('date id index', dates.indexOf(thisDate));
    // console.log(dates[dates.length - 1]);
    // dates.pop();
    dateIndex --;
    companyData.date = thisDate.date;
    companyData.dateId = thisDate.dateId;
    companyData.dailyStockInfoId = dailyStockInfoId;
    otherCompanyData.dailyStockInfoId = dailyStockInfoId;
    // console.log(dates[dates.length - 1]);
    fs.writeFile('new-dates.json', JSON.stringify(dates), function (err) {
  if (err) throw err;
  // console.log('Replaced!');
});
    fs.writeFile('new-new-company-data.json', JSON.stringify(companyData), function (err) {
  if (err) throw err;
  // console.log(err);
});
    fs.writeFile('../../new-company-data-copy.json', JSON.stringify(otherCompanyData), function (err) {
  if (err) throw err;
  // console.log('Replaced!');
});
    console.log('dailyStockInfoId', dailyStockInfoId);
    console.log('done');
    res.sendStatus(200);

  }
)
// }
});

module.exports = router;
