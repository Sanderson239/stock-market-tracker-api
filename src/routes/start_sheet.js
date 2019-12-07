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


const router = express.Router();

async function gsrun(cl, group_id, sheetPosition, essentialsObj, orderFilterObj, group_id_2){
  console.log('working');

  console.log('second data i need');
  console.log('group_id', group_id);
  console.log('sheetPosition', sheetPosition);
  console.log('essentials', essentialsObj);
  console.log('order filters', orderFilterObj);

  let essentialsKeys = Object.keys(essentialsObj);
  let essentials = [];
  for (let i = 0; i < essentialsKeys.length; i++) {
    essentials[i] = essentialsObj[`${essentialsKeys[i]}`];
  }

  let orderFilterKeys = Object.keys(orderFilterObj);
  let orderFilter = [];
  for (let i = 0; i < orderFilterKeys.length; i++) {
    orderFilter[i] = orderFilterObj[`${orderFilterKeys[i]}`];
  }

  console.log('third data i need');
  console.log('group_id', group_id);
  console.log('sheetPosition', sheetPosition);
  console.log('essentials', essentials);
  console.log('order filters', orderFilter);

  const gsapi = google.sheets({version: 'v4', auth: cl, })

  let rowOptions = {
  spreadsheetId: '1rUzDp40kj7ub2kLwS-QTvCuupei1A1hEeqE-wFF9oGs',
  range: `sheet${group_id}!A1`,
  valueInputOption: 'USER_ENTERED',
  resource: { values: [[`${group_id}`]]}
};

  gsapi.spreadsheets.values.update(rowOptions)

  rowOptions = {
  spreadsheetId: '1rUzDp40kj7ub2kLwS-QTvCuupei1A1hEeqE-wFF9oGs',
  range: `sheet${group_id}!A${sheetPosition}`,
  valueInputOption: 'USER_ENTERED',
  resource: { values: [[`${group_id_2}`]]}
};

  gsapi.spreadsheets.values.update(rowOptions)

  sheetPosition++;


  for (let i = 0; i < essentials.length; i++) {

    let chr = String.fromCharCode(65);


    rowOptions = {
    spreadsheetId: '1rUzDp40kj7ub2kLwS-QTvCuupei1A1hEeqE-wFF9oGs',
    range: `sheet${group_id}!A${sheetPosition}`,
    valueInputOption: 'USER_ENTERED',
    resource: { values: [[`${essentials[i]}`]]}
  };

    gsapi.spreadsheets.values.update(rowOptions)

    sheetPosition++;
    // finalSheetPosition++;
  }

  sheetPosition++;
  // finalSheetPosition++;

  rowOptions = {
  spreadsheetId: '1rUzDp40kj7ub2kLwS-QTvCuupei1A1hEeqE-wFF9oGs',
  range: `sheet${group_id}!A${sheetPosition}`,
  valueInputOption: 'USER_ENTERED',
  resource: { values: [[`order filters`]]}
};

  gsapi.spreadsheets.values.update(rowOptions)

  sheetPosition++;



  for ( let i = 0; i < orderFilter.length; i++) {

    let chr = String.fromCharCode(65);


    rowOptions = {
    spreadsheetId: '1rUzDp40kj7ub2kLwS-QTvCuupei1A1hEeqE-wFF9oGs',
    range: `sheet${group_id}!${chr}${sheetPosition}`,
    valueInputOption: 'USER_ENTERED',
    resource: { values: [[`${orderFilter[i].name}`]]}
  };

    gsapi.spreadsheets.values.update(rowOptions)

    // sheetPosition+= 2;
    chr = String.fromCharCode(65 + 2);
    // finalSheetPosition+= 2;


    rowOptions = {
    spreadsheetId: '1rUzDp40kj7ub2kLwS-QTvCuupei1A1hEeqE-wFF9oGs',
    range: `sheet${group_id}!${chr}${sheetPosition}`,
    valueInputOption: 'USER_ENTERED',
    resource: { values: [[`${orderFilter[i].symbol}     ${orderFilter[i].number}`]]}
  };

    gsapi.spreadsheets.values.update(rowOptions)

    // sheetPosition++;
    // chr = String.fromCharCode(65 + 3);
    // finalSheetPosition++;


  //   rowOptions = {
  //   spreadsheetId: '1rUzDp40kj7ub2kLwS-QTvCuupei1A1hEeqE-wFF9oGs',
  //   range: `sheet${group_id}!${chr}${sheetPosition}`,
  //   valueInputOption: 'USER_ENTERED',
  //   resource: { values: [[`${orderFilter[i].number}`]]}
  // };
  //
  //   gsapi.spreadsheets.values.update(rowOptions)

    sheetPosition++;
    // finalSheetPosition+= 2;

  }
  console.log('final sheet position', sheetPosition);



}


// temporarily using negative date ids for sample data
router.post('/startSheet/', (req, res) => {

  const body = JSON.parse(Object.keys(req.body));
  let finalSheetPosition = body.sheet_position;

  console.log('body', body);
  console.log('first data i need');
  console.log('group_id', body.group_id);
  console.log('sheetPosition', body.sheet_position);
  console.log('essentials', body.essentials);
  console.log('order filters', body.order_filters);

  client.authorize(function(err,tokens){


  if (err) {
    console.log(err);
    return
  } else {
    gsrun(client, body.group_id, body.sheet_position, body.essentials, body.order_filters, body.group_id_2)
    res.send(200);
  }
  });



});





module.exports = router;
