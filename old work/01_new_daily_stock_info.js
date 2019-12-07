'use strict';

const fs = require('fs');
var request = require("request");
var zlib = require('zlib');
const companyData = require ('../../temp-new-new-company-data-copy.json');
const otherCompanyData = require ('../../new-company-data.json');
// const dates = require ('../../dates-copy.json');
const dates = [{"date":"2019-07-26","dateId":5055,"sandpEod":2995.11,"nasdaqEod":8207.24,"dowJonesEod":27223}]

const bodyParser = require('body-parser');
const express = require('express');
const humps = require('humps');
const fetch = require('node-fetch');
// let dailyStockInfoId = companyData.dailyStockInfoId
let dailyStockInfoId = 5980959;

// things to do
// add id to keep track of stock picks

const Date = require('../controllers/dates.js');
const DailyStockInfo = require('../controllers/daily_stock_info.js');

const router = express.Router();

const datesClass = new Date();
const dailyStockInfo = new DailyStockInfo();

function constructUrl() {

  return `http://eodhistoricaldata.com/api/eod-bulk-last-day/US?api_token=5d0a9197716548.97282992&date=2019-07-25&fmt=json&filter=extended`;
  // return `http://eodhistoricaldata.com/api/eod-bulk-last-day/US?api_token=5d0a9197716548.97282992&fmt=json&filter=extended`;

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
router.get('/newDailyStockInfo', (req, res) => {
  let thisDate = dates.pop();
  let url = constructUrl();
  let newDateId = thisDate.dateId + 1;

  // dailyStockInfo.getMaxId()
  // .then(responseId => {
    // let dailyStockInfoId = responseId + 1;

    // datesClass.getDateById(newDateId - 1)
    // .then(date => {
      // if (!date || date.length === 0) {
      //   res.sendStatus(404);
      //   return;
      // }
      console.log(thisDate.date);
      console.log(dailyStockInfo);
      //
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

        let dateToAdd = {
          date_id: newDateId,
          date: responseData[1].date,
          sandp_sod: responseData[1].open,
          sandp_eod: responseData[1].close,
          nasdaq_sod: responseData[2].open,
          nasdaq_eod: responseData[2].close,
          dow_jones_sod: responseData[0].open,
          dow_jones_eod: responseData[0].close,
          sandp_eod_to_eod_percent_change: calculatePercentage(thisDate.sandpEod, responseData[1].close),
          sandp_eod_to_sod_percent_change: calculatePercentage(thisDate.sandpEod, responseData[1].open),
          sandp_sod_to_eod_percent_change: calculatePercentage(responseData[1].open, responseData[1].close),
          sandp_eod_to_eod_absolute_change: calculateAbsolute(thisDate.sandpEod, responseData[1].close),
          sandp_eod_to_sod_absolute_change: calculateAbsolute(thisDate.sandpEod, responseData[1].open),
          sandp_sod_to_eod_absolute_change: calculateAbsolute(responseData[1].open, responseData[1].close),
          nasdaq_eod_to_eod_percent_change: calculatePercentage(thisDate.nasdaqEod, responseData[2].close),
          nasdaq_eod_to_sod_percent_change: calculatePercentage(thisDate.nasdaqEod, responseData[2].open),
          nasdaq_sod_to_eod_percent_change: calculatePercentage(responseData[2].open, responseData[2].close),
          nasdaq_eod_to_eod_absolute_change: calculateAbsolute(thisDate.nasdaqEod, responseData[2].close),
          nasdaq_eod_to_sod_absolute_change: calculateAbsolute(thisDate.nasdaqEod, responseData[2].open),
          nasdaq_sod_to_eod_absolute_change: calculateAbsolute(responseData[2].open, responseData[2].close),
          dow_jones_eod_to_eod_percent_change: calculatePercentage(thisDate.dowJonesEod, responseData[0].close),
          dow_jones_eod_to_sod_percent_change: calculatePercentage(thisDate.dowJonesEod, responseData[0].open),
          dow_jones_sod_to_eod_percent_change: calculatePercentage(responseData[0].open, responseData[0].close),
          dow_jones_eod_to_eod_absolute_change: calculateAbsolute(thisDate.dowJonesEod, responseData[0].close),
          dow_jones_eod_to_sod_absolute_change: calculateAbsolute(thisDate.dowJonesEod, responseData[0].open),
          dow_jones_sod_to_eod_absolute_change: calculateAbsolute(responseData[0].open, responseData[0].close),
        }

        // console.log('date to add', dateToAdd);

        thisDate.sandpEod = responseData[1].close;
        thisDate.nasdaqEod = responseData[2].close;
        thisDate.dowJonesEod = responseData[0].close;

        // console.log('this date', thisDate);



        // datesClass.addDate(dateToAdd)
        // .then(date => {
        //   return;
        // })

        for(let i = 3; i < currentKeys.length; i++) {
          let currentCompany = companyData[`${currentKeys[i]}`];
          if (currentCompany.mostRecentPosition >= responseData.length) {
            currentCompany.mostRecentPosition = responseData.length - 1;
          }

          if (responseData[currentCompany.mostRecentPosition].code == currentCompany.code) {
            if (responseData[currentCompany.mostRecentPosition].volume > 0) {
              let updateCompany = {
                daily_stock_info_id: dailyStockInfoId,
                company_id: currentCompany.companyId,
                open_price: responseData[currentCompany.mostRecentPosition].open,
                closing_price: responseData[currentCompany.mostRecentPosition].close,
                date_id: newDateId,
                last_filing_date: 1,
                eod_to_eod_percent_change: calculatePercentage(currentCompany.close, responseData[currentCompany.mostRecentPosition].close),
                eod_to_sod_percent_change: calculatePercentage(currentCompany.close, responseData[currentCompany.mostRecentPosition].open),
                sod_to_eod_percent_change: calculatePercentage(responseData[currentCompany.mostRecentPosition].open, responseData[currentCompany.mostRecentPosition].close),
                eod_to_eod_absolute_change: calculateAbsolute(currentCompany.close, responseData[currentCompany.mostRecentPosition].close),
                eod_to_sod_absolute_change: calculateAbsolute(currentCompany.close, responseData[currentCompany.mostRecentPosition].open),
                sod_to_eod_absolute_change: calculateAbsolute(responseData[currentCompany.mostRecentPosition].open, responseData[currentCompany.mostRecentPosition].close),
                volume: responseData[currentCompany.mostRecentPosition].volume,
                today_market_cap: responseData[currentCompany.mostRecentPosition].MarketCapitalization,
              }

              companyData[`${currentKeys[i]}`].open = responseData[currentCompany.mostRecentPosition].open;
              companyData[`${currentKeys[i]}`].close = responseData[currentCompany.mostRecentPosition].close;
              companyData[`${currentKeys[i]}`].volume = responseData[currentCompany.mostRecentPosition].volume;
              companyData[`${currentKeys[i]}`].MarketCapitalization = responseData[currentCompany.mostRecentPosition].MarketCapitalization;


              dailyStockInfoId++;

              if (currentCompany.companyId == 4002) {
                console.log('GOOGL', updateCompany);
              }

              if (updateCompany.today_market_cap == null) {
                console.log('problem', dailyStockInfoId);
                updateCompany.today_market_cap = 0;
              }

              // dailyStockInfo.addDailyStockInfo(updateCompany)
              // .then(thisDailyStockInfo => {
              //   // res.setHeader('Content-Type', 'application/json');
              //
              //   // return res.send(thisDailyStockInfo[0]);
              // })
            }
            else {
              let updateCompany = {
                daily_stock_info_id: dailyStockInfoId,
                company_id: currentCompany.companyId,
                date_id: newDateId,
                today_market_cap: 0,
                last_filing_date: 1,
              }

              dailyStockInfoId++;

              if (currentCompany.companyId == 4002) {
                console.log('GOOGL', updateCompany);
              }

              if (updateCompany.today_market_cap == null) {
                console.log('problem', dailyStockInfoId);
                updateCompany.today_market_cap = 0;
              }
              delete companyData[`${currentKeys[i]}`];


              // dailyStockInfo.addDailyStockInfo(updateCompany)
              // .then(thisDailyStockInfo => {
              //   // res.setHeader('Content-Type', 'application/json');
              //
              //   // return res.send(thisDailyStockInfo[0]);
              // })
            }
          }

          else if (responseData[currentCompany.mostRecentPosition].code > currentCompany.code) {
            for (let j = currentCompany.mostRecentPosition; j >= 0 && responseData[j].code >= currentCompany.code; j--) {
              if (responseData[j].code == currentCompany.code) {
                if (responseData[j].volume > 0) {
                  let updateCompany = {
                    daily_stock_info_id: dailyStockInfoId,
                    company_id: currentCompany.companyId,
                    open_price: responseData[j].open,
                    closing_price: responseData[j].close,
                    date_id: newDateId,
                    last_filing_date: 1,
                    eod_to_eod_percent_change: calculatePercentage(currentCompany.close, responseData[j].close),
                    eod_to_sod_percent_change: calculatePercentage(currentCompany.close, responseData[j].open),
                    sod_to_eod_percent_change: calculatePercentage(responseData[j].open, responseData[j].close),
                    eod_to_eod_absolute_change: calculateAbsolute(currentCompany.close, responseData[j].close),
                    eod_to_sod_absolute_change: calculateAbsolute(currentCompany.close, responseData[j].open),
                    sod_to_eod_absolute_change: calculateAbsolute(responseData[j].open, responseData[j].close),
                    volume: responseData[j].volume,
                    today_market_cap: responseData[j].MarketCapitalization,
                  }

                  companyData[`${currentKeys[i]}`].open = responseData[j].open;
                  companyData[`${currentKeys[i]}`].close = responseData[j].close;
                  companyData[`${currentKeys[i]}`].volume = responseData[j].volume;
                  companyData[`${currentKeys[i]}`].MarketCapitalization = responseData[j].MarketCapitalization;
                  companyData[`${currentKeys[i]}`].mostRecentPosition = j;

                  dailyStockInfoId++;

                  if (currentCompany.companyId == 4002) {
                    console.log('GOOGL', updateCompany);
                  }

                  if (updateCompany.today_market_cap == null) {
                    console.log('problem', dailyStockInfoId);
                    updateCompany.today_market_cap = 0;
                  }


                  // dailyStockInfo.addDailyStockInfo(updateCompany)
                  // .then(thisDailyStockInfo => {
                  //   // res.setHeader('Content-Type', 'application/json');
                  //
                  //   // return res.send(thisDailyStockInfo[0]);
                  // })
                }
                else {
                  let updateCompany = {
                    daily_stock_info_id: dailyStockInfoId,
                    company_id: currentCompany.companyId,
                    date_id: newDateId,
                    today_market_cap: 0,
                    last_filing_date: 1,
                  }

                  dailyStockInfoId++;
                  if (currentCompany.companyId == 4002) {
                    console.log('GOOGL', updateCompany);
                  }

                  if (updateCompany.today_market_cap == null) {
                    console.log('problem', dailyStockInfoId);
                    updateCompany.today_market_cap = 0;
                  }
                  delete companyData[`${currentKeys[i]}`];


                  // dailyStockInfo.addDailyStockInfo(updateCompany)
                  // .then(thisDailyStockInfo => {
                  //   // res.setHeader('Content-Type', 'application/json');
                  //
                  //   // return res.send(thisDailyStockInfo[0]);
                  // })
                }
              }
            }
          }

          else if (responseData[currentCompany.mostRecentPosition].code < currentCompany.code) {
            for (let j = currentCompany.mostRecentPosition; responseData[j].code <= currentCompany.code; j++) {
              if (responseData[j].code == currentCompany.code) {
                if (responseData[j].volume > 0) {
                  let updateCompany = {
                    daily_stock_info_id: dailyStockInfoId,
                    company_id: currentCompany.companyId,
                    open_price: responseData[j].open,
                    closing_price: responseData[j].close,
                    date_id: newDateId,
                    last_filing_date: 1,
                    eod_to_eod_percent_change: calculatePercentage(currentCompany.close, responseData[j].close),
                    eod_to_sod_percent_change: calculatePercentage(currentCompany.close, responseData[j].open),
                    sod_to_eod_percent_change: calculatePercentage(responseData[j].open, responseData[j].close),
                    eod_to_eod_absolute_change: calculateAbsolute(currentCompany.close, responseData[j].close),
                    eod_to_sod_absolute_change: calculateAbsolute(currentCompany.close, responseData[j].open),
                    sod_to_eod_absolute_change: calculateAbsolute(responseData[j].open, responseData[j].close),
                    volume: responseData[j].volume,
                    today_market_cap: responseData[j].MarketCapitalization,
                  }

                  companyData[`${currentKeys[i]}`].open = responseData[j].open;
                  companyData[`${currentKeys[i]}`].close = responseData[j].close;
                  companyData[`${currentKeys[i]}`].volume = responseData[j].volume;
                  companyData[`${currentKeys[i]}`].MarketCapitalization = responseData[j].MarketCapitalization;
                  companyData[`${currentKeys[i]}`].mostRecentPosition = j;

                  dailyStockInfoId++;

                  if (currentCompany.companyId == 4002) {
                    console.log('GOOGL', updateCompany);
                  }

                  if (updateCompany.today_market_cap == null) {
                    console.log('problem', dailyStockInfoId);
                    updateCompany.today_market_cap = 0;
                  }


                  // dailyStockInfo.addDailyStockInfo(updateCompany)
                  // .then(thisDailyStockInfo => {
                  //   // res.setHeader('Content-Type', 'application/json');
                  //
                  //   // return res.send(thisDailyStockInfo[0]);
                  // })
                }
                else {
                  let updateCompany = {
                    daily_stock_info_id: dailyStockInfoId,
                    company_id: currentCompany.companyId,
                    date_id: newDateId,
                    today_market_cap: 0,
                    last_filing_date: 1,
                  }

                  if (currentCompany.companyId == 4002) {
                    console.log('GOOGL', updateCompany);
                  }

                  if (updateCompany.today_market_cap == null) {
                    console.log('problem', dailyStockInfoId);
                    updateCompany.today_market_cap = 0;
                  }

                  dailyStockInfoId++;
                  delete companyData[`${currentKeys[i]}`];


                  // dailyStockInfo.addDailyStockInfo(updateCompany)
                  // .then(thisDailyStockInfo => {
                  //   // res.setHeader('Content-Type', 'application/json');
                  //
                  //   // return res.send(thisDailyStockInfo[0]);
                  // })
                }
              }
            }
          }
        }

        // let dateToAdd = {
        //   date_id: newDateId,
        //   date: responseData.date,
        //   sandp_sod: responseData[1].open,
        //   sandp_eod: responseData[1].close,
        //   nasdaq_sod: responseData[2].open,
        //   nasdaq_eod: responseData[2].close,
        //   dow_jones_sod: responseData[0].open,
        //   dow_jones_eod: responseData[0].close,
        //   sandp_eod_to_eod_percent_change: calculatePercentage(thisDate.sandpEod, responseData[1].close),
        //   sandp_eod_to_sod_percent_change: calculatePercentage(thisDate.sandpEod, responseData[1].open),
        //   sandp_sod_to_eod_percent_change: calculatePercentage(responseData[1].open, responseData[1].close),
        //   sandp_eod_to_eod_absolute_change: calculateAbsolute(thisDate.sandpEod, responseData[1].close),
        //   sandp_eod_to_sod_absolute_change: calculateAbsolute(thisDate.sandpEod, responseData[1].open),
        //   sandp_sod_to_eod_absolute_change: calculateAbsolute(responseData[1].open, responseData[1].close),
        //   nasdaq_eod_to_eod_percent_change: calculatePercentage(thisDate.nasdaqEod, responseData[2].close),
        //   nasdaq_eod_to_sod_percent_change: calculatePercentage(thisDate.nasdaqEod, responseData[2].open),
        //   nasdaq_sod_to_eod_percent_change: calculatePercentage(responseData[2].open, responseData[2].close),
        //   nasdaq_eod_to_eod_absolute_change: calculateAbsolute(thisDate.nasdaqEod, responseData[2].close),
        //   nasdaq_eod_to_sod_absolute_change: calculateAbsolute(thisDate.nasdaqEod, responseData[2].open),
        //   nasdaq_sod_to_eod_absolute_change: calculateAbsolute(responseData[2].open, responseData[2].close),
        //   dow_jones_eod_to_eod_percent_change: calculatePercentage(thisDate.dowJonesEod, responseData[0].close),
        //   dow_jones_eod_to_sod_percent_change: calculatePercentage(thisDate.dowJonesEod, responseData[0].open),
        //   dow_jones_sod_to_eod_percent_change: calculatePercentage(responseData[0].open, responseData[0].close),
        //   dow_jones_eod_to_eod_absolute_change: calculateAbsolute(thisDate.dowJonesEod, responseData[0].close),
        //   dow_jones_eod_to_sod_absolute_change: calculateAbsolute(thisDate.dowJonesEod, responseData[0].open),
        //   dow_jones_sod_to_eod_absolute_change: calculateAbsolute(responseData[0].open, responseData[0].close),
        // }
        //
        // datesClass.addDate(dateToAdd)
        // .then(date => {
        //   return;
        // })

        dates.push({
          date: responseData[1].date,
          dateId: thisDate.dateId + 1,
          sandpEod: thisDate.sandpEod,
          nasdaqEod: thisDate.nasdaqEod,
          dowJonesEod: thisDate.dowJonesEod,
        });

        // console.log('new date info', {
        //   date: responseData[1].date,
        //   dateId: thisDate.dateId + 1,
        //   sandpEod: thisDate.sandpEod,
        //   nasdaqEod: thisDate.nasdaqEod,
        //   dowJonesEod: thisDate.dowJonesEod,
        // });
        companyData.date = thisDate.date;
        companyData.dateId = thisDate.dateId;
        companyData.dailyStockInfoId = dailyStockInfoId;
        otherCompanyData.dailyStockInfo = dailyStockInfo;
        console.log('final dailyStockInfoId', dailyStockInfoId);

        // fs.writeFileSync('../../dates-copy.json', JSON.stringify(dates));
        // fs.writeFileSync('../../temp-new-new-company-data-copy.json', JSON.stringify(companyData));
        // not safe for now
        // fs.writeFileSync('../../new-company-data.json', JSON.stringify(otherCompanyData));

      }
    )
    res.send(thisDate.date);
  // })
  // .catch(err => {
  //   res.status(500).send(err);
  // });
// })

console.log('done');
});

module.exports = router;
