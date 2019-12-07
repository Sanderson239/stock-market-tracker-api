'use strict';

const bodyParser = require('body-parser');
const express = require('express');
const humps = require('humps');
const fetch = require('node-fetch');

const DailyStockInfo = require('../controllers/daily_stock_info.js');

const router = express.Router();

const dailyStockInfo = new DailyStockInfo();

router.get('/dailyStockInfo', (req, res) => {
  dailyStockInfo.getDailyStockInfo()
    .then(dailyStockInfo => {
      res.send(dailyStockInfo);
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

router.get('/dailyStockInfo/:id', (req, res) => {
  const id = req.params.id;
  dailyStockInfo.getDailyStockInfoById(id)
    .then(dailyStockInfo => {
      if (!dailyStockInfo || dailyStockInfo.length === 0) {
         res.sendStatus(404);
         return;
      }
      res.send(dailyStockInfo);
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

router.get('/dailyStockInfoByCompanyIdAndDateId/:companyId/:dateId', (req, res) => {
  const companyId = req.params.companyId;
  const dateId = req.params.dateId;

  // console.log('params', companyId, dateId);

  dailyStockInfo.getDailyStockInfoCompanyIdAndDateId(companyId, dateId)
    .then(dailyStockInfo => {
      if (!dailyStockInfo || dailyStockInfo.length === 0) {
         res.sendStatus(404);
         return;
      }
      res.send(dailyStockInfo);
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

router.get('/dailyStockInfoByCompanyIdAndDateId2/:companyId/:dateId', (req, res) => {
  const companyId = req.params.companyId;
  const dateId = req.params.dateId;

  // console.log('params', companyId, dateId);

  dailyStockInfo.getDailyStockInfoCompanyIdAndDateId2(companyId, dateId)
    .then(dailyStockInfo => {
      if (!dailyStockInfo || dailyStockInfo.length === 0) {
         res.sendStatus(404);
         return;
      }
      res.send(dailyStockInfo);
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

router.post('/dailyStockInfo', (req, res) => {
  //maybe update other routes to be like this
  const body = req.body;

  dailyStockInfo.addDailyStockInfo(body)
  .then(body => {
    res.setHeader('Content-Type', 'application/json')
    return res.send(body[0]);
  })
  .catch(err => {
    res.sendStatus(500);
  });
});

router.post('/dailyStockInfo/:id', (req, res) => {
  const body = req.body;

  dailyStockInfo.updateDailyStockInfo(body)
  .then(body => {
    res.setHeader('Content-Type', 'application/json')
    return res.send(body[0]);
  })
  .catch(err => {
    res.sendStatus(500);
  });
});

router.delete('/dailyStockInfo/:id', (req, res) => {
  const id = req.params.id;

  if (isNaN(id)) {
    return res.sendStatus(404);
  }

  dailyStockInfo.deleteDailyStockInfo(id)
  .then(deletedDailyStockInfo => {
    if (!deletedDailyStockInfo[0]) {
        res.sendStatus(404);
        return;
      }
    res.send(deletedDailyStockInfo);
  })
  .catch(err => {
      res.status(500).send(err);
  });
});

router.get('/updateMarketCap/:id', (req, res) => {
  const dateId = req.params.id;

  dailyStockInfo.getDailyStockInfoByDateIdOrderByCompanyId(dateId)
  .then(stockInfo => {
    let stockInfoIds = [];
    console.log(stockInfo.length);

    for (let i = 0; i < stockInfo.length; i += 2) {
      // console.log('i', i);
      if (!stockInfo[i + 1] || (stockInfo[i].dateId == stockInfo[i + 1].dateId && stockInfo[i].companyId != stockInfo[i + 1].companyId)) {
        console.log('something', i, stockInfo[i], stockInfo[i + 1]);
          stockInfo.splice(i, 1);

          i -= 2;
      }


      else {
        stockInfo[i].todayMarketCap = stockInfo[i + 1].todayMarketCap * (1 - stockInfo[i + 1].eodToEodPercentChange)
      }
    }


    // for (let i = 0; i < stockInfo.length; i += 2) {
    //   stockInfoIds[i / 2] = stockInfo[i].dailyStockInfoId;
    // }

    for (let i = 0; i < stockInfo.length; i += 2) {
      dailyStockInfo.updateDailyStockInfoMarketCap(stockInfo[i])
      .then(result => {
        return result;
      })
    }

    // console.log('final product', stockInfo, stockInfoIds);
    console.log('done');

  // dailyStockInfo.updateDailyStockInfoMarketCap(dateId)
  // .then(body => {
  //   res.setHeader('Content-Type', 'application/json')
  //   return res.send(body[0]);
  // })
  // .catch(err => {
  //   res.sendStatus(500);
  // });
})

});

router.get('/addSodMarketCap/:id', (req, res) => {
  const dateId = req.params.id;

  dailyStockInfo.addDailyStockInfoSodMarketCap(dateId)
  .then(body => {
    res.setHeader('Content-Type', 'application/json')
    return res.send(body[0]);
  })
  .catch(err => {
    res.sendStatus(500);
  });
});

module.exports = router;
