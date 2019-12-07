'use strict';

const bodyParser = require('body-parser');
const express = require('express');
const humps = require('humps');
const fetch = require('node-fetch');
const Bluebird = require("bluebird");

const Picks = require('../controllers/picks.js');
const Date = require('../controllers/dates.js');
const Company = require('../controllers/companies.js');
const DailyStockInfo = require('../controllers/daily_stock_info.js');

const picks = new Picks();
const dates = new Date();
const companies = new Company();
const dailyStockInfo = new DailyStockInfo();

function calculatePercentage(first, last) {
  return ((last / first) - 1);
}

function calculateAbsolute(first, last) {
  return (last - first);
}

async function getData(data) {
  await picks.getPicksByFilter(data)
}

// async function getDate(dateString) {
//   let result = await dates.getDateBydate(dateString);
//   return result;
// }

const router = express.Router();




router.get('/picks/:id', (req, res) => {
  let id = req.params.id;
  dailyStockInfo.getDailyStockInfoByDateId(id)
  .then(picks => {
    console.log(picks.length);
    res.send(picks);
  })
  .catch(err => {
    res.status(500).send(err);
  });
})

// most recent one that works
// router.post('/picks', (req, res) => {
//   //now have to get all stock infos for each day and sort them. Then apply filters. then use the current functonality on the results. next day get all stock infos for next day and then
//
//   const body = JSON.parse(Object.keys(req.body));
//
//   // console.log(body);
//
//   // body.start_date = body.start_dates[`0`];
//   // body.end_date = body.end_dates[`0`];
//   // body.sell_period = 'period' + body.sell_periods[`0`];
//
//   dates.getDateByDate(body.start_date)
//   .then(date => {
//     body.start_date_id = date.dateId - 1;
//     dates.getDateByDate(body.end_date)
//     .then (date => {
//       body.end_date_id = date.dateId - 1;
//       let dateArr = [];
//       for (let i = body.start_date_id; i <= body.end_date_id; i++) {
//         dateArr.push(i);
//       }
//       // console.log('body', body);
//       picks.getPicksByFilter(body)
//       // .then(newData => {
//       //
//       // })
//     })
//   })
//   // dates.getDateByDate(body.start_date)
//   // .then(date => {
//   //   body.start_date_id = date.dateId - 1;
//   //   //need to change
//   //   dates.getDateByDate(body.end_date)
//   //   .then(date => {
//   //     body.end_date_id = date.dateId - 1;
//   //     let tickers = [];
//   //     for (let i = 0; i < Object.keys(body.tickers).length; i++) {
//   //       tickers[i] = body.tickers[`${i}`]
//   //     }
//   //
//   //     companies.getCompaniesByTicker(tickers)
//   //     .then(newCompanies => {
//   //       body.company_ids = [];
//   //       for (let i = 0; i < newCompanies.length; i++) {
//   //         body.company_ids.push(newCompanies[i].companyId);
//   //       }
//   //       console.log(body);
//   //       picks.getPicksByTicker(body)
//   //       .then(newPicks => {
//   //         console.log('newpicks', newPicks);
//   //         body.changePercentage = [];
//   //         body.changeAbsolute = [];
//   //         for(let i = 0; i < newPicks.companyIds.length; i++) {
//   //           body.changePercentage.push(calculatePercentage(newPicks.periodData[`${i}`].period11, newPicks.periodData[`${i}`][`${body.sell_period}`]) * 100);
//   //           body.changeAbsolute.push(calculateAbsolute(newPicks.periodData[`${i}`].period11, newPicks.periodData[`${i}`][`${body.sell_period}`]));
//   //
//   //         }
//   //
//   //         let avgPercent = body.changePercentage.reduce((previous, current) => current = (current + previous) / body.changePercentage.length);
//   //         let avgAbsolute = body.changeAbsolute.reduce((previous, current) => current = (current + previous) / body.changePercentage.length);
//   //
//   //         body.changePercentage.sort((a, b) => a - b);
//   //         body.changeAbsolute.sort((a, b) => a - b);
//   //
//   //
//   //         let lowMiddle = Math.floor((body.changePercentage.length - 1) / 2);
//   //         let highMiddle = Math.ceil((body.changePercentage.length - 1));
//   //
//   //         let medianPercent = (body.changePercentage[lowMiddle] + body.changePercentage[highMiddle]) / 2;
//   //         let medianAbsolute = (body.changeAbsolute[lowMiddle] + body.changeAbsolute[highMiddle]) / 2;
//   //
//   //
//   //         body.avgPercent = avgPercent;
//   //         body.medianPercent = medianPercent;
//   //         body.avgAbsolute = avgAbsolute;
//   //         body.medianAbsolute = medianAbsolute;
//   //
//   //
//   //
//   //         console.log('final body', body);
//   //         // console.log('AAPL', calculatePercentage(192.9, 197.87) * 100);
//   //         // console.log('GOOGL', calculatePercentage(1089.10, 1104.51) * 100);
//   //
//   //
//   //         res.send(picks[0]);
//   //       })
//   //       .catch(err => {
//   //         res.status(500).send(err);
//   //       });
//   //     })
//   //     .catch(err => {
//   //       res.status(500).send(err);
//   //     });
//   //   })
//   //   .catch(err => {
//   //     res.status(500).send(err);
//   //   });
//   // })
//   .catch(err => {
//     res.status(500).send(err);
//   });
//
// });





// this works too. get multiple company data
router.post('/picks', (req, res) => {
  const body = JSON.parse(Object.keys(req.body));

  console.log(body);

  body.start_date = body.start_dates[`0`];
  body.end_date = body.end_dates[`0`];
  body.sell_period = 'period' + body.sell_periods[`0`];


  dates.getDateByDate(body.start_date)
  .then(date => {
    body.start_date_id = date.dateId - 1;
    dates.getDateByDate(body.end_date)
    .then(date => {
      body.end_date_id = date.dateId - 1;
      let tickers = [];
      for (let i = 0; i < Object.keys(body.tickers).length; i++) {
        tickers[i] = body.tickers[`${i}`]
      }

      companies.getCompaniesByTicker(tickers)
      .then(newCompanies => {
        body.company_ids = [];
        for (let i = 0; i < newCompanies.length; i++) {
          body.company_ids.push(newCompanies[i].companyId);
        }
        console.log(body);
        picks.getPicksByTicker(body)
        .then(newPicks => {
          console.log('newpicks', newPicks);
          body.changePercentage = [];
          body.changeAbsolute = [];
          for(let i = 0; i < newPicks.companyIds.length; i++) {
            body.changePercentage.push(calculatePercentage(newPicks.periodData[`${i}`].period11, newPicks.periodData[`${i}`][`${body.sell_period}`]) * 100);
            body.changeAbsolute.push(calculateAbsolute(newPicks.periodData[`${i}`].period11, newPicks.periodData[`${i}`][`${body.sell_period}`]));

          }

          let avgPercent = body.changePercentage.reduce((previous, current) => current = (current + previous) / body.changePercentage.length);
          let avgAbsolute = body.changeAbsolute.reduce((previous, current) => current = (current + previous) / body.changePercentage.length);

          body.changePercentage.sort((a, b) => a - b);
          body.changeAbsolute.sort((a, b) => a - b);


          let lowMiddle = Math.floor((body.changePercentage.length - 1) / 2);
          let highMiddle = Math.ceil((body.changePercentage.length - 1));

          let medianPercent = (body.changePercentage[lowMiddle] + body.changePercentage[highMiddle]) / 2;
          let medianAbsolute = (body.changeAbsolute[lowMiddle] + body.changeAbsolute[highMiddle]) / 2;


          body.avgPercent = avgPercent;
          body.medianPercent = medianPercent;
          body.avgAbsolute = avgAbsolute;
          body.medianAbsolute = medianAbsolute;



          console.log('final body', body);
          // console.log('AAPL', calculatePercentage(192.9, 197.87) * 100);
          // console.log('GOOGL', calculatePercentage(1089.10, 1104.51) * 100);


          res.send(picks[0]);
        })
        .catch(err => {
          res.status(500).send(err);
        });
      })
      .catch(err => {
        res.status(500).send(err);
      });
    })
    .catch(err => {
      res.status(500).send(err);
    });
  })
  .catch(err => {
    res.status(500).send(err);
  });

});

// old one that works
router.post('/picks', (req, res) => {
  const body = JSON.parse(Object.keys(req.body));

  console.log(body);


  dates.getDateByDate(body.start_date)
  .then(date => {
    body.start_date_id = date.dateId - 1;
    dates.getDateByDate(body.end_date)
    .then(date => {
      body.end_date_id = date.dateId - 1;
      companies.getCompanyByTicker(body.ticker)
      .then(company => {
        body.company_id = company.companyId;
        picks.getPicksByTicker(body)
        .then(newPicks => {
          console.log(newPicks);
          console.log(calculatePercentage(newPicks[`period11`], newPicks[`${body.sell_period}`]) * 100);
          console.log(calculatePercentage(1089.10, 1104.51) * 100);
          res.send(picks[0]);
        })
        .catch(err => {
          res.status(500).send(err);
        });
      })
      .catch(err => {
        res.status(500).send(err);
      });
    })
    .catch(err => {
      res.status(500).send(err);
    });
  })
  .catch(err => {
    res.status(500).send(err);
  });

});



router.post('/picks', (req, res) => {
  //now have to get all stock infos for each day and sort them. Then apply filters. then use the current functonality on the results. next day get all stock infos for next day and then

  const body = JSON.parse(Object.keys(req.body));

  // console.log(body);

  // body.start_date = body.start_dates[`0`];
  // body.end_date = body.end_dates[`0`];
  // body.sell_period = 'period' + body.sell_periods[`0`];

  dates.getDateByDate(body.start_date)
  .then(date => {
    body.start_date_id = date.dateId - 1;
    dates.getDateByDate(body.end_date)
    .then (date => {
      body.end_date_id = date.dateId - 1;
      let dateArr = [];
      for (let i = body.start_date_id; i <= body.end_date_id; i++) {
        dateArr.push(i);
      }
      // console.log('body', body);
      for (let i = body.start_date_id; i <= body.end_date_id; i++) {
        body.start_date_id = i;

        // console.log('original boy', body);
        getData(body)
        // picks.getPicksByFilter(body)
        .then(newData => {
          console.log('newData', newData);
          // picks.inser
          // return newData;
        })
        .catch(err => {
          console.log('errfdfdasfdsafdsaf', err);
          return;
          // res.status(500).send(err);
        });
      }
    })
  })
  .catch(err => {
    res.status(500).send(err);
  });

});


module.exports = router;
