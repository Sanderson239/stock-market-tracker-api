'use strict';

const bodyParser = require('body-parser');
const express = require('express');
const humps = require('humps');
const fetch = require('node-fetch');

const CompanyData = require('../controllers/company_data.js');

const router = express.Router();

const companyData = new CompanyData();

router.get('/companyData', (req, res) => {
  companyData.getCompanyData()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send(err);
    });
});


module.exports = router;
