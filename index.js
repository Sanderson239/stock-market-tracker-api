'use strict';
const fs = require('fs');
// let fullCompanyData = require ('./new-full-company-data.json');
// let fullCompanyData = require ('./temp-full-company-data18.json');
// let newCompanyData = require ('./new-new-company-data-copy.json');



if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express');
const path = require('path');
const app = express();

app.disable('x-powered-by');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join('public')));


const dates = require('./src/routes/dates');
const companies = require('./src/routes/companies');
const dailyStockInfo = require('./src/routes/daily_stock_info');
const sheetPost = require('./src/routes/sheet_post');
const populateDates = require('./src/routes/populate_dates');
const populateCompanies = require('./src/routes/populate_companies');
const populateDailyStockInfo = require('./src/routes/populate_daily_stock_info');
const testTimer = require('./src/routes/test_timer');
const populateDailyStockInfoShells = require('./src/routes/populate_daily_stock_info_shells');
const newDailyStockInfo = require('./src/routes/new_daily_stock_info');
const picks = require('./src/routes/picks');
const orderFilter = require('./src/routes/order_filters');
const companyData = require('./src/routes/company_data');
const startSheet = require('./src/routes/start_sheet');


//
// let count = 1;
// console.log('something');
// let newNewCompanyData = {date: '2019-07-18', dateId: 5052, dailyStockInfo: 5951573};
// for (let i = 4; i < fullCompanyData.length; i++) {
//   if (newCompanyData[`${fullCompanyData[i].code}`]) {
//     newNewCompanyData[`${fullCompanyData[i].code}`] = {
//       code: fullCompanyData[i].code,
//       name: fullCompanyData[i].name,
//       MarketCapitalization: fullCompanyData[i].MarketCapitalization,
//       open: fullCompanyData[i].open,
//       close: fullCompanyData[i].close,
//       volume: fullCompanyData[i].volume,
//       mostRecentPosition: i,
//       companyId: newCompanyData[`${fullCompanyData[i].code}`].companyId
//     }
//   console.log(count);
//   count++;
//   }
// }
// console.log(fullCompanyData.length);
// console.log(Object.keys(newCompanyData).length);
//
//
// fs.writeFileSync('temp-new-new-company-data-copy.json', JSON.stringify(newNewCompanyData))
//
// console.log('done');


app.use(dates);
app.use(companies);
app.use(dailyStockInfo);
app.use(sheetPost);
app.use(populateDates);
app.use(populateCompanies);
app.use(populateDailyStockInfo);
app.use(testTimer);
app.use(populateDailyStockInfoShells);
app.use(newDailyStockInfo);
app.use(picks);
app.use(orderFilter);
app.use(companyData);
app.use(startSheet);











app.use((req, res) => {
  res.sendStatus(404);
});

// eslint-disable-next-line max-params
app.use((err, _req, res, _next) => {
  if (err.output && err.output.statusCode) {
    return res
      .status(err.output.statusCode)
      .set('Content-Type', 'text/plain')
      .send(err.message);
  }

  // eslint-disable-next-line no-console
  console.error(err.stack);
  res.sendStatus(500);
});


let port = process.env.PORT || 8000;

if (app.get('env') === 'test') { port = 8080; }

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

module.exports = app;
