'use strict';

const knex = require('../../knex.js');
const { decamelizeKeys, camelizeKeys } = require('humps');

class DailyStockInfo {
  getDailyStockInfo() {
    return knex('daily_stock_info')
      .orderBy('daily_stock_info_id')
      .then((result) => camelizeKeys(result));
  }

  getDailyStockInfoById(daily_stock_info_id) {
    return knex('daily_stock_info')
      .where('daily_stock_info_id', daily_stock_info_id)
      .first()
      .then((result) => {
        return camelizeKeys(result);
      });
  }

  getDailyStockInfoByDateId(date_id) {
    return knex('daily_stock_info')
    .select('daily_stock_info_id', 'date_id', 'company_id', 'ticker', 'open_price', 'closing_price', 'eod_to_sod_percent_change', 'sod_to_eod_percent_change', 'volume', 'today_market_cap')
      .where('date_id', date_id)
      .whereNotNull('company_id')
      // .orderBy('daily_stock_info_id')
      .orderBy('eod_to_sod_percent_change')
      // .orderBy('daily_stock_info_id')
      // .limit(10)
      .then((result) => {
        return camelizeKeys(result);
      });
  }

  getDailyStockInfoByDateIdOrderByCompanyId(date_id) {
    return knex('daily_stock_info')
    .select('daily_stock_info_id', 'date_id', 'company_id', 'ticker', 'open_price', 'closing_price', 'eod_to_eod_percent_change', 'sod_to_eod_percent_change', 'volume', 'today_market_cap')
      .whereIn('date_id', [(date_id - 1), date_id])
      .where('company_id', '<', 2)
      .whereNotNull('company_id')
      // .orderBy('daily_stock_info_id')
      .orderBy('company_id')
      .orderBy('date_id')
      // .orderBy('daily_stock_info_id')
      // .limit(10)
      .then((result) => {
        // console.log('result', result);
        return camelizeKeys(result);
      });
  }
// maybe ill need it again someday
  getDailyStockInfoCompanyIdAndDateId(company_id, date_id) {
    return knex('daily_stock_info')
    .select('daily_stock_info_id', 'date_id', 'company_id', 'open_price', 'closing_price', 'eod_to_eod_percent_change', 'sod_to_eod_percent_change', 'volume', 'today_market_cap')
      .whereIn('date_id', [date_id - 1, date_id])
      .where('company_id', company_id)
      .orderBy('date_id')
      .then((result) => {
        console.log('stock info by company id', result);
        return camelizeKeys(result);
      });
  }

  getDailyStockInfoCompanyIdAndDateId2(company_id, date_id) {
    let datesArr = [];
    for (let i = date_id; i <= 5087; i++) {
      datesArr.push(i)
    }
    return knex('daily_stock_info')
    .select('daily_stock_info_id', 'date_id', 'company_id', 'open_price', 'closing_price', 'eod_to_eod_percent_change', 'sod_to_eod_percent_change', 'volume', 'today_market_cap')
      .whereIn('date_id', datesArr)
      .where('company_id', company_id)
      .orderBy('date_id')
      .then((result) => {
        console.log('stock info by company id', result);
        return camelizeKeys(result);
      });
  }

  getMaxId(daily_stock_info_id) {
    return knex('daily_stock_info').max('daily_stock_info_id')
      .first()
      .then((result) => {
        return camelizeKeys(result);
      });
  }

  // addDailyStockInfo(dailyStockInfo, ticker, date) {
  //   // console.log(date);
  //   return knex('companies')
  //   .select('company_id')
  //   .where('ticker', '=', ticker)
  //   .then(companyId => {
  //     dailyStockInfo.company_id = companyId[0].company_id;
  //     knex('dates')
  //     .select('date_id')
  //     .where('date', '=', date)
  //     .then(dateId => {
  //       // if(!dateId[0]) {
  //       //   console.log('date', date);
  //       //   console.log('ticker', ticker);
  //       //   console.log('data', dailyStockInfo);
  //       // }
  //       dailyStockInfo.date_id = dateId[0].date_id;
  //       knex('daily_stock_info')
  //         .insert(dailyStockInfo,'*')
  //         .then((result) => {
  //           return camelizeKeys(result)
  //       });
  //     })
  //   });
  // }

  addDailyStockInfo(dailyStockInfo) {
    return knex('daily_stock_info')
      .insert(dailyStockInfo,'*')
      .then((result) => {
        return camelizeKeys(result)
      });
  }

addDailyStockInfoShells() {
  return knex('daily_stock_info')
    .insert({last_filing_date: 1},'*')
    .then((result) => {
      return camelizeKeys(result)
    });
}

  updateDailyStockInfo(dailyStockInfo) {
    if (dailyStockInfo.date_id < 5034) {
      console.log(dailyStockInfo);
    }
    return knex('daily_stock_info')
      .where('daily_stock_info_id', dailyStockInfo.daily_stock_info_id)
      .update({
        company_id: dailyStockInfo.company_id,
        open_price: dailyStockInfo.open_price,
        closing_price: dailyStockInfo.closing_price,
        date_id: dailyStockInfo.date_id,
        // last_filing_date: dailyStockInfo.last_filing_date,
        // ask_price: dailyStockInfo.ask_price,
        // bid_price: dailyStockInfo.bid_price,
        // last_price: dailyStockInfo.last_price,
        eod_to_eod_percent_change: dailyStockInfo.eod_to_eod_percent_change,
        eod_to_sod_percent_change: dailyStockInfo.eod_to_sod_percent_change,
        sod_to_eod_percent_change: dailyStockInfo.sod_to_eod_percent_change,
        eod_to_eod_absolute_change: dailyStockInfo.eod_to_eod_absolute_change,
        eod_to_sod_absolute_change: dailyStockInfo.eod_to_sod_absolute_change,
        sod_to_eod_absolute_change: dailyStockInfo.sod_to_eod_absolute_change,
        volume: dailyStockInfo.volume,
      }, '*')
      .then((result) => {
        return camelizeKeys(result)
      });
  }

  // updateDailyStockInfo2(dailyStockInfo) {
  //   return knex('daily_stock_info')
  //     .where('daily_stock_info_id', dailyStockInfo.daily_stock_info_id)
  //     .update({
  //       // daily_stock_info_id: dailyStockInfo.daily_stock_info_id,
  //       company_id: dailyStockInfo.company_id,
  //       open_price: dailyStockInfo.open_price,
  //       closing_price: dailyStockInfo.closing_price,
  //       date_id: dailyStockInfo.date_id,
  //       // last_filing_date: dailyStockInfo.last_filing_date,
  //       // ask_price: dailyStockInfo.ask_price,
  //       // bid_price: dailyStockInfo.bid_price,
  //       // last_price: dailyStockInfo.last_price,
  //       // eod_to_eod_percent_change: dailyStockInfo.eod_to_eod_percent_change,
  //       // eod_to_sod_percent_change: dailyStockInfo.eod_to_sod_percent_change,
  //       sod_to_eod_percent_change: dailyStockInfo.sod_to_eod_percent_change,
  //       // eod_to_eod_absolute_change: dailyStockInfo.eod_to_eod_absolute_change,
  //       // eod_to_sod_absolute_change: dailyStockInfo.eod_to_sod_absolute_change,
  //       sod_to_eod_absolute_change: dailyStockInfo.sod_to_eod_absolute_change,
  //       // volume: dailyStockInfo.volume,
  //     }, '*')
  //     .then((result) => {
  //       return camelizeKeys(result)
  //     });
  // }

  deleteDailyStockInfo(daily_stock_info_id) {
    return knex('daily_stock_info')
      .del()
      .where('daily_stock_info_id', daily_stock_info_id)
      .returning('*')
      .then((result) => {
        return camelizeKeys(result)
      });
  }

  updateDailyStockInfoMarketCap(dailyStockInfo) {
    return knex('daily_stock_info')
      .where('daily_stock_info_id', dailyStockInfo.dailyStockInfoId)
      .update({
        today_market_cap: dailyStockInfo.todayMarketCap,
      }, '*')
      .then((result) => {
        // console.log('result', result);
        return camelizeKeys(result)
      });
  }



}

module.exports = DailyStockInfo;
