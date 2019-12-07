'use strict';

const bodyParser = require('body-parser');
const express = require('express');
const humps = require('humps');
const fetch = require('node-fetch');

const SelectFilter = require('../controllers/selectFilters.js');

const router = express.Router();

const selectFilters = new SelectFilter();

router.get('/selectFilters', (req, res) => {
  selectFilters.getSelectFilter()
    .then(selectFilter => {
      res.send(selectFilter);
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

router.get('/selectFilters/:id', (req, res) => {
  const id = req.params.id;
  selectFilters.getSelectFilterById(id)
    .then(selectFilter => {
      if (!selectFilter || selectFilter.length === 0) {
         res.sendStatus(404);
         return;
      }
      res.send(selectFilter);
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

router.post('/selectFilters', (req, res) => {
  const selectFilter = JSON.parse(Object.keys(req.body)[0]);
  selectFilters.addSelectFilter(selectFilter)
  .then(selectFilter => {
    res.setHeader('Content-Type', 'application/json')
    return res.send(selectFilter[0]);
  })
  .catch(err => {
    res.sendStatus(500);
  });
})

router.post('/selectFilters/:id', (req, res) => {
  const selectFilter = req.body;

  selectFilters.upselectFilterSelectFilter(selectFilter)
  .then(selectFilter => {
    res.setHeader('Content-Type', 'application/json')
    return res.send(selectFilter[0]);
  })
  .catch(err => {
    res.sendStatus(500);
  });
})

router.delete('/selectFilters/:id', (req, res) => {
  const id = req.params.id;

  if (isNaN(id)) {
    return res.sendStatus(404);
  }

  selectFilters.deleteSelectFilter(id)
  .then(deletedSelectFilter => {
    if (!deletedSelectFilter[0]) {
        res.sendStatus(404);
        return;
      }
    res.send(deletedSelectFilter);
  })
  .catch(err => {
      res.status(500).send(err);
  });
});

module.exports = router;
