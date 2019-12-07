'use strict';

const fs = require('fs');
var request = require("request");
var zlib = require('zlib');
const companyData = require ('../../temp-new-new-company-data-copy.json');
const otherCompanyData = require ('../../new-company-data.json');
const dates = require ('../../dates-copy.json');
// const dates = [{"date":"2019-07-24","dateId":5056,"dailyStockInfoId":5990787,"sandpEod":2995.11,"nasdaqEod":8207.24,"dowJonesEod":27223}]

const bodyParser = require('body-parser');
const express = require('express');
const humps = require('humps');
const fetch = require('node-fetch');
// let dailyStockInfoId = companyData.dailyStockInfoId
let dailyStockInfoId = dates[0].dailyStockInfoId;

// things to do
// add id to keep track of stock picks

const Date = require('../controllers/dates.js');
const DailyStockInfo = require('../controllers/daily_stock_info.js');

const router = express.Router();

const datesClass = new Date();
const dailyStockInfo = new DailyStockInfo();

function constructUrl(date) {

  return `http://eodhistoricaldata.com/api/eod-bulk-last-day/US?api_token=5d0a9197716548.97282992&date=${date}&fmt=json&filter=extended`;
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
  let url = constructUrl(thisDate.date);
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
  console.log(dailyStockInfoId);
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

    request(
      { method: 'GET',
      uri: `http://eodhistoricaldata.com/api/eod-bulk-last-day/US?api_token=5d0a9197716548.97282992&fmt=json&filter=extended`,
      // http://eodhistoricaldata.com/api/eod-bulk-last-day/US?api_token=5d0a9197716548.97282992&fmt=json&filter=extended
      gzip: true,
    }, function (error, response, body) {
      let responseData2 = JSON.parse(body);



  // let dateToAdd = {
  //   date_id: newDateId,
  //   date: responseData[1].date,
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

  let dateToAdd = {
    date_id: newDateId,
    date: responseData[0].date,
    sandp_sod: 0,
    sandp_eod: 0,
    nasdaq_sod: 0,
    nasdaq_eod: 0,
    dow_jones_sod:0,
    dow_jones_eod: 0,
    sandp_eod_to_eod_percent_change: 0,
    sandp_eod_to_sod_percent_change: 0,
    sandp_sod_to_eod_percent_change: 0,
    sandp_eod_to_eod_absolute_change: 0,
    sandp_eod_to_sod_absolute_change:0,
    sandp_sod_to_eod_absolute_change: 0,
    nasdaq_eod_to_eod_percent_change: 0,
    nasdaq_eod_to_sod_percent_change: 0,
    nasdaq_sod_to_eod_percent_change: 0,
    nasdaq_eod_to_eod_absolute_change: 0,
    nasdaq_eod_to_sod_absolute_change: 0,
    nasdaq_sod_to_eod_absolute_change: 0,
    dow_jones_eod_to_eod_percent_change: 0,
    dow_jones_eod_to_sod_percent_change: 0,
    dow_jones_sod_to_eod_percent_change: 0,
    dow_jones_eod_to_eod_absolute_change: 0,
    dow_jones_eod_to_sod_absolute_change: 0,
    dow_jones_sod_to_eod_absolute_change: 0,
  }





  // console.log('date to add', dateToAdd);

  thisDate.sandpEod = responseData[1].close;
  thisDate.nasdaqEod = responseData[2].close;
  thisDate.dowJonesEod = responseData[0].close;

  // console.log('this date', thisDate);



  // datesClass.addDate(dateToAdd)
  // .then(date => {
    // return;

  let count = 0;
  for(let i = 0; i < responseData2.length; i++) {
    // console.log(i, currentKeys.indexOf(responseData2[i].code));
    // let currentCompany = companyData[`${currentKeys[i]}`];
    if (currentKeys.indexOf(responseData2[i].code) >= 0) {
      // console.log('if', responseData2[i]);
      if (responseData2[i].volume > 0) {
        // console.log(i);
        for (let j = count; j <= responseData.length; j++) {
          if (j == responseData.length) {

            let updateCompany = {
              daily_stock_info_id: dailyStockInfoId,
              company_id: companyData[`${responseData2[i].code}`].companyId,
              open_price: responseData2[i].open,
              closing_price: responseData2[i].close,
              date_id: newDateId,
              last_filing_date: 1,
              // eod_to_eod_percent_change: calculatePercentage(responseData[j].close, responseData2[i].close),
              // eod_to_sod_percent_change: calculatePercentage(responseData[j].close, responseData2[i].open),
              sod_to_eod_percent_change: calculatePercentage(responseData2[i].open, responseData2[i].close),
              // eod_to_eod_absolute_change: calculateAbsolute(responseData[j].close, responseData2[i].close),
              // eod_to_sod_absolute_change: calculateAbsolute(responseData[j].close, responseData2[i].open),
              sod_to_eod_absolute_change: calculateAbsolute(responseData2[i].open, responseData2[i].close),
              volume: responseData2[i].volume,
              today_market_cap: responseData2[i].MarketCapitalization,
            }

            // console.log('updateCompany', updateCompany);

            dailyStockInfoId++;

            if (updateCompany.company_id == 4002) {
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
          else if (responseData[j].code == responseData2[i].code) {
            let updateCompany = {
              daily_stock_info_id: dailyStockInfoId,
              company_id: companyData[`${responseData2[i].code}`].companyId,
              open_price: responseData2[i].open,
              closing_price: responseData2[i].close,
              date_id: newDateId,
              last_filing_date: 1,
              eod_to_eod_percent_change: calculatePercentage(responseData[j].close, responseData2[i].close),
              eod_to_sod_percent_change: calculatePercentage(responseData[j].close, responseData2[i].open),
              sod_to_eod_percent_change: calculatePercentage(responseData2[i].open, responseData2[i].close),
              eod_to_eod_absolute_change: calculateAbsolute(responseData[j].close, responseData2[i].close),
              eod_to_sod_absolute_change: calculateAbsolute(responseData[j].close, responseData2[i].open),
              sod_to_eod_absolute_change: calculateAbsolute(responseData2[i].open, responseData2[i].close),
              volume: responseData2[i].volume,
              today_market_cap: responseData2[i].MarketCapitalization,
            }

            // console.log('updateCompany', updateCompany);


            dailyStockInfoId++;

            if (updateCompany.company_id == 4002) {
              console.log('GOOGL', updateCompany);
            }

            if (updateCompany.today_market_cap == null) {
              console.log('problem', dailyStockInfoId);
              updateCompany.today_market_cap = 0;
            }

            count = j;
            j = responseData.length + 1;

            // dailyStockInfo.addDailyStockInfo(updateCompany)
            // .then(thisDailyStockInfo => {
            //   // res.setHeader('Content-Type', 'application/json');
            //
            //   // return res.send(thisDailyStockInfo[0]);
            // })
          }
        }
      }

      else {
        // console.log(responseData2[i].code, companyData[`${responseData2[i].code}`]);
        let updateCompany = {
          daily_stock_info_id: dailyStockInfoId,
          company_id: companyData[`${responseData2[i].code}`].companyId,
          date_id: newDateId,
          today_market_cap: 0,
          last_filing_date: 1,
        }

        // console.log('updateCompany', updateCompany);


        dailyStockInfoId++;

        if (updateCompany.company_id == 4002) {
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
    date: responseData2[1].date,
    dateId: thisDate.dateId + 1,
    dailyStockInfoId: dailyStockInfoId,
    // sandpEod: thisDate.sandpEod,
    // nasdaqEod: thisDate.nasdaqEod,
    // dowJonesEod: thisDate.dowJonesEod,
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

//   fs.writeFile('dates-copy.json', JSON.stringify(dates), function (err) {
// if (err) throw err;
// // console.log('Replaced!');
// });
  // fs.writeFileSync('../../temp-new-new-company-data-copy.json', JSON.stringify(companyData));
  // not safe for now
  // fs.writeFileSync('../../new-company-data.json', JSON.stringify(otherCompanyData));

// })

}
)
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

// let updateCompany = {
//   daily_stock_info_id: dailyStockInfoId,
//   company_id: currentCompany.companyId,
//   open_price: responseData[currentCompany.mostRecentPosition].open,
//   closing_price: responseData[currentCompany.mostRecentPosition].close,
//   date_id: newDateId,
//   last_filing_date: 1,
//   eod_to_eod_percent_change: calculatePercentage(currentCompany.close, responseData[currentCompany.mostRecentPosition].close),
//   eod_to_sod_percent_change: calculatePercentage(currentCompany.close, responseData[currentCompany.mostRecentPosition].open),
//   sod_to_eod_percent_change: calculatePercentage(responseData[currentCompany.mostRecentPosition].open, responseData[currentCompany.mostRecentPosition].close),
//   eod_to_eod_absolute_change: calculateAbsolute(currentCompany.close, responseData[currentCompany.mostRecentPosition].close),
//   eod_to_sod_absolute_change: calculateAbsolute(currentCompany.close, responseData[currentCompany.mostRecentPosition].open),
//   sod_to_eod_absolute_change: calculateAbsolute(responseData[currentCompany.mostRecentPosition].open, responseData[currentCompany.mostRecentPosition].close),
//   volume: responseData[currentCompany.mostRecentPosition].volume,
//   today_market_cap: responseData[currentCompany.mostRecentPosition].MarketCapitalization,
// }

// let updateCompany = {
//   daily_stock_info_id: dailyStockInfoId,
//   company_id: currentCompany.companyId,
//   date_id: newDateId,
//   today_market_cap: 0,
//   last_filing_date: 1,
// }

// if (currentCompany.companyId == 4002) {
//   console.log('GOOGL', updateCompany);
// }

// dailyStockInfoId++;

// dailyStockInfo.addDailyStockInfo(updateCompany)
// .then(thisDailyStockInfo => {
//   // res.setHeader('Content-Type', 'application/json');
//
//   // return res.send(thisDailyStockInfo[0]);
// })

// if (responseData[currentCompany.mostRecentPosition].code == currentCompany.code) {
//   if (responseData[currentCompany.mostRecentPosition].volume > 0) {
//     let updateCompany = {
//       daily_stock_info_id: dailyStockInfoId,
//       company_id: currentCompany.companyId,
//       open_price: responseData[currentCompany.mostRecentPosition].open,
//       closing_price: responseData[currentCompany.mostRecentPosition].close,
//       date_id: newDateId,
//       last_filing_date: 1,
//       eod_to_eod_percent_change: calculatePercentage(currentCompany.close, responseData[currentCompany.mostRecentPosition].close),
//       eod_to_sod_percent_change: calculatePercentage(currentCompany.close, responseData[currentCompany.mostRecentPosition].open),
//       sod_to_eod_percent_change: calculatePercentage(responseData[currentCompany.mostRecentPosition].open, responseData[currentCompany.mostRecentPosition].close),
//       eod_to_eod_absolute_change: calculateAbsolute(currentCompany.close, responseData[currentCompany.mostRecentPosition].close),
//       eod_to_sod_absolute_change: calculateAbsolute(currentCompany.close, responseData[currentCompany.mostRecentPosition].open),
//       sod_to_eod_absolute_change: calculateAbsolute(responseData[currentCompany.mostRecentPosition].open, responseData[currentCompany.mostRecentPosition].close),
//       volume: responseData[currentCompany.mostRecentPosition].volume,
//       today_market_cap: responseData[currentCompany.mostRecentPosition].MarketCapitalization,
//     }
//
//     companyData[`${currentKeys[i]}`].open = responseData[currentCompany.mostRecentPosition].open;
//     companyData[`${currentKeys[i]}`].close = responseData[currentCompany.mostRecentPosition].close;
//     companyData[`${currentKeys[i]}`].volume = responseData[currentCompany.mostRecentPosition].volume;
//     companyData[`${currentKeys[i]}`].MarketCapitalization = responseData[currentCompany.mostRecentPosition].MarketCapitalization;
//
//
//     dailyStockInfoId++;
//
//     if (currentCompany.companyId == 4002) {
//       console.log('GOOGL', updateCompany);
//     }
//
//     if (updateCompany.today_market_cap == null) {
//       console.log('problem', dailyStockInfoId);
//       updateCompany.today_market_cap = 0;
//     }
//
//     // dailyStockInfo.addDailyStockInfo(updateCompany)
//     // .then(thisDailyStockInfo => {
//     //   // res.setHeader('Content-Type', 'application/json');
//     //
//     //   // return res.send(thisDailyStockInfo[0]);
//     // })
//   }
//   else {
//     let updateCompany = {
//       daily_stock_info_id: dailyStockInfoId,
//       company_id: currentCompany.companyId,
//       date_id: newDateId,
//       today_market_cap: 0,
//       last_filing_date: 1,
//     }
//
//     dailyStockInfoId++;
//
//     if (currentCompany.companyId == 4002) {
//       console.log('GOOGL', updateCompany);
//     }
//
//     if (updateCompany.today_market_cap == null) {
//       console.log('problem', dailyStockInfoId);
//       updateCompany.today_market_cap = 0;
//     }
//     delete companyData[`${currentKeys[i]}`];
//
//
//     // dailyStockInfo.addDailyStockInfo(updateCompany)
//     // .then(thisDailyStockInfo => {
//     //   // res.setHeader('Content-Type', 'application/json');
//     //
//     //   // return res.send(thisDailyStockInfo[0]);
//     // })
//   }
// }


module.exports = router;
