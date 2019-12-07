'use strict';
const keys = require ('../../keys.json')
const {google} = require('googleapis');
var sheets = google.sheets('v4');

const client = new google.auth.JWT(
  keys.client_email,
  null,
  keys.private_key,
  ['https://www.googleapis.com/auth/spreadsheets']

);

const bodyParser = require('body-parser');
const express = require('express');
const humps = require('humps');
const fetch = require('node-fetch');

const Date = require('../controllers/dates.js');

const router = express.Router();

const dates = new Date();

// temporarily using negative date ids for sample data
router.post('/sheetPost/', (req, res) => {
  const quantity = JSON.parse(Object.keys(req.body)[0]).quantity
  console.log(quantity);
  client.authorize(function(err,tokens){


  if (err) {
    console.log(err);
    return
  } else {
    gsrun(client)
  }
  });

  async function gsrun(cl){
  const gsapi = google.sheets({version: 'v4', auth: cl, })

  for (let i = 1; i <= quantity; i++) {
    dates.getDateById(i)
    .then(date => {
      if (!date || date.length === 0) {
         res.sendStatus(404);
         return;
      }

      let updateOptions = {
        spreadsheetId: '1rUzDp40kj7ub2kLwS-QTvCuupei1A1hEeqE-wFF9oGs',
        range: 'testing!A' + i,
        valueInputOption: 'USER_ENTERED',
        resource: { values: [[date.date]]}
      };

      gsapi.spreadsheets.values.update(updateOptions)
    })
    .catch(err => {
      res.status(500).send(err);
    });
  }
}


});





module.exports = router;
