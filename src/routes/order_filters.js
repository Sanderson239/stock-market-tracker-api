'use strict';

const bodyParser = require('body-parser');
const express = require('express');
const humps = require('humps');
const fetch = require('node-fetch');

const OrderFilter = require('../controllers/order_filters.js');

const router = express.Router();

const orderFilters = new OrderFilter();

router.get('/orderFilters', (req, res) => {
  orderFilters.getOrderFilter()
    .then(orderFilter => {
      res.send(orderFilter);
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

router.get('/orderFilters/:id', (req, res) => {
  const id = req.params.id;
  orderFilters.getOrderFilterById(id)
    .then(orderFilter => {
      if (!orderFilter || orderFilter.length === 0) {
         res.sendStatus(404);
         return;
      }
      res.send(orderFilter);
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

router.post('/orderFilters', (req, res) => {
  const orderFilter = JSON.parse(Object.keys(req.body)[0]);
  orderFilters.addOrderFilter(orderFilter)
  .then(orderFilter => {
    res.setHeader('Content-Type', 'application/json')
    return res.send(orderFilter[0]);
  })
  .catch(err => {
    res.sendStatus(500);
  });
})

router.post('/orderFilters/:id', (req, res) => {
  const orderFilter = req.body;

  orderFilters.uporderFilterOrderFilter(orderFilter)
  .then(orderFilter => {
    res.setHeader('Content-Type', 'application/json')
    return res.send(orderFilter[0]);
  })
  .catch(err => {
    res.sendStatus(500);
  });
})

router.delete('/orderFilters/:id', (req, res) => {
  const id = req.params.id;

  if (isNaN(id)) {
    return res.sendStatus(404);
  }

  orderFilters.deleteOrderFilter(id)
  .then(deletedOrderFilter => {
    if (!deletedOrderFilter[0]) {
        res.sendStatus(404);
        return;
      }
    res.send(deletedOrderFilter);
  })
  .catch(err => {
      res.status(500).send(err);
  });
});

module.exports = router;
