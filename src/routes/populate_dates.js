// populating historical dates for database
'use strict';

const bodyParser = require('body-parser');
const express = require('express');
const humps = require('humps');
const fetch = require('node-fetch');
const dowjones = require ('../../dowjones.json');
const sandp = require ('../../sandp.json');
const nasdaq = require ('../../nasdaq.json');
const novemberDates = require ('../../november-dates.json');
let dateId = 5089;


const Dates = require('../controllers/dates.js');

const router = express.Router();

const dates = new Dates();

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
}

function calculatePercentage(first, last) {
  return ((last / first) - 1);
}

function calculateAbsolute(first, last) {
  return (last - first);
}

//
// router.get('/populateDates', (req, res) => {
//   // console.log(JSON.parse(Object.keys(req.body)[0]));
//   let date = '1999-06-19';
//   for (let i = 1; i <= 7306 && date !== '2019-06-20'; i++) {
//     console.log(date);
//     let dateToAdd = {date_id: i, date: date}
//     dates.addDate(dateTosAdd)
//     .then(date => {
//       // res.setHeader('Content-Type', 'application/json')
//       // return res.send(date[0]);
//     })
//     .catch(err => {
//       res.sendStatus(500);
//     });
//     let currentDate = new Date(date);
//     let nextDate = new Date(date);
//     nextDate.setDate(currentDate.getDate() + 2);
//     date = formatDate(nextDate);
//   }
// })



// router.get('/populateDates', (req, res) => {
//   for (let i = 5040; i < dowjones.length; i++) {
//     let dateToAdd = {
//       date_id: i,
//       date: dowjones[i].date,
//       sandp_sod: sandp[i].open,
//       sandp_eod: sandp[i].close,
//       nasdaq_sod: nasdaq[i].open,
//       nasdaq_eod: nasdaq[i].close,
//       dow_jones_sod: dowjones[i].open,
//       dow_jones_eod: dowjones[i].close,
//       sandp_eod_to_eod_percent_change: calculatePercentage(sandp[i - 1].close, sandp[i].close),
//       sandp_eod_to_sod_percent_change: calculatePercentage(sandp[i - 1].close, sandp[i].open),
//       sandp_sod_to_eod_percent_change: calculatePercentage(sandp[i].open, sandp[i].close),
//       sandp_eod_to_eod_absolute_change: calculateAbsolute(sandp[i - 1].close, sandp[i].close),
//       sandp_eod_to_sod_absolute_change: calculateAbsolute(sandp[i - 1].close, sandp[i].open),
//       sandp_sod_to_eod_absolute_change: calculateAbsolute(sandp[i].open, sandp[i].close),
//       nasdaq_eod_to_eod_percent_change: calculatePercentage(nasdaq[i - 1].close, nasdaq[i].close),
//       nasdaq_eod_to_sod_percent_change: calculatePercentage(nasdaq[i - 1].close, nasdaq[i].open),
//       nasdaq_sod_to_eod_percent_change: calculatePercentage(nasdaq[i].open, nasdaq[i].close),
//       nasdaq_eod_to_eod_absolute_change: calculateAbsolute(nasdaq[i - 1].close, nasdaq[i].close),
//       nasdaq_eod_to_sod_absolute_change: calculateAbsolute(nasdaq[i - 1].close, nasdaq[i].open),
//       nasdaq_sod_to_eod_absolute_change: calculateAbsolute(nasdaq[i].open, nasdaq[i].close),
//       dow_jones_eod_to_eod_percent_change: calculatePercentage(dowjones[i - 1].close, dowjones[i].close),
//       dow_jones_eod_to_sod_percent_change: calculatePercentage(dowjones[i - 1].close, dowjones[i].open),
//       dow_jones_sod_to_eod_percent_change: calculatePercentage(dowjones[i].open, dowjones[i].close),
//       dow_jones_eod_to_eod_absolute_change: calculateAbsolute(dowjones[i - 1].close, dowjones[i].close),
//       dow_jones_eod_to_sod_absolute_change: calculateAbsolute(dowjones[i - 1].close, dowjones[i].open),
//       dow_jones_sod_to_eod_absolute_change: calculateAbsolute(dowjones[i].open, dowjones[i].close),
//
//     }
//     // console.log(dateToAdd);
//     // dateId++;
//     dates.addDate(dateToAdd)
//     .then(company => {
//       // res.setHeader('Content-Type', 'application/json')
//       // return res.send(company[0]);
//     })
//     .catch(err => {
//       res.sendStatus(500);
//     });
//   }
// })

router.get('/populateDates', (req, res) => {
  console.log('something');
  for (let i = 0; i < novemberDates.length; i++) {
    let dateToAdd = {
      date_id: dateId,
      date: novemberDates[i].date,
      sandp_sod: 0,
      sandp_eod: 0,
      nasdaq_sod: 0,
      nasdaq_eod: 0,
      dow_jones_sod: 0,
      dow_jones_eod: 0,
      sandp_eod_to_eod_percent_change: 0,
      sandp_eod_to_sod_percent_change: 0,
      sandp_sod_to_eod_percent_change: 0,
      sandp_eod_to_eod_absolute_change: 0,
      sandp_eod_to_sod_absolute_change: 0,
      sandp_sod_to_eod_absolute_change: 0,
      nasdaq_eod_to_eod_percent_change: 0,
      nasdaq_eod_to_sod_percent_change: 0,
      nasdaq_sod_to_eod_percent_change: 0,
      nasdaq_eod_to_eod_absolute_change: 0,
      nasdaq_eod_to_sod_absolute_change: 0,
      nasdaq_sod_to_eod_absolute_change: 0,
      dow_jones_eod_to_eod_percent_change: 0,
      dow_jones_eod_to_sod_percent_change: 0,
      dow_jones_sod_to_eod_percent_change: 0,
      dow_jones_eod_to_eod_absolute_change: 0,
      dow_jones_eod_to_sod_absolute_change: 0,
      dow_jones_sod_to_eod_absolute_change: 0,

    }
    // console.log(dateToAdd);
    dateId++;
    console.log('date to add', dateToAdd);
    dates.addDate(dateToAdd)
    .then(company => {
      // res.setHeader('Content-Type', 'application/json')
      // return res.send(company[0]);
    })
    .catch(err => {
      res.sendStatus(500);
    });
  }
})
//
// router.get('/populateDates', (req, res) => {
//   for (let i = 1; i < 2; i++) {
//     let dateToAdd = {
//       date: '2019-06-21',
//       sandp_sod: 2952.71,
//       sandp_eod: 2950.46,
//       nasdaq_sod: 8028.69,
//       nasdaq_eod: 8031.71,
//       dow_jones_sod: 26749.10,
//       dow_jones_eod: 26719.13,
//       sandp_eod_to_eod_percent_change: calculatePercentage(2954.18, 2950.46),
//       sandp_eod_to_sod_percent_change: calculatePercentage(2954.18, 2952.71),
//       sandp_sod_to_eod_percent_change: calculatePercentage(2952.71, 2950.46),
//       sandp_eod_to_eod_absolute_change: calculateAbsolute(2954.18, 2950.46),
//       sandp_eod_to_sod_absolute_change: calculateAbsolute(2954.18, 2952.71),
//       sandp_sod_to_eod_absolute_change: calculateAbsolute(2952.71, 2950.46),
//       nasdaq_eod_to_eod_percent_change: calculatePercentage(8051.34, 8031.71),
//       nasdaq_eod_to_sod_percent_change: calculatePercentage(8051.34, 8028.69),
//       nasdaq_sod_to_eod_percent_change: calculatePercentage(8028.69, 8031.71),
//       nasdaq_eod_to_eod_absolute_change: calculateAbsolute(8051.34, 8031.71),
//       nasdaq_eod_to_sod_absolute_change: calculateAbsolute(8051.34, 8028.69),
//       nasdaq_sod_to_eod_absolute_change: calculateAbsolute(8028.69, 8031.71),
//       dow_jones_eod_to_eod_percent_change: calculatePercentage(26753.17, 26719.13),
//       dow_jones_eod_to_sod_percent_change: calculatePercentage(26753.17, 26749.10),
//       dow_jones_sod_to_eod_percent_change: calculatePercentage(26749.10, 26719.13),
//       dow_jones_eod_to_eod_absolute_change: calculateAbsolute(26753.17, 26719.13),
//       dow_jones_eod_to_sod_absolute_change: calculateAbsolute(26753.17, 26749.10),
//       dow_jones_sod_to_eod_absolute_change: calculateAbsolute(26749.10, 26719.13),
//
//     }
//
//     dates.addDate(dateToAdd)
//     .then(company => {
//       // res.setHeader('Content-Type', 'application/json')
//       // return res.send(company[0]);
//     })
//     .catch(err => {
//       res.sendStatus(500);
//     });
//   }
// })



module.exports = router;
