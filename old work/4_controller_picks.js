'use strict';

const knex = require('../../knex.js');
const { decamelizeKeys, camelizeKeys } = require('humps');

function calculatePercentage(first, last) {
  return ((last / first) - 1);
}

function calculateAbsolute(first, last) {
  return (last - first);
}

class Picks {
  // getPicksByTicker(data) {
  //   let company_id = data.company_id;
  //   let start_date_id = data.start_date_id;
  //   let end_date_id = data.end_date_id;
  //   let sell_period = data.sell_period;
  //   //start date_id
  //   //end date_id
  //   //sell_period
  //   //filters: [percent: , abs_value: , marketCap: , volume:, reason: , count: ,]
  //
  //   return knex('daily_stock_info')
  //   .select('date_id','open_price', 'closing_price')
  //   .where('company_id', company_id)
  //   // .where('daily_stock_info_id', '<', 10)
  //
  //   .whereBetween('date_id', [start_date_id, end_date_id])
  //   // .whereBetween('daily_stock_info_id', [1, 2])
  //   .orderBy('date_id')
  //   .then((result) => {
  //     console.log(result);
  //     // all these are then sorted by start date and then assigned a group
  //     return camelizeKeys(result)
  //   });
  // }

  getPicksByTicker(data) {
    let company_ids = data.company_ids;
    let start_date_id = data.start_date_id;
    let end_date_id = data.end_date_id;
    let sell_period = data.sell_period;
    //start date_id
    //end date_id
    //sell_period
    //filters: [percent: , abs_value: , marketCap: , volume:, reason: , count: ,]
    console.log('data', data);
    return knex('daily_stock_info')
    .select('date_id','open_price', 'closing_price')
    .whereIn('company_id', company_ids)
    // .where('daily_stock_info_id', '<', 10010)

    .whereBetween('date_id', [start_date_id, start_date_id + 2])
    .orderBy('date_id')
    .then((result) => {
      data.period_data = {};
      console.log('result', result);
      for (let i = 0; i < company_ids.length; i++) {
        data.period_data[`${i}`] = {};
        data.period_data[`${i}`].period11 = result[i].open_price;
        data.period_data[`${i}`].period12 = result[i].closing_price;
        data.period_data[`${i}`][`period21`] = result[i + company_ids.length].open_price;
        data.period_data[`${i}`][`period22`] = result[i + company_ids.length].closing_price;
        data.period_data[`${i}`][`period31`] = result[i + (company_ids.length * 2)].open_price;
        data.period_data[`${i}`][`period32`] = result[i + (company_ids.length * 2)].closing_price;
        // maybe add volume for each period? idk if the volume is accurate to the hour

      }

      console.log('final product', data);
      // data[`period11`] = result[0].open_price;
      // data[`period12`] = result[0].closing_price;
      // data[`period21`] = result[1].open_price;
      // data[`period22`] = result[1].closing_price;
      // data[`period31`] = result[2].open_price;
      // data[`period32`] = result[2].closing_price;

      // console.log(result);
      // all these are then sorted by start date and then assigned a group
      return camelizeKeys(data)
    });
  }

  getPicksByFilter(data) {
    console.log('controller original data', data);
    let start_date_id = data.start_date_id;
    // let end_date_id = data.end_date_id;
    // let dateArr = [];
    let sell_period = data.sell_period;
    let order_filters = data.order_filters;
    // let select_filters = data.select_filters;
    let limit = data.limit;
    let company_ids = [];
    let company_data = {};



    // for (let i = start_date_id; i <= end_date_id; i++) {
    //   dateArr.push(i);
    // }

    // console.log('data', data);

    return knex('daily_stock_info')
    .select('daily_stock_info_id', 'date_id', 'ticker', 'company_id', 'open_price', 'closing_price', 'eod_to_sod_percent_change')
    // .whereIn('date_id', dateArr)
    .where('date_id', start_date_id)
    .whereNotNull('company_id')
    .where(order_filters[`0`].name, order_filters[`0`].symbol, (order_filters[`0`].number / 100))
    .orderBy('eod_to_sod_percent_change')
    .limit(limit * 2)
    .then(result => {
      // console.log('pure result', result);
      for (let i = 0; i < result.length; i++) {
        company_ids[i] = result[i].company_id;
        // company_data[`${result[i].company_id}`] = {
        //   company_id: result[i].company_id,
        // }
      }
      data.company_ids = company_ids;
      data.company_data = company_data;
      let weakestLinks = {};
      for (let i = 0; i < result.length; i ++) {
        //maybe optimize this more with an integer instead of array
        weakestLinks[`${data.company_ids[i]}`] = [data.company_ids[i]];
      }

      // console.log('what I need');
      // console.log('data', data);
      let final = {data: data, weakestLinks: weakestLinks}
      console.log('controller final', final);
      return final;
    })
  }
  // console.log('result', result);
  // console.log('new data', data);
  getFullDataByFilter(originalData) {

    let data = originalData.data;
    let weakestLinks = originalData.weakestLinks;

    let start_date_id = data.start_date_id;
    // let end_date_id = data.end_date_id;
    // let dateArr = [];
    let sell_period = data.sell_period;
    let order_filters = data.order_filters;
    // let select_filters = data.select_filters;
    let limit = data.limit;
    let company_ids = data.company_ids;
    let company_data = data.company_data;

    return knex('daily_stock_info')
    .select('date_id', 'company_id', 'open_price', 'closing_price')
    .whereIn('company_id', company_ids)
    .whereBetween('date_id', [start_date_id, start_date_id + 2])
    .orderBy('company_id')
    .orderBy('date_id')
    .then(newResult => {
      // console.log('pure new result', newResult);
      //find all the unique company ids then count how many days they have data for
      for (let i = 0; i < newResult.length; i ++) {
        weakestLinks[`${newResult[i].company_id}`].push(newResult[i]);
      }
      // console.log('problem weakestLinks', weakestLinks);

      for (let i = 0; i < data.company_ids.length; i++) {
        console.log('problem link', data.company_ids[i]);
        if (weakestLinks[`${data.company_ids[i]}`].length < 4) {
          data.company_ids.splice(data.company_ids.indexOf(data.company_ids[i]), 1);
        }
      }

      data.company_ids.splice(limit);


      for (let i = 0; i < data.company_ids.length; i++) {
        company_data[`${data.company_ids[i]}`] = {
          company_id: data.company_ids[i],
        }
      }


      // console.log('newResult', newResult);
      data.changePercentage = [];
      data.changeAbsolute = [];
      // console.log('data', data);
      // console.log('newResult', newResult);
      for (let i = 0; i < data.company_ids.length; i ++) {
        // find a way to check if all these companies have data for these dates
        data.company_data[`${data.company_ids[i]}`].period11 = weakestLinks[`${data.company_ids[i]}`][1].open_price;
        data.company_data[`${data.company_ids[i]}`].period12 = weakestLinks[`${data.company_ids[i]}`][1].closing_price;
        data.company_data[`${data.company_ids[i]}`].period21 = weakestLinks[`${data.company_ids[i]}`][2].open_price;
        data.company_data[`${data.company_ids[i]}`].period22 = weakestLinks[`${data.company_ids[i]}`][2].closing_price;
        data.company_data[`${data.company_ids[i]}`].period31 = weakestLinks[`${data.company_ids[i]}`][3].open_price;
        data.company_data[`${data.company_ids[i]}`].period32 = weakestLinks[`${data.company_ids[i]}`][3].closing_price;

        // data.company_data[`${newResult[i].company_id}`].period12 = newResult[i].closing_price;
        // data.company_data[`${newResult[i].company_id}`].period21 = newResult[i + 1].open_price;
        // data.company_data[`${newResult[i].company_id}`].period22 = newResult[i + 1].closing_price;
        // console.log('this is the problem', data);
        // console.log('newResult', newResult);
        // data.company_data[`${newResult[i].company_id}`].period31 = newResult[i + 2].open_price;
        // data.company_data[`${newResult[i].company_id}`].period32 = newResult[i + 2].closing_price;
        data.company_data[`${data.company_ids[i]}`].changePercentage = calculatePercentage((data.company_data[`${data.company_ids[i]}`][`${data.buy_period}`]), data.company_data[`${data.company_ids[i]}`][`${data.sell_period}`]) * 100;
        data.company_data[`${data.company_ids[i]}`].changeAbsolute = calculateAbsolute((data.company_data[`${data.company_ids[i]}`][`${data.buy_period}`]), data.company_data[`${data.company_ids[i]}`][`${data.sell_period}`]);

        // data.company_data[`${newResult[i].company_id}`].changeAbsolute = calculateAbsolute((data.company_data[`${newResult[i].company_id}`][`${data.buy_period}`]), data.company_data[`${newResult[i].company_id}`][`${data.sell_period}`]);
        data.changePercentage.push(data.company_data[`${data.company_ids[i]}`].changePercentage);
        data.changeAbsolute.push(data.company_data[`${data.company_ids[i]}`].changeAbsolute);
      }

      data.dayChangeAvgPercentage = data.changePercentage.reduce((previous, current) => current = (current + previous) / data.changePercentage.length);
      data.dayChangeAvgAbsolute = data.changeAbsolute.reduce((previous, current) => current = (current + previous) / data.changeAbsolute.length);

      data.changePercentage.sort((a, b) => a - b);
      data.changeAbsolute.sort((a, b) => a - b);

      let lowMiddle = Math.floor((data.changePercentage.length - 1) / 2);
      let highMiddle = Math.ceil((data.changePercentage.length - 1));

      data.dayChangeMedianPercent = (data.changePercentage[lowMiddle] + data.changePercentage[highMiddle]) / 2;
      data.dayChangeMedianAbsolute = (data.changeAbsolute[lowMiddle] + data.changeAbsolute[highMiddle]) / 2;


      console.log('recent data', data);
      return camelizeKeys(data);

    })
  }


  insertPicksByGroup(data) {

  }

  // old and working
  // getPicksByTicker(data) {
  //   let company_id = data.company_id;
  //   let start_date_id = data.start_date_id;
  //   let end_date_id = data.end_date_id;
  //   let sell_period = data.sell_period;
  //   //start date_id
  //   //end date_id
  //   //sell_period
  //   //filters: [percent: , abs_value: , marketCap: , volume:, reason: , count: ,]
  //
  //   return knex('daily_stock_info')
  //   .select('date_id','open_price', 'closing_price')
  //   .where('company_id', company_id)
  //   // .where('daily_stock_info_id', '<', 10)
  //
  //   .whereBetween('date_id', [start_date_id, start_date_id + 2])
  //    .orderBy('date_id')
  //   .then((result) => {
  //     data[`period11`] = result[0].open_price;
  //     data[`period12`] = result[0].closing_price;
  //     data[`period21`] = result[1].open_price;
  //     data[`period22`] = result[1].closing_price;
  //     data[`period31`] = result[2].open_price;
  //     data[`period32`] = result[2].closing_price;
  //
  //     // console.log(result);
  //     // all these are then sorted by start date and then assigned a group
  //     return camelizeKeys(data)
  //   });
  // }


}

module.exports = Picks;
