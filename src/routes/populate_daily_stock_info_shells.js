'use strict';

const fs = require('fs');
var request = require("request");
var zlib = require('zlib');
const companyData = require ('../../company-data.json')
const bodyParser = require('body-parser');
const express = require('express');
const humps = require('humps');
const fetch = require('node-fetch');

const DailyStockInfo = require('../controllers/daily_stock_info.js');

const router = express.Router();

const dailyStockInfo = new DailyStockInfo();




// router.get('/populateDailyStockInfoShells', (req, res) => {
//   let count = 0;
//   for (let i = 0; i < 1; i++) {
//     for (let j = 4; j < companyData.length; j++) {
//       let ticker = companyData[j].code;
//       console.log(j);
//         dailyStockInfo.getDailyStockInfoByTicker(ticker)
//         .then(dailyStockInfo => {
//           if (!dailyStockInfo || dailyStockInfo.length === 0) {
//             // j += 20000;
//             console.log('ticker', ticker);
//             count++;
//             console.log(j, count);
//              // res.sendStatus(404);
//              return;
//           }
//           return;
//         })
//
//       // dailyStockInfo.addDailyStockInfoShells();
//       // console.log(j);
//
//     }
//   }
//   // console.log(newData);
//   console.log('done');
// })

router.get('/populateDailyStockInfoShells', (req, res) => {
  let count = 0;
  for (let i = 78; i < 83; i++) {
    for (let j = 4; j < companyData.length; j++) {
        dailyStockInfo.addDailyStockInfoShells()
        .then(dailyStockInfo => {
          return;
        })



    }
  }
  console.log('done');
})


module.exports = router;
