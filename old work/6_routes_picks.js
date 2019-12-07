'use strict';
const keys = require ('../../keys.json')
const {google} = require('googleapis');
var sheets = google.sheets('v4');
const sheetIds = [56540087, 343683161, 465428788, 456402205, 184590581]

const client = new google.auth.JWT(
  keys.client_email,
  null,
  keys.private_key,
  ['https://www.googleapis.com/auth/spreadsheets']

);

let datesInfo = require ('../../dates-copy-2.json')

const fs = require('fs');
const bodyParser = require('body-parser');
const express = require('express');
const humps = require('humps');
const fetch = require('node-fetch');
const Bluebird = require("bluebird");

const Picks = require('../controllers/picks.js');
const Date = require('../controllers/dates.js');
const Company = require('../controllers/companies.js');
const DailyStockInfo = require('../controllers/daily_stock_info.js');
const OrderFilters = require('../controllers/order_filters.js');
const SelectFilter = require('../controllers/select_filters.js');
const CompanyData = require('../controllers/company_data.js');
const Labels = require('../controllers/labels.js');




const picks = new Picks();
const dates = new Date();
const companies = new Company();
const dailyStockInfo = new DailyStockInfo();
const orderFilters = new OrderFilters();
const selectFilters = new SelectFilter();
const companyDataClass = new CompanyData();
const labels = new Labels();



const router = express.Router();

// async function gsrun4(cl){
//   // let total = 100;
//   // let sandpTotal = 100;
//   // let nasdaqTotal = 100;
//   // let dowJonesTotal = 100;
//
//   const gsapi = google.sheets({version: 'v4', auth: cl, })
//
//   let batchUpdateRequest = {
//   requests: [
//     {
//       addChart: {
//         chart: {
//           spec: {
//             title: "Model Q1 Sales",
//             basicChart: {
//               chartType: "COLUMN",
//               legendPosition: "BOTTOM_LEGEND",
//               axis: [
//                 {
//                   position: "BOTTOM_AXIS",
//                   title: "Model Numbers"
//                 },
//                 {
//                   position: "LEFT_AXIS",
//                   title: "Sales"
//                 }
//               ],
//               domains: [
//                 {
//                   domain: {
//                     sourceRange: {
//                       sources: [
//                         {
//                           sheetId: 507584223,
//                           startRowIndex: 99,
//                           endRowIndex: 100,
//                           startColumnIndex: 0,
//                           endColumnIndex: 2
//                         }
//                       ]
//                     }
//                   }
//                 }
//               ],
//               series: [
//                 {
//                   series: {
//                     sourceRange: {
//                       sources: [
//                         {
//                           sheetId: 507584223,
//                           startRowIndex: 99,
//                           endRowIndex: 100,
//                           startColumnIndex: 0,
//                           endColumnIndex: 2
//                         }
//                       ]
//                     }
//                   },
//                   targetAxis: "LEFT_AXIS"
//                 }
//               ],
//               headerCount: 1
//             }
//           },
//           position: {
//             overlayPosition: {
//               anchorCell: {
//                 // this is the id for Sheet3
//                 sheetId: 465428788,
//                 rowIndex: 2,
//                 columnIndex: 2
//               },
//               offsetXPixels: 50,
//               offsetYPixels: 50
//             }
//           }
//         }
//       }
//     }
//   ]
// }
//
//   let rowOptions = {
//     spreadsheetId: '1rUzDp40kj7ub2kLwS-QTvCuupei1A1hEeqE-wFF9oGs',
//     // range: `sheet4!A4`,
//     // valueInputOption: 'USER_ENTERED',
//     resource: batchUpdateRequest,
//   };
//
//   gsapi.spreadsheets.batchUpdate(rowOptions)
//
// }

async function gsrun4(cl, sheetPage, lastSpace){
  console.log('sheetpage', sheetPage);
  // let total = 100;
  // let sandpTotal = 100;
  // let nasdaqTotal = 100;
  // let dowJonesTotal = 100;

  const gsapi = google.sheets({version: 'v4', auth: cl, })

//   let batchUpdateRequest = {
//   requests: [
//     {
//       addChart: {
//         chart: {
//           spec: {
//             title: "Model Q1 Sales",
//             basicChart: {
//               chartType: "LINE",
//               legendPosition: "BOTTOM_LEGEND",
//               axis: [
//                 {
//                   position: "BOTTOM_AXIS",
//                   title: "Model Numbers"
//                 },
//                 {
//                   position: "LEFT_AXIS",
//                   title: "Sales"
//                 }
//               ],
//               domains: [
//                 {
//                   domain: {
//                     sourceRange: {
//                       sources: [
//                         {
//                           sheetId: sheetIds[sheetPage],
//                           startRowIndex: 99,
//                           endRowIndex: 100,
//                           startColumnIndex: 0,
//                           endColumnIndex: 0
//                         }
//                       ]
//                     }
//                   }
//                 }
//               ],
//               series: [
//                 {
//                   series: {
//                     sourceRange: {
//                       sources: [
//                         {
//                           sheetId: sheetIds[sheetPage],
//                           startRowIndex: 99,
//                           endRowIndex: 100,
//                           startColumnIndex: 0,
//                           endColumnIndex: 4
//                         }
//                       ]
//                     }
//                   },
//                   targetAxis: "LEFT_AXIS"
//                 }
//               ],
//               headerCount: 1
//             }
//           },
//           position: {
//             overlayPosition: {
//               anchorCell: {
//                 // this is the id for Sheet3
//                 sheetId: sheetIds[sheetPage],
//                 rowIndex: 3,
//                 columnIndex: 3
//               },
//               offsetXPixels: 50,
//               offsetYPixels: 50
//             }
//           }
//         }
//       }
//     }
//   ]
// }

//look into Time Line chart type
let batchUpdateRequest = {
requests: [
  {
    addChart: {
      chart: {
        spec: {
          title: "Model Q1 Sales",
          basicChart: {
            chartType: "LINE",
            legendPosition: "BOTTOM_LEGEND",
            axis: [
              {
                position: "BOTTOM_AXIS",
                title: "Model Numbers"
              },
              {
                position: "LEFT_AXIS",
                title: "Sales"
              }
            ],
            domains: [
              {
                domain: {
                  sourceRange: {
                    sources: [
                      {
                        sheetId: sheetIds[sheetPage],
                        startRowIndex: 101,
                        endRowIndex: 102,
                        startColumnIndex: 0,
                        endColumnIndex: 0
                      }
                    ]
                  }
                }
              }
            ],
            series: [
              {
                series: {
                  sourceRange: {
                    sources: [
                      {
                        sheetId: sheetIds[sheetPage],
                        startRowIndex: 101,
                        endRowIndex: 102,
                        startColumnIndex: 0,
                        endColumnIndex: 2
                      }
                    ]
                  }
                },
                targetAxis: "LEFT_AXIS"
              }
            ],
            headerCount: 1
          }
        },
        position: {
          overlayPosition: {
            anchorCell: {
              // this is the id for Sheet3
              sheetId: sheetIds[sheetPage],
              rowIndex: 3,
              columnIndex: 3
            },
            offsetXPixels: 50,
            offsetYPixels: 50
          }
        }
      }
    }
  }
]
}

  let rowOptions = {
    spreadsheetId: '1rUzDp40kj7ub2kLwS-QTvCuupei1A1hEeqE-wFF9oGs',
    // range: `sheet4!A4`,
    // valueInputOption: 'USER_ENTERED',
    resource: batchUpdateRequest,
  };

  // gsapi.spreadsheets.batchUpdate(rowOptions)

}

async function gsrun(cl, picks, dailyInfo){
  let total = 100;
  let sandpTotal = 100;
  let nasdaqTotal = 100;
  let dowJonesTotal = 100;

  const gsapi = google.sheets({version: 'v4', auth: cl, })

  let rowOptions = {
    spreadsheetId: '1rUzDp40kj7ub2kLwS-QTvCuupei1A1hEeqE-wFF9oGs',
    range: `sheet3!${String.fromCharCode(65)}` + 4,
    valueInputOption: 'USER_ENTERED',
    resource: { values: [['SANDP']]}
  };
  gsapi.spreadsheets.values.update(rowOptions)

  rowOptions = {
    spreadsheetId: '1rUzDp40kj7ub2kLwS-QTvCuupei1A1hEeqE-wFF9oGs',
    range: `sheet3!${String.fromCharCode(65)}` + 5,
    valueInputOption: 'USER_ENTERED',
    resource: { values: [['NASDAQ']]}
  };
  gsapi.spreadsheets.values.update(rowOptions)

  rowOptions = {
    spreadsheetId: '1rUzDp40kj7ub2kLwS-QTvCuupei1A1hEeqE-wFF9oGs',
    range: `sheet3!${String.fromCharCode(65)}` + 6,
    valueInputOption: 'USER_ENTERED',
    resource: { values: [['DowJones']]}
  };
  gsapi.spreadsheets.values.update(rowOptions)

  for (let i = 1; i <= picks.length + 1; i++) {
    // if (i == 0) {
    //   total = pick[i].dayChangeAvgPercentage;
    // }


    let chr = String.fromCharCode(65 + i);

    if (i == picks.length + 1) {
      let updateOptions = {
        spreadsheetId: '1rUzDp40kj7ub2kLwS-QTvCuupei1A1hEeqE-wFF9oGs',
        range: `sheet3!${chr}` + 1,
        valueInputOption: 'USER_ENTERED',
        resource: { values: [['TOTAL']]}
      };
      gsapi.spreadsheets.values.update(updateOptions)


      updateOptions = {
        spreadsheetId: '1rUzDp40kj7ub2kLwS-QTvCuupei1A1hEeqE-wFF9oGs',
        range: `sheet3!${chr}` + 2,
        valueInputOption: 'USER_ENTERED',
        resource: { values: [[`${total}`]]}
      };
      gsapi.spreadsheets.values.update(updateOptions)

      updateOptions = {
        spreadsheetId: '1rUzDp40kj7ub2kLwS-QTvCuupei1A1hEeqE-wFF9oGs',
        range: `sheet3!${chr}` + 4,
        valueInputOption: 'USER_ENTERED',
        resource: { values: [[`${sandpTotal}`]]}
      };
      gsapi.spreadsheets.values.update(updateOptions)

      updateOptions = {
        spreadsheetId: '1rUzDp40kj7ub2kLwS-QTvCuupei1A1hEeqE-wFF9oGs',
        range: `sheet3!${chr}` + 5,
        valueInputOption: 'USER_ENTERED',
        resource: { values: [[`${nasdaqTotal}`]]}
      };
      gsapi.spreadsheets.values.update(updateOptions)

      updateOptions = {
        spreadsheetId: '1rUzDp40kj7ub2kLwS-QTvCuupei1A1hEeqE-wFF9oGs',
        range: `sheet3!${chr}` + 6,
        valueInputOption: 'USER_ENTERED',
        resource: { values: [[`${dowJonesTotal}`]]}
      };
      gsapi.spreadsheets.values.update(updateOptions)

    }


    else {
      total *= (1 + (picks[i - 1].dayChangeAvgPercentage / 100));
      sandpTotal *= (1 + (dailyInfo[i - 1].sandpEodToEodPercentChange));
      nasdaqTotal *= (1 + (dailyInfo[i - 1].nasdaqEodToEodPercentChange));
      dowJonesTotal *= (1 + (dailyInfo[i - 1].dowJonesEodToEodPercentChange));


      let updateOptions = {
        spreadsheetId: '1rUzDp40kj7ub2kLwS-QTvCuupei1A1hEeqE-wFF9oGs',
        range: `sheet3!${chr}` + 1,
        valueInputOption: 'USER_ENTERED',
        resource: { values: [[picks[i - 1].dateId]]}
      };

      gsapi.spreadsheets.values.update(updateOptions)

      updateOptions = {
        spreadsheetId: '1rUzDp40kj7ub2kLwS-QTvCuupei1A1hEeqE-wFF9oGs',
        range: `sheet3!${chr}` + 2,
        valueInputOption: 'USER_ENTERED',
        resource: { values: [[picks[i - 1].dayChangeAvgPercentage]]}
      };

      gsapi.spreadsheets.values.update(updateOptions)

      updateOptions = {
        spreadsheetId: '1rUzDp40kj7ub2kLwS-QTvCuupei1A1hEeqE-wFF9oGs',
        range: `sheet3!${chr}` + 4,
        valueInputOption: 'USER_ENTERED',
        resource: { values: [[dailyInfo[i - 1].sandpEodToEodPercentChange * 100]]}
      };

      gsapi.spreadsheets.values.update(updateOptions)

      updateOptions = {
        spreadsheetId: '1rUzDp40kj7ub2kLwS-QTvCuupei1A1hEeqE-wFF9oGs',
        range: `sheet3!${chr}` + 5,
        valueInputOption: 'USER_ENTERED',
        resource: { values: [[dailyInfo[i - 1].nasdaqEodToEodPercentChange * 100]]}
      };

      gsapi.spreadsheets.values.update(updateOptions)

      updateOptions = {
        spreadsheetId: '1rUzDp40kj7ub2kLwS-QTvCuupei1A1hEeqE-wFF9oGs',
        range: `sheet3!${chr}` + 6,
        valueInputOption: 'USER_ENTERED',
        resource: { values: [[dailyInfo[i - 1].dowJonesEodToEodPercentChange * 100]]}
      };

      gsapi.spreadsheets.values.update(updateOptions)
    }
    // .catch(err => {
    //   // res.status(500).send(err);
    // });
  }
}

async function gsrun2(cl, samples, dailyInfo, sheetPage){
  for (let j = 0; j < samples.length; j++) {
    sheetPage ++;

    // console.log('samples', samples);
    let picks = samples[j];


  let total = 100;
  let values = []

  for (let i = 0; i < 4; i ++) {
    values.push([]);
  }

  for (let i = 0; i <= picks.length; i++) {
    values[3].push('');
  }

  values[0] = [`${picks[0].groupId}`];

  let finalRowOptions = {
    spreadsheetId: '1rUzDp40kj7ub2kLwS-QTvCuupei1A1hEeqE-wFF9oGs',
    range: `sheet${picks[0].groupId}!${String.fromCharCode(65)}` + 1,
    valueInputOption: 'USER_ENTERED',
    resource: { values: [[`${picks[0].groupId}`]]}
  };
  // console.log('gsrun picks', picks);
  // console.log('gsrun sheetPage', sheetPage);
  // let sandpTotal = 100;
  // let nasdaqTotal = 100;
  // let dowJonesTotal = 100;
  // stopped here last night

  const gsapi = google.sheets({version: 'v4', auth: cl, })

  let rowOptions = {
    spreadsheetId: '1rUzDp40kj7ub2kLwS-QTvCuupei1A1hEeqE-wFF9oGs',
    range: `sheet${picks[0].groupId}!${String.fromCharCode(65)}` + 1,
    valueInputOption: 'USER_ENTERED',
    resource: { values: [[`${picks[0].groupId}`]]}
  };
  // gsapi.spreadsheets.values.update(rowOptions)

  //can use this as model
  // let rowOptions = {
  //   spreadsheetId: '1rUzDp40kj7ub2kLwS-QTvCuupei1A1hEeqE-wFF9oGs',
  //   range: `sheet1!A1`,
  //   valueInputOption: 'USER_ENTERED',
  //   resource: { values: [[4, 5,'',9], [6, 7]]}
  // };
  // gsapi.spreadsheets.values.update(rowOptions)

  // rowOptions = {
  //   spreadsheetId: '1rUzDp40kj7ub2kLwS-QTvCuupei1A1hEeqE-wFF9oGs',
  //   range: `sheet${picks[0].groupId}!${String.fromCharCode(65)}` + 1,
  //   // valueInputOption: 'USER_ENTERED',
  //   resource: {
  //     valueInputOption: 'USER_ENTERED',
  //     data: [{
  //       range: `sheet1!A1:A15`,
  //       majorDimension: 'COLUMNS',
  //       values: [[1,2,3,4,5]]
  //     }]
  //   }
  // };

  // rowOptions = {
  //   spreadsheetId: '1rUzDp40kj7ub2kLwS-QTvCuupei1A1hEeqE-wFF9oGs',
  //   range: `sheet1!A1`,
  //   // majorDimension: 'COLUMNS',
  //   valueInputOption: 'USER_ENTERED',
  //   resource: { values: [['1']]}
  // };
  //   gsapi.spreadsheets.batchUpdate(rowOptions)

  // rowOptions = {
  //   spreadsheetId: '1rUzDp40kj7ub2kLwS-QTvCuupei1A1hEeqE-wFF9oGs',
  //   range: `sheet${picks[0].groupId}!A100`,
  //   valueInputOption: 'USER_ENTERED',
  //   resource: { values: [[100]]}
  // };
  // gsapi.spreadsheets.values.update(rowOptions)

  // rowOptions = {
  //   spreadsheetId: '1rUzDp40kj7ub2kLwS-QTvCuupei1A1hEeqE-wFF9oGs',
  //   range: `sheet${picks[0].groupId}!${String.fromCharCode(65)}` + 5,
  //   valueInputOption: 'USER_ENTERED',
  //   resource: { values: [['NASDAQ']]}
  // };
  // gsapi.spreadsheets.values.update(rowOptions)

  // rowOptions = {
  //   spreadsheetId: '1rUzDp40kj7ub2kLwS-QTvCuupei1A1hEeqE-wFF9oGs',
  //   range: `sheet${picks[0].groupId}!${String.fromCharCode(65)}` + 6,
  //   valueInputOption: 'USER_ENTERED',
  //   resource: { values: [['DowJones']]}
  // };
  // gsapi.spreadsheets.values.update(rowOptions)

  for (let i = 1; i <= picks.length + 1; i++) {
    // if (i == 0) {
    //   total = pick[i].dayChangeAvgPercentage;
    // }


    let chr = String.fromCharCode(65 + i);

    if (i == picks.length + 1) {
      let updateOptions = {
        spreadsheetId: '1rUzDp40kj7ub2kLwS-QTvCuupei1A1hEeqE-wFF9oGs',
        range: `sheet${picks[0].groupId}!${chr}` + 3,
        valueInputOption: 'USER_ENTERED',
        resource: { values: [['TOTAL']]}
      };

      // console.log('values', values);
      // console.log('i', i);
      // values[2] = [];
      values[2][i] = 'TOTAL';
      values[3][i] = total - 100;
      // console.log('values2', values);

      // gsapi.spreadsheets.values.update(updateOptions)


      updateOptions = {
        spreadsheetId: '1rUzDp40kj7ub2kLwS-QTvCuupei1A1hEeqE-wFF9oGs',
        range: `sheet${picks[0].groupId}!${chr}` + 4,
        valueInputOption: 'USER_ENTERED',
        resource: { values: [[`${total - 100}`]]}
      };

      // console.log('gsrun total', total - 100);
      // gsapi.spreadsheets.values.update(updateOptions)

      // client.authorize(function(err,tokens){
      // // sheetPage ++;
      //
      // // console.log('samples', samples);
      //
      //
      //   if (err) {
      //     console.log(err);
      //     return
      //   } else {
      //     gsrun4(client, sheetPage, i)
      //   }
      // });

      // updateOptions = {
      //   spreadsheetId: '1rUzDp40kj7ub2kLwS-QTvCuupei1A1hEeqE-wFF9oGs',
      //   range: `sheet${sheetPage}!${chr}` + 4,
      //   valueInputOption: 'USER_ENTERED',
      //   resource: { values: [[`${sandpTotal}`]]}
      // };
      // gsapi.spreadsheets.values.update(updateOptions)
      //
      // updateOptions = {
      //   spreadsheetId: '1rUzDp40kj7ub2kLwS-QTvCuupei1A1hEeqE-wFF9oGs',
      //   range: `sheet${sheetPage}!${chr}` + 5,
      //   valueInputOption: 'USER_ENTERED',
      //   resource: { values: [[`${nasdaqTotal}`]]}
      // };
      // gsapi.spreadsheets.values.update(updateOptions)
      //
      // updateOptions = {
      //   spreadsheetId: '1rUzDp40kj7ub2kLwS-QTvCuupei1A1hEeqE-wFF9oGs',
      //   range: `sheet${sheetPage}!${chr}` + 6,
      //   valueInputOption: 'USER_ENTERED',
      //   resource: { values: [[`${dowJonesTotal}`]]}
      // };
      // gsapi.spreadsheets.values.update(updateOptions)

    }


    else {
      total *= (1 + (picks[i - 1].dayChangeAvgPercentage / 100));
      // sandpTotal *= (1 + (dailyInfo[i - 1].sandpEodToEodPercentChange));
      // nasdaqTotal *= (1 + (dailyInfo[i - 1].nasdaqEodToEodPercentChange));
      // dowJonesTotal *= (1 + (dailyInfo[i - 1].dowJonesEodToEodPercentChange));


      let updateOptions = {
        spreadsheetId: '1rUzDp40kj7ub2kLwS-QTvCuupei1A1hEeqE-wFF9oGs',
        range: `sheet${picks[0].groupId}!${chr}` + 3,
        valueInputOption: 'USER_ENTERED',
        resource: { values: [[picks[i - 1].dateId]]}
      };

      values[2][i] = picks[i - 1].dateId;

      // console.log('gsrun date id', picks[i - 1].dateId);

      // gsapi.spreadsheets.values.update(updateOptions)

      updateOptions = {
        spreadsheetId: '1rUzDp40kj7ub2kLwS-QTvCuupei1A1hEeqE-wFF9oGs',
        range: `sheet${picks[0].groupId}!${chr}` + 4,
        valueInputOption: 'USER_ENTERED',
        resource: { values: [[picks[i - 1].dayChangeAvgPercentage]]}
      };

      // values[3] = [];
      values[3][i] = picks[i - 1].dayChangeAvgPercentage

      // console.log('gsrun dayChangeAvgPercentage', picks[i - 1].dayChangeAvgPercentage);


      // gsapi.spreadsheets.values.update(updateOptions)

      // updateOptions = {
      //   spreadsheetId: '1rUzDp40kj7ub2kLwS-QTvCuupei1A1hEeqE-wFF9oGs',
      //   range: `sheet${picks[0].groupId}!${chr}` + 100,
      //   valueInputOption: 'USER_ENTERED',
      //   resource: { values: [[total]]}
      // };
      //
      //
      //
      // gsapi.spreadsheets.values.update(updateOptions)

      // updateOptions = {
      //   spreadsheetId: '1rUzDp40kj7ub2kLwS-QTvCuupei1A1hEeqE-wFF9oGs',
      //   range: `sheet${sheetPage}!${chr}` + 4,
      //   valueInputOption: 'USER_ENTERED',
      //   resource: { values: [[dailyInfo[i - 1].sandpEodToEodPercentChange * 100]]}
      // };
      //
      // gsapi.spreadsheets.values.update(updateOptions)
      //
      // updateOptions = {
      //   spreadsheetId: '1rUzDp40kj7ub2kLwS-QTvCuupei1A1hEeqE-wFF9oGs',
      //   range: `sheet${sheetPage}!${chr}` + 5,
      //   valueInputOption: 'USER_ENTERED',
      //   resource: { values: [[dailyInfo[i - 1].nasdaqEodToEodPercentChange * 100]]}
      // };
      //
      // gsapi.spreadsheets.values.update(updateOptions)
      //
      // updateOptions = {
      //   spreadsheetId: '1rUzDp40kj7ub2kLwS-QTvCuupei1A1hEeqE-wFF9oGs',
      //   range: `sheet${sheetPage}!${chr}` + 6,
      //   valueInputOption: 'USER_ENTERED',
      //   resource: { values: [[dailyInfo[i - 1].dowJonesEodToEodPercentChange * 100]]}
      // };
      //
      // gsapi.spreadsheets.values.update(updateOptions)
    }
    // .catch(err => {
    //   // res.status(500).send(err);
    // });
  }

  // console.log('second to last values', values);
  values[1][0] = '';
  // console.log('values.length', values.length);
  // for (let k = 0; k < i; k++) {
    for (let l = 1; l < values.length - 1; l++) {
      // if ( !values[k][l]) {
      values[0][l] = '';
      values[1][l] = '';
    // }
    }
  // }
  values[2][0] = '';

  finalRowOptions = {
    spreadsheetId: '1rUzDp40kj7ub2kLwS-QTvCuupei1A1hEeqE-wFF9oGs',
    range: `sheet${picks[0].groupId}!${String.fromCharCode(65)}` + 1,
    valueInputOption: 'USER_ENTERED',
    resource: { values: values}
  };
  console.log('final values', values);

  // values[0].push('g');
  // values[0].push('g');
  // values[0].push('g');
  //
  // values[1].push('g');
  // values[1].push('g');
  // values[1].push('g');
  // values[1].push('g');
  //
  // values[2].push('g');

  // console.log('final final values', values);


  gsapi.spreadsheets.values.update(finalRowOptions)

}
}


async function gsrun3(cl, labelInfo){

  console.log('labelInfo', labelInfo);
  // for (let m = 0; m < labelInfo.length; m++) {
  //
  //
  //
  // if (startGroupId != labelInfo[m].groupId && startGroupId2 != labelInfo[m].groupId2) {

    let startGroupId = labelInfo[0].groupId;
    let startGroupId2 = labelInfo[0].groupId2;
    let sheetPosition = 1;

    let values = []
    values[0] = [`${startGroupId2}`];

    for (let i = 0; i <= labelInfo.length + 15; i++) {
      if (startGroupId2 == labelInfo[i].groupId2 || i >= labelInfo.length) {
        values.push([]);
      }
    }

    for (let i = 0; i < values.length; i++) {
      values[i].push('');
      values[i].push('');
      values[i].push('');

    }

    const gsapi = google.sheets({version: 'v4', auth: cl, })





  values[5] = [];
  values[5][0] = `${startGroupId}`;



values[6] = [];
values[6][0] = `${labelInfo[0].buy}`;



values[7] = [];
values[7][0] = `${labelInfo[0].sell}`;




values[8] = [];
values[8][0] = `limit: ${labelInfo[0].limit}`;



values[9] = [];
values[9][0] = `reason: ${labelInfo[0].reason}`;




values[10] = [];
values[10][0] = `rating: ${labelInfo[0].rating}`;



values[12] = [];
values[12][0] = `order filters`;

values[13] = [];
values[13][0] = `${labelInfo[0].orderFilterName}`;
values[13][1] = ``;


values[13][2] = `${labelInfo[0].symbol}     ${labelInfo[0].number}`;


let row = 15;

    for (let i = 1; i < labelInfo.length; i++) {


      if (startGroupId2 != labelInfo[i].groupId2) {

        values.splice(0, 5);
        let finalRowOptions = {
        spreadsheetId: '1rUzDp40kj7ub2kLwS-QTvCuupei1A1hEeqE-wFF9oGs',
        range: `sheet${startGroupId2}!A6`,
        valueInputOption: 'USER_ENTERED',
        resource: { values: values}
      };

      console.log('last labels posted', values);

      gsapi.spreadsheets.values.update(finalRowOptions)

        startGroupId2 = labelInfo[i].groupId2;
        startGroupId = labelInfo[i].groupId;
        row = 15;



      values = [];

      values[0] = [`${startGroupId2}`];

      for (let i = 0; i <= labelInfo.length + 15; i++) {
        values.push([]);
      }

      for (let i = 0; i < values.length; i++) {
        values[i].push('');
        values[i].push('');
        values[i].push('');

      }

      values[5] = [];
      values[5][0] = `${startGroupId}`;


    values[6] = [];
    values[6][0] = `${labelInfo[i].buy}`;


    values[7] = [];
    values[7][0] = `${labelInfo[i].sell}`;


    values[8] = [];
    values[8][0] = `limit: ${labelInfo[i].limit}`;



    values[9] = [];
    values[9][0] = `reason: ${labelInfo[i].reason}`;


    values[10] = [];
    values[10][0] = `rating: ${labelInfo[i].rating}`;



    values[12] = [];
    values[12][0] = `order filters`;


    values[13] = [];
    values[13][0] = `${labelInfo[i].orderFilterName}`;
    values[13][1] = ``;


    values[13][2] = `${labelInfo[i].symbol}     ${labelInfo[i].number}`;



      }

      else if (startGroupId2 == labelInfo[i].groupId2  && startGroupId != labelInfo[i].groupId) {
        row++;
        startGroupId = labelInfo[i].groupId;


        values[row - 1] = [];
        values[row - 1][0] = `${startGroupId}`;



        row++;


      values[row - 1] = [];
      values[row - 1][0] = `${labelInfo[i].buy}`;



      row++



      values[row - 1] = [];
      values[row - 1][0] = `${labelInfo[i].sell}`;


      row++;


      values[row - 1] = [];
      values[row - 1][0] = `${labelInfo[i].limit}`;


      // gsapi.spreadsheets.values.update(rowOptions)

      row++;


      values[row - 1] = [];
      values[row - 1][0] = `${labelInfo[i].reason}`;



      row++;


      values[row - 1] = [];
      values[row - 1][0] = `${labelInfo[i].rating}`;




      row+= 2;


      values[row - 1] = [];
      values[row - 1][0] = `order filters`;

      row++;


        values[row - 1] = [];
        values[row - 1][0] = `${labelInfo[i].orderFilterName}`;
        values[row - 1][1] = ``;


        values[row - 1][2] = `${labelInfo[i].symbol}     ${labelInfo[i].number}`;


        // gsapi.spreadsheets.values.update(rowOptions)

        row++;

      }

      else if (startGroupId2 == labelInfo[i].groupId2 && startGroupId ==
        labelInfo[i].groupId) {


        values[row - 1] = [];
        values[row - 1][0] = `${labelInfo[i].orderFilterName}`;
        values[row - 1][1] = ``;



        values[row - 1][2] = `${labelInfo[i].symbol}     ${labelInfo[i].number}`;

        // console.log('labels needed', values);


        row++;
      }



    }

    values.splice(0, 5);
    let finalRowOptions = {
    spreadsheetId: '1rUzDp40kj7ub2kLwS-QTvCuupei1A1hEeqE-wFF9oGs',
    range: `sheet${startGroupId2}!A6`,
    valueInputOption: 'USER_ENTERED',
    resource: { values: values}
  };

  console.log('last labels posted', values);

  gsapi.spreadsheets.values.update(finalRowOptions)
}
// }
// }

function calculatePercentage(first, last) {
  return ((last / first) - 1);
}

function calculateAbsolute(first, last) {
  return (last - first);
}

async function getOrderFilterByFilter(order_filters) {
  // console.log('routes function order filters', order_filters);
  let result = await orderFilters.getOrderFilterByFilter(order_filters);
  return result;
}

async function updateOrderFilter(body, order_filters) {
  // let updateOrderFilter = {
  //   order_filter_id: order_filters.orderFilterId,
  //   order_filter_name: order_filters.orderFilterName,
  //   symbol: order_filters.symbol,
  //   number: body.order_filters[`${0}`].number,
  // }
  let result = await orderFilters.updateOrderFilter(order_filters);
  return result;
}

async function getGroupInfo(date_id) {
  // console.log('getData', data);
  let result = await picks.getGroupInfo(date_id);
  return result;
}


async function getData(data) {
  // console.log('getData', data);
  let result = await picks.getPicksByFilter(data);
  return result;
}

async function getFullData(data) {
  // console.log('geFullData input', data);
  let result = await picks.getFullDataByFilter(data);
  return result;
}


async function addPick(body, fullData) {
  // ill add volume here
  let pickToAdd = {
    // add new columns here
    date_id: fullData.startDateId,
    // order_filter_id: order_filters.orderFilterId,
    group_id: body.group_id,
    group_id_2: body.group_id_2,
    buy_period: fullData.buyPeriod,
    sell_period: fullData.sellPeriod,
    result: fullData.result,
    day_change_avg_percentage: fullData.dayChangeAvgPercentage,
    day_change_avg_absolute: fullData.dayChangeAvgAbsolute,
    day_overall_change: fullData.dayOverallChange,
    day_change_median_percent: fullData.dayChangeMedianPercent,
    day_change_median_absolute: fullData.dayChangeMedianAbsolute,
    pc: body.pc,
    limit: body.limit,
    reason: body.reason,
    rating: body.rating,
  }
  let result = await picks.addPick(pickToAdd);
  return result;
}

async function addOrderFilterPickIds(pickId, newOrderFilters) {
  // console.log('route function pickId', pickId);
  let result = await orderFilters.addOrderFilterPickIds(pickId, newOrderFilters);
  return result;
}

async function addOrderFilterLabelIds(labelId, newOrderFilters) {
  // console.log('route function pickId', pickId);
  let result = await labels.addOrderFilterLabelIds(labelId, newOrderFilters);
  return result;
}

async function addCompanyData(companyData) {
  let result = await companyDataClass.addCompanyData(companyData);
  return result;
}

async function addCompanyDataAndPickIds(pickId, companyData) {
  // console.log('route function pickId', pickId);
  let result = await picks.addCompanyDataAndPickIds(pickId, companyData);
  return result;
}

async function addLabel(pickId, fullData, body) {
  // ill add volume here
  let labelToAdd = {
    // add new columns here
    pick_id: pickId,
    // order_filter_id: order_filters.orderFilterId,
    buy: `buy: ${fullData.buyPeriod}`,
    sell: `sell: ${fullData.sellPeriod}`,
    limit: body.limit,
    reason: body.reason,
    rating: body.rating,

  }
  let result = await labels.addLabel(labelToAdd);
  return result;
}

async function getCompaniesByTicker(tickers) {
  let result = await companies.getCompaniesByTicker(tickers);
  return result;
}

async function getPicksByTickers(data) {
  // console.log('getData', data);
  let result = await picks.getPicksByTickers(data);
  return result;
}

async function getFullDataByTickers(data) {
  // console.log('geFullData input', data);
  let result = await picks.getFullDataByTickers(data);
  return result;
}


router.post('/picks', (req, res) => {

  const body = JSON.parse(Object.keys(req.body));
  // console.log('original body', body);
  // console.log('body1', body);
  // console.log('body filters', body.order_filters);


  // getOrderFilterByFilter(body.order_filters)
  // .then(orderFilters => {
  // console.log('routes order filter', orderFilters);
  let newOrderFilters = [];
  let orderFiltersIndex = 0;
  // for (let i = 0; i < orderFilters.length; i++) {
  //   if (orderFilters[i].orderFilterName == body.order_filters[`${orderFiltersIndex}`].name && orderFilters[i].symbol == body.order_filters[`${orderFiltersIndex}`].symbol) {
  //     newOrderFilters.push(orderFilters[i]);
  //     newOrderFilters[orderFiltersIndex].number = body.order_filters[`${orderFiltersIndex}`].number;
  //     orderFiltersIndex ++;
  //   }
  // }
  // console.log('final routes order filter', body.order_filters);
  // console.log('order filter', orderFilters);

  // updateOrderFilter(body, newOrderFilters)
  // .then(orderFilters => {
  //   // console.log('updated order filter', orderFilters);
  //
  //   //// body.start_date_id = date.dateId - 1;
  //   //// body.end_date_id = date.dateId - 1;
  //
  //   // console.log('original body', body);
  console.log('first step');
  getData(body)
  .then(newData => {
    // console.log('newData', newData);
    //
    //     //// body.start_date_id += 1;
    console.log('next step');
    getFullData(newData)
    .then(fullData => {
      // console.log('full data', fullData);
      //
      //       //// body.start_date_id += 1;
      //
      addPick(body, fullData)
      .then(pick => {
        // console.log('pick', pick);
        //
        //         // console.log('first pick', pick);
        //         //   console.log('added pick', pick);
        addOrderFilterPickIds(pick[0].pickId, fullData.orderFilters)
        .then(filterPicks => {
          addCompanyData(fullData.companyData)
          .then(companyData => {
            //         // console.log('second pick', pick);
            //         // console.log('final company data', companyData);
            //
            addCompanyDataAndPickIds(pick[0].pickId, companyData)
            .then(result => {

              // console.log('final company data and picks', result);


              addLabel(pick[0].pickId, fullData, body)
              .then(label => {

                // console.log('result label', label);

                addOrderFilterLabelIds(label[0].labelId, fullData.orderFilters)
                .then(filtersAndLabels => {

                  console.log('filtersAndLabels', filtersAndLabels);
                })




              //           res.send(result)
              //         })
              //
              //       })
              //
            })

            })
            //
          })
          //
        })
      })
          // .catch(err => {
          //   return;
          //   // res.status(500).send(err);
    });
  })
  // })
});

router.get('/updatePicks', (req, res) => {

  // const body = JSON.parse(Object.keys(req.body));
  //
  // let newOrderFilters = [];
  // let orderFiltersIndex = 0;

  console.log('first step');
  console.log('dates info', datesInfo);

  let thisDate = datesInfo[0];


  getGroupInfo(thisDate.dateId - 3)
  .then (groupInfo => {
    console.log('group Info route', groupInfo);
    console.log('second step');

    let groupInfoKeys = Object.keys(groupInfo);

    console.log('something', groupInfo);


    for (let i = 0; i < groupInfoKeys.length; i++) {
    //   let body = {
    //     start_date_id: groupInfo[i].startDateId,
    //     sell_period: groupInfo[i].sellPeriod,
    //
    //   }
    //
      getData(groupInfo[i])
      .then(newData => {
        // console.log('newData', i, newData);
        getFullData(newData)
        .then(fullData => {
          console.log('fullData', fullData);
          addPick(groupInfo[i], fullData)
          .then(pick => {
            addOrderFilterPickIds(pick[0].pickId, fullData.orderFilters)
            .then(filterPicks => {
              addCompanyData(fullData.companyData)
              .then(companyData => {
                addCompanyDataAndPickIds(pick[0].pickId, companyData)
                .then(result => {

                  console.log('final group result', result);


                })
              })
            })
          })
        })
      })
    //
    //   // res.send(groupInfo)
    }
    datesInfo[0].dateId ++;

//     fs.writeFile('dates-copy-2.json', JSON.stringify(datesInfo), function (err) {
//   if (err) throw err;
//   // console.log('Replaced!');
// });
  })
  // getData(body)
  // .then(newData => {
  //   // console.log('newData', newData);
  //   //
  //   //     //// body.start_date_id += 1;
  //   console.log('next step');
  //   getFullData(newData)
  //   .then(fullData => {
  //     // console.log('full data', fullData);
  //     //
  //     //       //// body.start_date_id += 1;
  //     //
  //     addPick(body, fullData)
  //     .then(pick => {
  //       // console.log('pick', pick);
  //       //
  //       //         // console.log('first pick', pick);
  //       //         //   console.log('added pick', pick);
  //       addOrderFilterPickIds(pick[0].pickId, fullData.orderFilters)
  //       .then(filterPicks => {
  //         addCompanyData(fullData.companyData)
  //         .then(companyData => {
  //           //         // console.log('second pick', pick);
  //           //         // console.log('final company data', companyData);
  //           //
  //           addCompanyDataAndPickIds(pick[0].pickId, companyData)
  //           .then(result => {
  //             console.log('final company data and picks', result);
  //             //           res.send(result)
  //             //         })
  //             //
  //             //       })
  //             //
  //           })
  //           //
  //         })
  //         //
  //       })
  //     })
  //     //     // .catch(err => {
  //     //     //   return;
  //     //     //   // res.status(500).send(err);
  //   });
  // })
  // })
});



router.get('/picks/:id', (req, res) => {
  let id = req.params.id;
  dailyStockInfo.getDailyStockInfoByDateId(id)
  .then(picks => {
    console.log(picks.length);
    res.send(picks);
  })
  .catch(err => {
    res.status(500).send(err);
  });
})

router.get('/picks', (req, res) => {
  picks.getPicks()
  .then(pick => {
    res.send(pick);
  })
  .catch(err => {
    res.status(500).send(err);
  });
});

router.get('/labels', (req, res) => {
  labels.getLabels()
  .then(label => {
    res.send(label);
  })
  .catch(err => {
    res.status(500).send(err);
  });
});

router.get('/orderFiltersAndLabels', (req, res) => {
  labels.getOrderFiltersAndLabels()
  .then(result => {
    res.send(result);
  })
  .catch(err => {
    res.status(500).send(err);
  });
});

router.get('/picksSort', (req, res) => {
  picks.getPicksAndSort()
  .then(pick => {
    console.log('final pick', pick);
    // dates.getDailyInfo(pick[0].dateId, pick[pick.length - 1].dateId)
    // .then(dailyInfo => {


      // client.authorize(function(err,tokens){
      //
      //
      //   if (err) {
      //     console.log(err);
      //     return
      //   } else {
      //     console.log('dailyInfo', dailyInfo);
      //     gsrun(client, pick, dailyInfo)
      //   }
      // });

      //   async function gsrun(cl){
      //   const gsapi = google.sheets({version: 'v4', auth: cl, })
      //
      //   for (let i = 1; i <= 2; i++) {
      //
      //
      //       let updateOptions = {
      //         spreadsheetId: '1rUzDp40kj7ub2kLwS-QTvCuupei1A1hEeqE-wFF9oGs',
      //         range: 'sheet3!A' + i - 1,
      //         valueInputOption: 'USER_ENTERED',
      //         resource: { values: [[pick[i - 1].dateId]]}
      //       };
      //
      //       gsapi.spreadsheets.values.update(updateOptions)
      //     .catch(err => {
      //       // res.status(500).send(err);
      //     });
      //   }
      // }

      // console.log(pick);
      // res.send(pick);
    // })

  })
  .catch(err => {
    // res.status(500).send(err);
  });

});

router.get('/picksSort2', (req, res) => {

  // guidance: get all the label info then add to sheet. maybe a gsrun3 func

  labels.getAllLabelInfo()
  .then(labelInfo => {

    client.authorize(function(err,tokens){
    // sheetPage ++;



      if (err) {
        console.log(err);
        return
      } else {
        gsrun3(client, labelInfo)
      }
    });


  // })
  picks.getPicksAndSort2()
  .then(pick => {
    // console.log('final pick', pick);
    // dates.getDailyInfo(pick[0].dateId, pick[pick.length - 1].dateId)
    // .then(dailyInfo => {
    let startIndex= 0;
    let endIndex = 0;
    let currentGroup = pick[0].groupId;
    let sheetPage = 0;
    let samples = [];
    let sampleIndex = 0;

    for (let i = 0; i <= pick.length; i ++) {


      if (i == pick.length || pick[i].groupId != currentGroup) {
        let sample = pick.slice(startIndex, endIndex);
        samples[sampleIndex] = sample;
        sampleIndex++;

        startIndex = endIndex
        endIndex ++;

        if (i < pick.length) {
        currentGroup = pick[startIndex].groupId;
      }



      }

      else {
        endIndex ++;
      }

    }

    client.authorize(function(err,tokens){
    // sheetPage ++;

    // console.log('samples', samples);


      if (err) {
        console.log(err);
        return
      } else {
        gsrun2(client, samples, [], sheetPage, labelInfo)
      }
    });



      //   async function gsrun(cl){
      //   const gsapi = google.sheets({version: 'v4', auth: cl, })
      //
      //   for (let i = 1; i <= 2; i++) {
      //
      //
      //       let updateOptions = {
      //         spreadsheetId: '1rUzDp40kj7ub2kLwS-QTvCuupei1A1hEeqE-wFF9oGs',
      //         range: 'sheet3!A' + i - 1,
      //         valueInputOption: 'USER_ENTERED',
      //         resource: { values: [[pick[i - 1].dateId]]}
      //       };
      //
      //       gsapi.spreadsheets.values.update(updateOptions)
      //     .catch(err => {
      //       // res.status(500).send(err);
      //     });
      //   }
      // }

      // console.log(pick);
      // res.send(pick);
    // })
    res.sendStatus(200);
  })
  .catch(err => {
    // res.status(500).send(err);
  });
  })

});

router.get('/companyDataAndPicks', (req, res) => {
  picks.getCompanyDataAndPicks()
  .then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(500).send(err);
  });
});

router.get('/getAllLabelInfo', (req, res) => {
  labels.getAllLabelInfo()
  .then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(500).send(err);
  });
});

router.get('/orderFiltersAndPicks', (req, res) => {
  orderFilters.getOrderFiltersAndPicks()
  .then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(500).send(err);
  });
});

// router.post('/displayPicks', (req, res) => {
//   const body = JSON.parse(Object.keys(req.body));
//
//   console.log(body);
//
//
//   dates.getDateByDate(body.start_date)
//   .then(date => {
//     body.start_date_id = date.dateId - 1;
//     dates.getDateByDate(body.end_date)
//     .then(date => {
//       body.end_date_id = date.dateId - 1;
//       companies.getCompanyByTicker(body.ticker)
//       .then(company => {
//         body.company_id = company.companyId;
//         picks.getPicksByTicker(body)
//         .then(newPicks => {
//           console.log(newPicks);
//           console.log(calculatePercentage(newPicks[`period11`], newPicks[`${body.sell_period}`]) * 100);
//           console.log(calculatePercentage(1089.10, 1104.51) * 100);
//           res.send(picks[0]);
//         })
//         .catch(err => {
//           res.status(500).send(err);
//         });
//       })
//       .catch(err => {
//         res.status(500).send(err);
//       });
//     })
//     .catch(err => {
//       res.status(500).send(err);
//     });
//   })
//   .catch(err => {
//     res.status(500).send(err);
//   });
//
// });

router.post('/displayPicks', (req, res) => {
  const body = JSON.parse(Object.keys(req.body));

  console.log(body);

  body.start_date = body.start_dates[`0`];
  body.end_date = body.end_dates[`0`];
  body.sell_period = 'period' + body.sell_periods[`0`];


  dates.getDateByDate(body.start_date)
  .then(date => {
    body.start_date_id = date.dateId - 1;
    dates.getDateByDate(body.end_date)
    .then(date => {
      body.end_date_id = date.dateId - 1;
      let tickers = [];
      for (let i = 0; i < Object.keys(body.tickers).length; i++) {
        tickers[i] = body.tickers[`${i}`]
      }

      companies.getCompaniesByTicker(tickers)
      .then(newCompanies => {
        body.company_ids = [];
        for (let i = 0; i < newCompanies.length; i++) {
          body.company_ids.push(newCompanies[i].companyId);
        }
        console.log(body);
        picks.getPicksByTicker(body)
        .then(newPicks => {
          console.log('newpicks', newPicks);
          body.changePercentage = [];
          body.changeAbsolute = [];
          for(let i = 0; i < newPicks.companyIds.length; i++) {
            body.changePercentage.push(calculatePercentage(newPicks.periodData[`${i}`].period11, newPicks.periodData[`${i}`][`${body.sell_period}`]) * 100);
            body.changeAbsolute.push(calculateAbsolute(newPicks.periodData[`${i}`].period11, newPicks.periodData[`${i}`][`${body.sell_period}`]));

          }

          let avgPercent = body.changePercentage.reduce((previous, current) => current = (current + previous) / body.changePercentage.length);
          let avgAbsolute = body.changeAbsolute.reduce((previous, current) => current = (current + previous) / body.changePercentage.length);

          body.changePercentage.sort((a, b) => a - b);
          body.changeAbsolute.sort((a, b) => a - b);


          let lowMiddle = Math.floor((body.changePercentage.length - 1) / 2);
          let highMiddle = Math.ceil((body.changePercentage.length - 1));

          let medianPercent = (body.changePercentage[lowMiddle] + body.changePercentage[highMiddle]) / 2;
          let medianAbsolute = (body.changeAbsolute[lowMiddle] + body.changeAbsolute[highMiddle]) / 2;


          body.avgPercent = avgPercent;
          body.medianPercent = medianPercent;
          body.avgAbsolute = avgAbsolute;
          body.medianAbsolute = medianAbsolute;



          console.log('final body', body);
          let hkeys = Object.keys(body.htickers);

          for (let i = hkeys.length - 1; i >= 0; i--) {
            console.log(body.htickers[`${hkeys[i]}`], calculatePercentage(body.hstart_prices[`${hkeys[i]}`], body.hend_prices[`${hkeys[i]}`]) * 100);
          }

          // console.log('AAPL', calculatePercentage(192.9, 197.87) * 100);
          // console.log('GOOGL', calculatePercentage(1089.10, 1104.51) * 100);


          res.send(picks[0]);
        })
        .catch(err => {
          res.status(500).send(err);
        });
      })
      .catch(err => {
        res.status(500).send(err);
      });
    })
    .catch(err => {
      res.status(500).send(err);
    });
  })
  .catch(err => {
    res.status(500).send(err);
  });

});

router.get('/picksDeleteByGroup/:id', (req, res) => {

  let id = req.params.id;
  // console.log('working1');
  // const id = req.params.id;

  // if (isNaN(id)) {
  //   return res.sendStatus(404);
  // }

  picks.deleteEverythingById(id)
  .then(deletedThings => {
    if (!deletedThings[0]) {
        res.sendStatus(404);
        return;
      }
    res.send(deletedThings);
  })
  .catch(err => {
      res.status(500).send(err);
  });
});

router.get('/picksDelete', (req, res) => {
  // console.log('working1');
  // const id = req.params.id;

  // if (isNaN(id)) {
  //   return res.sendStatus(404);
  // }

  picks.deleteEverything()
  .then(deletedThings => {
    if (!deletedThings[0]) {
        res.sendStatus(404);
        return;
      }
    res.send(deletedThings);
  })
  .catch(err => {
      res.status(500).send(err);
  });
});

router.get('/addTestChart', (req, res) => {
  console.log('workng');




    client.authorize(function(err,tokens){


      if (err) {
        console.log(err);
        return
      } else {
        gsrun4(client)
      }
    });





});

router.post('/picksByTickers', (req, res) => {

  const body = JSON.parse(Object.keys(req.body));
  console.log('original body', body);
  // console.log('body1', body);
  // console.log('body filters', body.order_filters);


  // getOrderFilterByFilter(body.order_filters)
  // .then(orderFilters => {
  // console.log('routes order filter', orderFilters);
  let newOrderFilters = [];
  let orderFiltersIndex = 0;
  let tickers = Object.keys(body.tickers);


  // for (let i = 0; i < orderFilters.length; i++) {
  //   if (orderFilters[i].orderFilterName == body.order_filters[`${orderFiltersIndex}`].name && orderFilters[i].symbol == body.order_filters[`${orderFiltersIndex}`].symbol) {
  //     newOrderFilters.push(orderFilters[i]);
  //     newOrderFilters[orderFiltersIndex].number = body.order_filters[`${orderFiltersIndex}`].number;
  //     orderFiltersIndex ++;
  //   }
  // }
  // console.log('final routes order filter', body.order_filters);
  // console.log('order filter', orderFilters);

  // updateOrderFilter(body, newOrderFilters)
  // .then(orderFilters => {
  //   // console.log('updated order filter', orderFilters);
  //
  //   //// body.start_date_id = date.dateId - 1;
  //   //// body.end_date_id = date.dateId - 1;
  //
  //   // console.log('original body', body);
  console.log('first step');
  companies.getCompaniesByTicker(tickers)
  .then(companyIds => {
    body.company_ids = [];
    for (let i = 0; i < companyIds.length; i++) {
      body.company_ids[i] = companyIds[i].companyId;
    }
    // console.log('companyIds', companyIds);
    //
    //     //// body.start_date_id += 1;
    console.log('next step');
    getPicksByTickers(body)
    .then(newData => {
      // console.log('new data', newData);
      //
      //       //// body.start_date_id += 1;
      //

      getFullDataByTickers(newData)
      .then(fullData => {

        console.log('full data', fullData);

      addPick(body, fullData)
      .then(pick => {
        // console.log('pick', pick);
        //
        //         // console.log('first pick', pick);
        //         //   console.log('added pick', pick);
        addOrderFilterPickIds(pick[0].pickId, fullData.orderFilters)
        .then(filterPicks => {
          addCompanyData(fullData.companyData)
          .then(companyData => {
            //         // console.log('second pick', pick);
            //         // console.log('final company data', companyData);
            //
            addCompanyDataAndPickIds(pick[0].pickId, companyData)
            .then(result => {

              // console.log('final company data and picks', result);


              addLabel(pick[0].pickId, fullData, body)
              .then(label => {

                // console.log('result label', label);

                addOrderFilterLabelIds(label[0].labelId, fullData.orderFilters)
                .then(filtersAndLabels => {

                  // console.log('filtersAndLabels', filtersAndLabels);
                })




              //           res.send(result)
              //         })
              //
              //       })
              //
            })

            })
            //
          })
          //
        })
      })
    })
          // .catch(err => {
          //   return;
          //   // res.status(500).send(err);
    });
  })
  // })
});




// after all of the above, make route to get the picks and send need info to google sheets

module.exports = router;
