'use strict';

const bodyParser = require('body-parser');
const express = require('express');
const humps = require('humps');
const fetch = require('node-fetch');

const Date = require('../controllers/dates.js');

const router = express.Router();

const dates = new Date();

router.get('/dates', (req, res) => {
  dates.getDate()
    .then(date => {
      res.send(date);
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

router.get('/dates/:id', (req, res) => {
  const id = req.params.id;
  dates.getDateById(id)
    .then(date => {
      if (!date || date.length === 0) {
         res.sendStatus(404);
         return;
      }
      res.send(date);
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

router.post('/dates', (req, res) => {
  // console.log(JSON.parse(Object.keys(req.body)[0]));
  const date = JSON.parse(Object.keys(req.body)[0]);
  // console.log(date);
  dates.addDate(date)
  .then(date => {
    res.setHeader('Content-Type', 'application/json')
    return res.send(date[0]);
  })
  .catch(err => {
    res.sendStatus(500);
  });
})

router.post('/dates/:id', (req, res) => {
  const date = req.body;

  dates.updateDate(date)
  .then(date => {
    res.setHeader('Content-Type', 'application/json')
    return res.send(date[0]);
  })
  .catch(err => {
    res.sendStatus(500);
  });
})

router.delete('/dates/:id', (req, res) => {
  const id = req.params.id;

  if (isNaN(id)) {
    return res.sendStatus(404);
  }

  dates.deleteDate(id)
  .then(deletedDate => {
    if (!deletedDate[0]) {
        res.sendStatus(404);
        return;
      }
    res.send(deletedDate);
  })
  .catch(err => {
      res.status(500).send(err);
  });
});

module.exports = router;
