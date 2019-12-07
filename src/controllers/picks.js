'use strict';

const knex = require('../../knex.js');
const { decamelizeKeys, camelizeKeys } = require('humps');

function calculatePercentageGainLoss(first, last, pc) {
  let gainLoss = ((last / first) - 1);
  if (pc == 'p') {
    gainLoss = gainLoss * -1;
  }
  return gainLoss
}

function calculateAbsoluteGainLoss(first, last, pc) {
  let gainLoss = (last - first);
  if (pc == 'p') {
    gainLoss = gainLoss * -1;
  }
  return gainLoss
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

  getPicks() {
    return knex('picks')
      .orderBy('pick_id')
      .then((result) => camelizeKeys(result));
  }

  // look into this later
  getPicksByTicker2(data) {
    let company_ids = data.company_ids;
    let start_date_id = data.start_date_id;
    let end_date_id = data.end_date_id;
    let sell_period = data.sell_period;
    //start date_id
    //end date_id
    //sell_period
    //filters: [percent: , abs_value: , marketCap: , volume:, reason: , count: ,]
    // console.log('data', data);
    return knex('daily_stock_info')
    .select('date_id','open_price', 'closing_price')
    .whereIn('company_id', company_ids)
    // .where('daily_stock_info_id', '>', 5859541)

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

      // console.log('final product', data);
      // data[`period11`] = result[0].open_price;
      // data[`period12`] = result[0].closing_price;
      // data[`period21`] = result[1].open_price;
      // data[`period22`] = result[1].closing_price;
      // data[`period31`] = result[2].open_price;
      // data[`period32`] = result[2].closing_price;

      // all these are then sorted by start date and then assigned a group
      return camelizeKeys(data)
    });
  }

  getGroupInfo(date_id) {

    console.log('controller date id', date_id);


    return knex('picks')
    .join('order_filters_picks', 'picks.pick_id', '=', 'order_filters_picks.pick_id')
    .join('order_filters', 'order_filters_picks.order_filter_id', '=', 'order_filters.order_filter_id')
    // .select('group_id', 'sell_period', 'order_filter_name', 'symbol', 'number')
    // .whereIn('date_id', dateArr)
    .where('picks.date_id', date_id - 1)
    .select('picks.group_id', 'picks.group_id_2', 'picks.date_id', 'order_filters.order_filter_id', 'picks.pc', 'order_filters_picks.number', 'picks.limit', 'picks.buy_period', 'picks.sell_period', 'order_filters.order_filter_name', 'order_filters.symbol', 'order_filters_picks.number')
    .orderBy(`picks.group_id`)
    .orderBy('order_filters.order_filter_id')
    .then(result => {


      let count = -1;
      let firstId = 0;
      let final = {};
      let orderFilterCount = 0

      for (let i = 0; i < result.length; i++) {
        if (result[i].group_id != firstId) {
          count++;
          orderFilterCount = 0;
          let data = {
            // group_id: result[i].group_id,
            group_id: result[i].group_id,
            group_id_2: result[i].group_id_2,

            //change this later when done testing
            start_date_id: result[i].date_id + 1,
            end_date_id: result[i].date_id,
            buy_period: result[i].buy_period,
            sell_period: result[i].sell_period,
            pc: result[i].pc,
            limit: result[i].limit,
            order_filters: {
              0: {
                order_filter_id: result[i].order_filter_id,
                name: result[i].order_filter_name,
                number: result[i].number,
                symbol: result[i].symbol,
              }
            },
          }

          final[`${count}`] = data;
          firstId = result[i].group_id;
        }

        else {
          orderFilterCount++;
          final[`${count}`].order_filters[`${orderFilterCount}`] = {
            order_filter_id: result[i].order_filter_id,
            name: result[i].order_filter_name,
            number: result[i].number,
            symbol: result[i].symbol,
          }
          // console.log('problem', final);
          // console.log('count', count);
        }
      }

      // let date = {
      //   order_filter_id: result.order_filter_id,
      //   group_id: result.group_id,
      //
      // };

      // console.log('final result', final);
      //
      // let keys = Object.keys(final);
      // for (let i = 0; i < keys.length; i ++) {
      //   console.log('final filters', final[`${keys[i]}`].group_id, final[`${keys[i]}`].order_filters);
      // }
      return final;
    })
  }

  getPicksByFilter(data) {

    // console.log('controller input', data);
    // each pick will have many filters and each filter will have any picks. maybe not actually
    // console.log('controller original data', data);
    let start_date_id = data.start_date_id;
    // let end_date_id = data.end_date_id;
    // let dateArr = [];
    let sell_period = data.sell_period;
    let order_filters = [];
    let keys = Object.keys(data.order_filters);
    for (let i = 0; i < 19; i++) {
      if (keys[i]) {
        order_filters[i] = data.order_filters[`${keys[i]}`];
      }

      else {
        order_filters[i] = {name: 'daily_stock_info_id', symbol: '>', number: 0}
      }
    }
    // let select_filters = data.select_filters;
    let limit = data.limit;
    let company_ids = [];
    let company_data = {};
    data.order_filters = order_filters;


    // for (let i = start_date_id; i <= end_date_id; i++) {
    //   dateArr.push(i);
    // }

    // console.log('data', data);
    // console.log('order_filters', order_filters);
    return knex('daily_stock_info')
    .select('daily_stock_info_id', 'date_id', 'ticker', 'company_id', 'open_price', 'closing_price', 'eod_to_sod_percent_change')
    // .whereIn('date_id', dateArr)
    .where('date_id', start_date_id)
    .whereNotNull('company_id')
    // find out how to dynamically make  multiple filters. maybe have a hardcoded number of wheres. if there is in empty one maybe there wont be a problem. IF there is a problem, maybe have a default of a neutral comparison. maybe make defaults for original order filters.
    .where(order_filters[0].name, order_filters[0].symbol, (order_filters[0].number / 100))
    .where(order_filters[1].name, order_filters[1].symbol, (order_filters[1].number / 100))
    .where(order_filters[2].name, order_filters[2].symbol, (order_filters[2].number / 100))
    .where(order_filters[3].name, order_filters[3].symbol, order_filters[3].number)
    .where(order_filters[4].name, order_filters[4].symbol, order_filters[4].number)
    .where(order_filters[5].name, order_filters[5].symbol, order_filters[5].number)
    .where(order_filters[6].name, order_filters[6].symbol, order_filters[6].number)
    .where(order_filters[7].name, order_filters[7].symbol, order_filters[7].number)
    .where(order_filters[8].name, order_filters[8].symbol, (order_filters[8].number / 100))
    .where(order_filters[9].name, order_filters[9].symbol, (order_filters[9].number / 100))
    .where(order_filters[10].name, order_filters[10].symbol, (order_filters[10].number / 100))
    .where(order_filters[11].name, order_filters[11].symbol, order_filters[11].number)
    .where(order_filters[12].name, order_filters[12].symbol, order_filters[12].number)
    .where(order_filters[13].name, order_filters[13].symbol, order_filters[13].number)
    .where(order_filters[14].name, order_filters[14].symbol, order_filters[14].number)
    .where(order_filters[15].name, order_filters[15].symbol, (order_filters[15].number / 100))
    .where(order_filters[16].name, order_filters[16].symbol, (order_filters[16].number / 100))
    .where(order_filters[17].name, order_filters[17].symbol, order_filters[17].number)
    .where(order_filters[18].name, order_filters[18].symbol, order_filters[18].number)

    //think more about this later
    .orderBy(`${order_filters[0].name}`)
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
      // console.log('controller final', final);
      // console.log('controller final', final);
      return final;
    })
  }
  // console.log('result', result);
  // console.log('new data', data);
  getFullDataByFilter(originalData) {
    // console.log('controller data', originalData);

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
    .select('company_id', 'open_price', 'closing_price', 'eod_to_sod_percent_change', 'eod_to_eod_percent_change', 'sod_to_eod_percent_change', 'eod_to_sod_absolute_change', 'eod_to_eod_absolute_change', 'sod_to_eod_absolute_change', 'today_market_cap', 'volume')
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
        // console.log('problem link', data.company_ids[i]);
        if (weakestLinks[`${data.company_ids[i]}`].length < 4) {
          data.company_ids.splice(data.company_ids.indexOf(data.company_ids[i]), 1);
        }
      }

      data.company_ids.splice(limit);


      for (let i = 0; i < data.company_ids.length; i++) {
        company_data[`${data.company_ids[i]}`] = {
          company_id: data.company_ids[i],
          pc: data.pc,
        }

        // if (order_filters[`${0}`].symbol == '<') {
        //   company_data[`${data.company_ids[i]}`].pc = 'c';
        // }
        //
        // else if (order_filters[`${0}`].symbol == '>') {
        //   company_data[`${data.company_ids[i]}`].pc = 'p';
        // }
      }


      // console.log('newResult', newResult);
      data.changePercentage = [];
      data.changeAbsolute = [];
      data.overallChange = [];
      // console.log('data', data);
      // console.log('newResult', newResult);
      for (let i = 0; i < data.company_ids.length; i ++) {
        // add initial volume. need to add volume to weakest link first

        // find a way to check if all these companies have data for these dates
        data.company_data[`${data.company_ids[i]}`].period11 = weakestLinks[`${data.company_ids[i]}`][1].open_price;
        data.company_data[`${data.company_ids[i]}`].period12 = weakestLinks[`${data.company_ids[i]}`][1].closing_price;
        data.company_data[`${data.company_ids[i]}`].period21 = weakestLinks[`${data.company_ids[i]}`][2].open_price;
        data.company_data[`${data.company_ids[i]}`].period22 = weakestLinks[`${data.company_ids[i]}`][2].closing_price;
        data.company_data[`${data.company_ids[i]}`].period31 = weakestLinks[`${data.company_ids[i]}`][3].open_price;
        data.company_data[`${data.company_ids[i]}`].period32 = weakestLinks[`${data.company_ids[i]}`][3].closing_price;

        data.company_data[`${data.company_ids[i]}`].eod_to_sod_percent_change = weakestLinks[`${data.company_ids[i]}`][1].eod_to_sod_percent_change;
        data.company_data[`${data.company_ids[i]}`].eod_to_eod_percent_change = weakestLinks[`${data.company_ids[i]}`][1].eod_to_eod_percent_change;
        data.company_data[`${data.company_ids[i]}`].sod_to_eod_percent_change = weakestLinks[`${data.company_ids[i]}`][1].sod_to_eod_percent_change;
        data.company_data[`${data.company_ids[i]}`].eod_to_sod_absolute_change = weakestLinks[`${data.company_ids[i]}`][1].eod_to_sod_absolute_change;
        data.company_data[`${data.company_ids[i]}`].eod_to_eod_absolute_change = weakestLinks[`${data.company_ids[i]}`][1].eod_to_eod_absolute_change;
        data.company_data[`${data.company_ids[i]}`].sod_to_eod_absolute_change = weakestLinks[`${data.company_ids[i]}`][1].sod_to_eod_absolute_change;

        data.company_data[`${data.company_ids[i]}`].today_market_cap = weakestLinks[`${data.company_ids[i]}`][1].today_market_cap;
        data.company_data[`${data.company_ids[i]}`].volume = weakestLinks[`${data.company_ids[i]}`][1].volume;





        // data.company_data[`${newResult[i].company_id}`].period12 = newResult[i].closing_price;
        // data.company_data[`${newResult[i].company_id}`].period21 = newResult[i + 1].open_price;
        // data.company_data[`${newResult[i].company_id}`].period22 = newResult[i + 1].closing_price;
        // console.log('this is the problem', data);
        // console.log('newResult', newResult);
        // data.company_data[`${newResult[i].company_id}`].period31 = newResult[i + 2].open_price;
        // data.company_data[`${newResult[i].company_id}`].period32 = newResult[i + 2].closing_price;
        data.company_data[`${data.company_ids[i]}`].changePercentage = calculatePercentageGainLoss((data.company_data[`${data.company_ids[i]}`][`${data.buy_period}`]), data.company_data[`${data.company_ids[i]}`][`${data.sell_period}`], data.company_data[`${data.company_ids[i]}`].pc) * 100;
        data.company_data[`${data.company_ids[i]}`].changeAbsolute = calculateAbsoluteGainLoss((data.company_data[`${data.company_ids[i]}`][`${data.buy_period}`]), data.company_data[`${data.company_ids[i]}`][`${data.sell_period}`], data.company_data[`${data.company_ids[i]}`].pc);
        data.company_data[`${data.company_ids[i]}`].overallChange = calculatePercentageGainLoss((data.company_data[`${data.company_ids[i]}`][`${data.buy_period}`]), data.company_data[`${data.company_ids[i]}`][`${data.sell_period}`], 'c') * 100;


        // data.company_data[`${newResult[i].company_id}`].changeAbsolute = calculateAbsolute((data.company_data[`${newResult[i].company_id}`][`${data.buy_period}`]), data.company_data[`${newResult[i].company_id}`][`${data.sell_period}`]);
        data.changePercentage.push(data.company_data[`${data.company_ids[i]}`].changePercentage);
        data.changeAbsolute.push(data.company_data[`${data.company_ids[i]}`].changeAbsolute);
        data.overallChange.push(data.company_data[`${data.company_ids[i]}`].overallChange);

      }

      let sum = data.changePercentage.reduce((previous, current) =>  current = (current + previous));
      console.log('sum', sum);
      data.dayChangeAvgPercentage = sum / data.changePercentage.length;
      data.dayChangeAvgAbsolute = data.changeAbsolute.reduce((previous, current) => current = (current + previous) / data.changeAbsolute.length);
      data.dayOverallChange = data.overallChange.reduce((previous, current) => current = (current + previous) / data.overallChange.length);


      data.changePercentage.sort((a, b) => a - b);
      data.changeAbsolute.sort((a, b) => a - b);

      let lowMiddle = Math.floor((data.changePercentage.length - 1) / 2);
      let highMiddle = Math.ceil((data.changePercentage.length - 1));

      data.dayChangeMedianPercent = (data.changePercentage[lowMiddle] + data.changePercentage[highMiddle]) / 2;
      data.dayChangeMedianAbsolute = (data.changeAbsolute[lowMiddle] + data.changeAbsolute[highMiddle]) / 2;

      // change this later to compare to the market as a whole
      let result = '';
      if (data.dayChangeAvgPercentage > 0) {
        result = 'good';
      }

      else if (data.dayChangeAvgPercentage < 0) {
        result = 'bad';
      }

      else if (data.dayChangeAvgPercentage == 0) {
        result = 'neutral';
      }

      data.result = result;

      // console.log('recent data', data);
      return camelizeKeys(data);

    })
  }


  addPick(pick) {
    return knex('picks')
    .insert(pick,'*')
    .then((result) => {
      return camelizeKeys(result)
    });
  }

  deleteEverything() {
    // console.log('working');

    return knex('order_filters_labels')
    .where('order_filter_label_id', '>', 0)
    .del()
    .then((result) => {
      return knex('labels')
      .where('label_id', '>', 0)
      .del()
      .then(result => {


    return knex('order_filters_picks')
    .where('order_filter_pick_id', '>', 0)
    .del()
    .then((result) => {
      return knex('company_data_picks')
      .where('company_data_pick_id', '>', 0)
      .del()
      .then(result => {
        return knex('company_data')
        .where('company_data_id', '>', 0)
        .del()
        .then(result => {
          return knex('picks')
          .where('pick_id', '>', 0)
          .del()
          .then(result => {
            return camelizeKeys(result)
          })
        })
          })
        })
      })
    });
  }

  deleteEverythingById(id) {
    // console.log('working');
    // return knex('order_filters_picks')
    // .where('order_filter_pick_id ', '>', 0)
    // .del()
    // .then((result) => {
    //   return knex('company_data_picks')
    //   .where('company_data_pick_id', '>', 0)
    //   .del()
    //   .then(result => {
    //     return knex('company_data')
    //     .where('company_data_id', '>', 0)
    //     .del()
    //     .then(result => {
          return knex('picks')
          .where('group_id', id)
          .del()
          .then(result => {
            return camelizeKeys(result)
          })
    //     })
    //   })
    // });
  }

  addCompanyDataAndPickIds(pickId, companyData) {
    // console.log('controller input', pickId, companyData);
    let dataToAdd = [];
    for (let i = 0; i < companyData.length; i++) {
      dataToAdd[i] = {pick_id: pickId, company_data_id: companyData[i].companyDataId};
    }
    // console.log('data to add', dataToAdd);
    return knex('company_data_picks')
      .insert(dataToAdd,'*')
      .then((result) => {
        return camelizeKeys(result)
      });
  }

    getCompanyDataAndPicks() {
      return knex('company_data_picks')
        .orderBy('company_data_pick_id')
        .then((result) => camelizeKeys(result));
    }



    getPicksAndSort() {
      return knex('picks')
        .orderBy('date_id')
        .then(result => {
          console.log('controller result', result);
          let count = 0;
          let dayArr = [result[0].date_id];
          let totalsArr = [result[0].day_change_avg_percentage];
          let finalArr = [];
          console.log('dayArr 1', dayArr);
          console.log('totalsArr 1', totalsArr);
          console.log('result length', result.length);

          // let dayTotal = result[i].day_change_avg_percentage;
          // dateInfo[`${dayArr[0]}`] = dayTotal;
          for (let i = 1; i < result.length; i++) {
            console.log('i', i);
            console.log('i index', i,  dayArr.indexOf(result[i].date_id));
            if (dayArr.indexOf(result[i].date_id) >= 0) {
              totalsArr[totalsArr.length - 1] += result[i].day_change_avg_percentage;
            }
            // dayTotal += result[i].day_change_avg_percentage;
            // dateInfo[`${dayArr[0]}`] = dayTotal;
            else if (!dayArr[dayArr.indexOf(result[i].date_id)]) {
              count++;
              console.log('stuff', result[i].date_id);
              console.log('stuff 2', dayArr);

              dayArr[dayArr.length] = result[i].date_id;
              console.log('dateArr 2', dayArr);
              totalsArr[totalsArr.length] = result[i].day_change_avg_percentage;
              // dateInfo[`${result[i].date_id}`] = dayTotal
              // dayTotal = 0;
            }
          }

          for (let i = 0; i < dayArr.length; i++) {
            totalsArr[i] = (totalsArr[i] / dayArr.length);
            finalArr[i] = {date_id: dayArr[i], day_change_avg_percentage: (totalsArr[i])}
          }
          console.log('dayArr', dayArr);
          console.log('totalsArr final', totalsArr);
          console.log('final arr', finalArr);

          // console.log('result', result);
          return camelizeKeys(finalArr)
        });
    }

    getPicksAndSort2() {
      return knex('picks')
        .orderBy(`group_id_2`)
        .orderBy('date_id')
        .then(result => {
          // console.log('result', result);

          let firstId = 0;
          let firstDayId = 0;
          let totCount = 2;

          let groupData = [{
            group_id: result[0].group_id_2,
            date_id: result[0].date_id,
            day_change_avg_percentage: result[0].day_change_avg_percentage,
          }];

          for (let i = 1; i < result.length; i++) {

            if (result[i - 1].group_id_2== result[i].group_id_2 && result[i - 1]. date_id == result[i].date_id) {
              groupData[groupData.length - 1].day_change_avg_percentage = ((groupData[groupData.length - 1].day_change_avg_percentage + result[i].day_change_avg_percentage) / totCount);
              totCount ++;
            }

            else if (result[i - 1].group_id_2 == result[i].group_id_2 && result[i - 1]. date_id != result[i].date_id) {
              totCount = 2;
              groupData[groupData.length] = {
                group_id: result[i].group_id_2,
                date_id: result[i].date_id,
                day_change_avg_percentage: result[i].day_change_avg_percentage,
              }
            }

            else if (result[i - 1].group_id_2 != result[i].group_id_2 && result[i - 1]. date_id != result[i].date_id) {
              totCount = 2;
              groupData[groupData.length] = {
                group_id: result[i].group_id_2,
                date_id: result[i].date_id,
                day_change_avg_percentage: result[i].day_change_avg_percentage,
              }
            }

            else if (result[i - 1].group_id_2 != result[i].group_id_2 && result[i - 1]. date_id == result[i].date_id) {
              totCount = 2;
              groupData[groupData.length] = {
                group_id: result[i].group_id_2,
                date_id: result[i].date_id,
                day_change_avg_percentage: result[i].day_change_avg_percentage,
              }
            }
            // let firstDayId = 0;
            // while (firstDayId)
            //
            // if (result[i].group_id != firstId) {
            //
            // }
            //
            // else {
            //   orderFilterCount++;
            //   for (let j = 0; j  )
            //   }
            //   // console.log('problem', final);
            //   // console.log('count', count);
            // }


          }
          //
          // let count2 = 0;
          // let firstId = 0;
          //
          // for (let j = 0; j < result.length; j++) {
          //   if (result[j].group_id != firstId) {
          //     count2++;
          //     let data = {
          //       // group_id: result[i].group_id,
          //       group_id: result[j].group_id,
          //
          //       //change this later when done testing
          //       date_id: result[j].date_id,
          //     }
          //
          //     final[`${count}`] = data;
          //     firstId = result[j].group_id;
          //   }
          //
          //   else {
          //     orderFilterCount++;
          //     final[`${count}`].order_filters[`${orderFilterCount}`] = {
          //       order_filter_id: result[i].order_filter_id,
          //       name: result[i].order_filter_name,
          //       number: result[i].number,
          //       symbol: result[i].symbol,
          //     }
          //     // console.log('problem', final);
          //     // console.log('count', count);
          //   }
          // }
          //
          //
          //
          // let final = [];
          //
          // console.log('controller result', result);
          //
          // for (let j = 0; )
          // let count = 0;
          // let dayArr = [result[0].date_id];
          // let totalsArr = [result[0].day_change_avg_percentage];
          // let finalArr = [];
          // console.log('dayArr 1', dayArr);
          // console.log('totalsArr 1', totalsArr);
          // console.log('result length', result.length);
          //
          // // let dayTotal = result[i].day_change_avg_percentage;
          // // dateInfo[`${dayArr[0]}`] = dayTotal;
          // for (let i = 1; i < result.length; i++) {
          //   console.log('i', i);
          //   console.log('i index', i,  dayArr.indexOf(result[i].date_id));
          //   if (dayArr.indexOf(result[i].date_id) >= 0) {
          //     totalsArr[totalsArr.length - 1] += result[i].day_change_avg_percentage;
          //   }
          //   // dayTotal += result[i].day_change_avg_percentage;
          //   // dateInfo[`${dayArr[0]}`] = dayTotal;
          //   else if (!dayArr[dayArr.indexOf(result[i].date_id)]) {
          //     count++;
          //     console.log('stuff', result[i].date_id);
          //     console.log('stuff 2', dayArr);
          //
          //     dayArr[dayArr.length] = result[i].date_id;
          //     console.log('dateArr 2', dayArr);
          //     totalsArr[totalsArr.length] = result[i].day_change_avg_percentage;
          //     // dateInfo[`${result[i].date_id}`] = dayTotal
          //     // dayTotal = 0;
          //   }
          // }
          //
          // for (let i = 0; i < dayArr.length; i++) {
          //   totalsArr[i] = (totalsArr[i] / dayArr.length);
          //   finalArr[i] = {date_id: dayArr[i], day_change_avg_percentage: (totalsArr[i]), group_id: dayArr[i].group_id}
          // }
          // console.log('dayArr', dayArr);
          // console.log('totalsArr final', totalsArr);
          // console.log('final arr', finalArr);

          // console.log('result', result);
          console.log('group data', groupData);
          return camelizeKeys(groupData)
        });
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



    getPicksByTickers(data) {

      // console.log('controller input', data);
      // each pick will have many filters and each filter will have any picks. maybe not actually
      // console.log('controller original data', data);
      let start_date_id = data.start_date_id;
      // let end_date_id = data.end_date_id;
      // let dateArr = [];
      let sell_period = data.sell_period;
      let order_filters = [];
      let keys = Object.keys(data.order_filters);
      for (let i = 0; i < keys.length; i++) {
          order_filters[i] = data.order_filters[`${keys[i]}`];

      }

      data.order_filters = order_filters;

      // let order_filters = [];
      // let keys = Object.keys(data.order_filters);
      // for (let i = 0; i < 8; i++) {
      //   if (keys[i]) {
      //     order_filters[i] = data.order_filters[`${keys[i]}`];
      //   }
      //
      //   else {
      //     order_filters[i] = {name: 'daily_stock_info_id', symbol: '>', number: 0}
      //   }
      // }
      // let select_filters = data.select_filters;
      // let limit = data.limit;
      let company_ids = data.company_ids;;
      let company_data = {};
      // data.order_filters = order_filters;


      // for (let i = start_date_id; i <= end_date_id; i++) {
      //   dateArr.push(i);
      // }

      // console.log('data', data);
      // console.log('order_filters', order_filters);
      return knex('daily_stock_info')
      .select('daily_stock_info_id', 'date_id', 'ticker', 'company_id', 'open_price', 'closing_price', 'eod_to_sod_percent_change')
      // .whereIn('date_id', dateArr)
      .where('date_id', start_date_id)
      .whereIn('company_id', company_ids)
      .whereNotNull('company_id')
      .then(result => {
        data.company_data = company_data;

        let weakestLinks = {};
        for (let i = 0; i < result.length; i ++) {
          //maybe optimize this more with an integer instead of array
          weakestLinks[`${data.company_ids[i]}`] = [data.company_ids[i]];
        }

        // console.log('what I need');
        // console.log('data', data);
        let final = {data: data, weakestLinks: weakestLinks}

        // console.log('pure result', result);
        // for (let i = 0; i < result.length; i++) {
        //   company_ids[i] = result[i].company_id;
        //   // company_data[`${result[i].company_id}`] = {
        //   //   company_id: result[i].company_id,
        //   // }
        // }
        // data.company_ids = company_ids;
        // data.company_data = company_data;
        // let weakestLinks = {};
        // for (let i = 0; i < result.length; i ++) {
        //   //maybe optimize this more with an integer instead of array
        //   weakestLinks[`${data.company_ids[i]}`] = [data.company_ids[i]];
        // }

        // console.log('what I need');
        // console.log('data', data);
        // let final = {data: data, weakestLinks: weakestLinks}
        // console.log('controller final', final);
        // console.log('controller final', final);
        return final;
      })
    }


    getFullDataByTickers(originalData) {
      // console.log('controller data', originalData);

      let data = originalData.data;
      let weakestLinks = originalData.weakestLinks;

      let start_date_id = data.start_date_id;
      // let end_date_id = data.end_date_id;
      // let dateArr = [];
      let sell_period = data.sell_period;
      // let select_filters = data.select_filters;
      let company_ids = data.company_ids;
      let company_data = data.company_data;

      return knex('daily_stock_info')
      .select('company_id', 'open_price', 'closing_price', 'eod_to_sod_percent_change', 'eod_to_eod_percent_change', 'sod_to_eod_percent_change', 'eod_to_sod_absolute_change', 'eod_to_eod_absolute_change', 'sod_to_eod_absolute_change', 'today_market_cap', 'volume')
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

        // for (let i = 0; i < data.company_ids.length; i++) {
        //   // console.log('problem link', data.company_ids[i]);
        //   if (weakestLinks[`${data.company_ids[i]}`].length < 4) {
        //     data.company_ids.splice(data.company_ids.indexOf(data.company_ids[i]), 1);
        //   }
        // }

        // data.company_ids.splice(limit);


        for (let i = 0; i < data.company_ids.length; i++) {
          company_data[`${data.company_ids[i]}`] = {
            company_id: data.company_ids[i],
            pc: data.pc,
          }

          // if (order_filters[`${0}`].symbol == '<') {
          //   company_data[`${data.company_ids[i]}`].pc = 'c';
          // }
          //
          // else if (order_filters[`${0}`].symbol == '>') {
          //   company_data[`${data.company_ids[i]}`].pc = 'p';
          // }
        }


        // console.log('newResult', newResult);
        data.changePercentage = [];
        data.changeAbsolute = [];
        data.overallChange = [];
        // console.log('data', data);
        // console.log('newResult', newResult);
        for (let i = 0; i < data.company_ids.length; i ++) {
          // add initial volume. need to add volume to weakest link first

          // find a way to check if all these companies have data for these dates
          data.company_data[`${data.company_ids[i]}`].period11 = weakestLinks[`${data.company_ids[i]}`][1].open_price;
          data.company_data[`${data.company_ids[i]}`].period12 = weakestLinks[`${data.company_ids[i]}`][1].closing_price;
          data.company_data[`${data.company_ids[i]}`].period21 = weakestLinks[`${data.company_ids[i]}`][2].open_price;
          data.company_data[`${data.company_ids[i]}`].period22 = weakestLinks[`${data.company_ids[i]}`][2].closing_price;
          data.company_data[`${data.company_ids[i]}`].period31 = weakestLinks[`${data.company_ids[i]}`][3].open_price;
          data.company_data[`${data.company_ids[i]}`].period32 = weakestLinks[`${data.company_ids[i]}`][3].closing_price;

          data.company_data[`${data.company_ids[i]}`].eod_to_sod_percent_change = weakestLinks[`${data.company_ids[i]}`][1].eod_to_sod_percent_change;
          data.company_data[`${data.company_ids[i]}`].eod_to_eod_percent_change = weakestLinks[`${data.company_ids[i]}`][1].eod_to_eod_percent_change;
          data.company_data[`${data.company_ids[i]}`].sod_to_eod_percent_change = weakestLinks[`${data.company_ids[i]}`][1].sod_to_eod_percent_change;
          data.company_data[`${data.company_ids[i]}`].eod_to_sod_absolute_change = weakestLinks[`${data.company_ids[i]}`][1].eod_to_sod_absolute_change;
          data.company_data[`${data.company_ids[i]}`].eod_to_eod_absolute_change = weakestLinks[`${data.company_ids[i]}`][1].eod_to_eod_absolute_change;
          data.company_data[`${data.company_ids[i]}`].sod_to_eod_absolute_change = weakestLinks[`${data.company_ids[i]}`][1].sod_to_eod_absolute_change;

          data.company_data[`${data.company_ids[i]}`].today_market_cap = weakestLinks[`${data.company_ids[i]}`][1].today_market_cap;
          data.company_data[`${data.company_ids[i]}`].volume = weakestLinks[`${data.company_ids[i]}`][1].volume;





          // data.company_data[`${newResult[i].company_id}`].period12 = newResult[i].closing_price;
          // data.company_data[`${newResult[i].company_id}`].period21 = newResult[i + 1].open_price;
          // data.company_data[`${newResult[i].company_id}`].period22 = newResult[i + 1].closing_price;
          // console.log('this is the problem', data);
          // console.log('newResult', newResult);
          // data.company_data[`${newResult[i].company_id}`].period31 = newResult[i + 2].open_price;
          // data.company_data[`${newResult[i].company_id}`].period32 = newResult[i + 2].closing_price;
          data.company_data[`${data.company_ids[i]}`].changePercentage = calculatePercentageGainLoss((data.company_data[`${data.company_ids[i]}`][`${data.buy_period}`]), data.company_data[`${data.company_ids[i]}`][`${data.sell_period}`], data.company_data[`${data.company_ids[i]}`].pc) * 100;
          data.company_data[`${data.company_ids[i]}`].changeAbsolute = calculateAbsoluteGainLoss((data.company_data[`${data.company_ids[i]}`][`${data.buy_period}`]), data.company_data[`${data.company_ids[i]}`][`${data.sell_period}`], data.company_data[`${data.company_ids[i]}`].pc);
          data.company_data[`${data.company_ids[i]}`].overallChange = calculatePercentageGainLoss((data.company_data[`${data.company_ids[i]}`][`${data.buy_period}`]), data.company_data[`${data.company_ids[i]}`][`${data.sell_period}`], 'c') * 100;


          // data.company_data[`${newResult[i].company_id}`].changeAbsolute = calculateAbsolute((data.company_data[`${newResult[i].company_id}`][`${data.buy_period}`]), data.company_data[`${newResult[i].company_id}`][`${data.sell_period}`]);
          data.changePercentage.push(data.company_data[`${data.company_ids[i]}`].changePercentage);
          data.changeAbsolute.push(data.company_data[`${data.company_ids[i]}`].changeAbsolute);
          data.overallChange.push(data.company_data[`${data.company_ids[i]}`].overallChange);

        }

        let sum = data.changePercentage.reduce((previous, current) =>  current = (current + previous));
        data.dayChangeAvgPercentage = sum / data.changePercentage.length;

        sum = data.changeAbsolute.reduce((previous, current) =>  current = (current + previous));
        data.dayChangeAvgAbsolute = sum / data.changeAbsolute.length;

        sum = data.overallChange.reduce((previous, current) =>  current = (current + previous));
        data.dayOverallChange = sum / data.overallChange.length;


        data.changePercentage.sort((a, b) => a - b);
        data.changeAbsolute.sort((a, b) => a - b);

        let lowMiddle = Math.floor((data.changePercentage.length - 1) / 2);
        let highMiddle = Math.ceil((data.changePercentage.length - 1) / 2);

        data.dayChangeMedianPercent = (data.changePercentage[lowMiddle] + data.changePercentage[highMiddle]) / 2;
        data.dayChangeMedianAbsolute = (data.changeAbsolute[lowMiddle] + data.changeAbsolute[highMiddle]) / 2;

        // change this later to compare to the market as a whole
        let result = '';
        if (data.dayChangeAvgPercentage > 0) {
          result = 'good';
        }

        else if (data.dayChangeAvgPercentage < 0) {
          result = 'bad';
        }

        else if (data.dayChangeAvgPercentage == 0) {
          result = 'neutral';
        }

        data.result = result;

        // console.log('recent data', data);
        return camelizeKeys(data);

      })
    }


}

module.exports = Picks;
