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
const OrderFilter = require('../controllers/order_filters.js');
const SelectFilter = require('../controllers/select_filters.js');
const CompanyData = require('../controllers/company_data.js');



const picks = new Picks();
const dates = new Date();
const companies = new Company();
const dailyStockInfo = new DailyStockInfo();
const orderFilters = new OrderFilter();
const selectFilters = new SelectFilter();
const companyDataClass = new CompanyData();


const router = express.Router();

function calculatePercentage(first, last) {
  return ((last / first) - 1);
}

function calculateAbsolute(first, last) {
  return (last - first);
}

async function getOrderFilterByFilter(order_filters) {
  let result = await orderFilters.getOrderFilterByFilter(order_filters);
  return result;
}

async function updateOrderFilter(body, order_filters) {
  let updateOrderFilter = {
    order_filter_id: order_filters.orderFilterId,
    order_filter_name: order_filters.orderFilterName,
    symbol: order_filters.symbol,
    number: body.order_filters[`${0}`].number,
  }
  let result = await orderFilters.updateOrderFilter(updateOrderFilter);
  return result;
}

async function getData(data) {
  let result = await picks.getPicksByFilter(data);
  return result;
}

async function getFullData(data) {
  let result = await picks.getFullDataByFilter(data);
  return result;
}

async function addPick(body, fullData, order_filters) {
  let pickToAdd = {
    date_id: fullData.startDateId,
    order_filter_id: order_filters.orderFilterId,
    group_id: body.group_id,
    buy_period: fullData.buyPeriod,
    sell_period: fullData.sellPeriod,
    result: fullData.result,
    day_change_avg_percentage: fullData.dayChangeAvgPercentage,
    day_change_avg_absolute: fullData.dayChangeAvgAbsolute,
    day_overall_change: fullData.dayOverallChange,
    day_change_median_percent: fullData.dayChangeMedianPercent,
    day_change_median_absolute: fullData.dayChangeMedianAbsolute,
  }
  let result = await picks.addPick(pickToAdd);
  return result;
}

async function addCompanyData(companyData) {
  let result = await companyDataClass.addCompanyData(companyData);
  return result;
}

async function addCompanyDataAndPickIds(pickId, companyData) {
  console.log('route function pickId', pickId);
  let result = await picks.addCompanyDataAndPickIds(pickId, companyData);
  return result;
}


router.post('/picks', (req, res) => {

  const body = JSON.parse(Object.keys(req.body));
  // console.log('body1', body);


  getOrderFilterByFilter(body.order_filters[`${0}`])
  .then(orderFilters => {
    // console.log('order filter', orderFilters);

    updateOrderFilter(body, orderFilters)
    .then(orderFilters => {
      // console.log('updated order filter', orderFilters);

      //// body.start_date_id = date.dateId - 1;
      //// body.end_date_id = date.dateId - 1;

      // console.log('original body', body);
      console.log('first step');
      getData(body)
      .then(newData => {
        // console.log('new data', newData);

        //// body.start_date_id += 1;
        console.log('next step');
        getFullData(newData)
        .then(fullData => {
          // console.log('full data', fullData);

          //// body.start_date_id += 1;

          addPick(body, fullData, orderFilters[`${0}`])
          .then(pick => {

            // console.log('first pick', pick);
            //   console.log('added pick', pick);
            addCompanyData(fullData.companyData)
          .then(companyData => {
            // console.log('second pick', pick);
            // console.log('final company data', companyData);

              addCompanyDataAndPickIds(pick[0].pickId, companyData)
            .then(result => {
              // console.log('final company data and picks', result);
              res.send(result)
            })

          })

          })

        })

        // })
        // .catch(err => {
        //   return;
        //   // res.status(500).send(err);
      });
    })
  })
});



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

router.get('/picks', (req, res) => {
  picks.getPicks()
  .then(pick => {
    res.send(pick);
  })
  .catch(err => {
    res.status(500).send(err);
  });
});

router.get('/picksSort', (req, res) => {
  picks.getPicksAndSort()
  .then(pick => {
    console.log(pick);
    res.send(pick);
  })
  .catch(err => {
    res.status(500).send(err);
  });
});

router.get('/companyDataAndPicks', (req, res) => {
  picks.getCompanyDataAndPicks()
  .then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(500).send(err);
  });
});




// after all of the above, make route to get the picks and send need info to google sheets

module.exports = router;
