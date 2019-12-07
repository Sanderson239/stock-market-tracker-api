'use strict';

const bodyParser = require('body-parser');
const express = require('express');
const humps = require('humps');
const fetch = require('node-fetch');

const Company = require('../controllers/companies.js');

const router = express.Router();

const companies = new Company();

router.get('/companies', (req, res) => {
  companies.getCompany()
    .then(company => {
      res.send(company);
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

router.get('/companies/:id', (req, res) => {
  const id = req.params.id;
  companies.getCompanyById(id)
    .then(company => {
      if (!company || company.length === 0) {
         res.sendStatus(404);
         return;
      }
      res.send(company);
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

router.post('/companies', (req, res) => {
  const company = JSON.parse(Object.keys(req.body)[0]);
  companies.addCompany(company)
  .then(company => {
    res.setHeader('Content-Type', 'application/json')
    return res.send(company[0]);
  })
  .catch(err => {
    res.sendStatus(500);
  });
})

router.post('/companies/:id', (req, res) => {
  const company = req.body;

  companies.updateCompany(company)
  .then(company => {
    res.setHeader('Content-Type', 'application/json')
    return res.send(company[0]);
  })
  .catch(err => {
    res.sendStatus(500);
  });
})

router.delete('/companies/:id', (req, res) => {
  const id = req.params.id;

  if (isNaN(id)) {
    return res.sendStatus(404);
  }

  companies.deleteCompany(id)
  .then(deletedComp => {
    if (!deletedComp[0]) {
        res.sendStatus(404);
        return;
      }
    res.send(deletedComp);
  })
  .catch(err => {
      res.status(500).send(err);
  });
});

module.exports = router;
