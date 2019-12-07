'use strict';

const knex = require('../../knex.js');
const { decamelizeKeys, camelizeKeys } = require('humps');

class Dates {
  getDate() {
    return knex('dates')
      .orderBy('date_id')
      .then((result) => camelizeKeys(result));
  }

  getDateById(date_id) {
    return knex('dates')
      .where('date_id', date_id)
      .first()
      .then((result) => {
        return camelizeKeys(result);
      });
  }

  getDailyInfo(start_date, end_date) {
    return knex('dates')
    .select('sandp_eod_to_eod_percent_change', 'nasdaq_eod_to_eod_percent_change', 'dow_jones_eod_to_eod_percent_change')
    .whereBetween('date_id', [start_date, end_date])
    .orderBy('date_id')
    .then(result => {
      return camelizeKeys(result)

    })
  }

  //maybe need to change this
  getDateByDate(date) {
    return knex('dates')
      .where('date', date)
      .first()
      .then((result) => {
        return camelizeKeys(result);
      });
  }

  addDate(date) {
    return knex('dates')
      .insert(date,'*')
      .then((result) => {
        return camelizeKeys(result)
      });
  }

  updateDate(date) {
    const date_id = date.date_id;
    return knex('dates')
      .where('date_id', date.date_id)
      .update({
        date: date.date,
        sandp_sod: date.sandp_sod,
        sandp_eod: date.sandp_eod,
        nasdaq_sod: date.nasdaq_sod,
        nasdaq_eod: date.nasdaq_eod,
        dow_jones_sod: date.dow_jones_sod,
        dow_jones_eod: date.dow_jones_eod,
        sandp_eod_to_eod_percent_change: date.sandp_eod_to_eod_percent_change,
        sandp_eod_to_sod_percent_change: date.sandp_eod_to_sod_percent_change,
        sandp_sod_to_eod_percent_change: date.sandp_sod_to_eod_percent_change,
        sandp_eod_to_eod_absolute_change: date.sandp_eod_to_eod_absolute_change,
        sandp_eod_to_sod_absolute_change: date.sandp_eod_to_sod_absolute_change,
        sandp_sod_to_eod_absolute_change: date.sandp_sod_to_eod_absolute_change,
        nasdaq_eod_to_eod_percent_change: date.nasdaq_eod_to_eod_percent_change,
        nasdaq_eod_to_sod_percent_change: date.nasdaq_eod_to_sod_percent_change,
        nasdaq_sod_to_eod_percent_change: date.nasdaq_sod_to_eod_percent_change,
        nasdaq_eod_to_eod_absolute_change: date.nasdaq_eod_to_eod_absolute_change,
        nasdaq_eod_to_sod_absolute_change: date.nasdaq_eod_to_sod_absolute_change,
        nasdaq_sod_to_eod_absolute_change: date.nasdaq_sod_to_eod_absolute_change,
        dow_jones_eod_to_eod_percent_change: date.dow_jones_eod_to_eod_percent_change,
        dow_jones_eod_to_sod_percent_change: date.dow_jones_eod_to_sod_percent_change,
        dow_jones_sod_to_eod_percent_change: date.dow_jones_sod_to_eod_percent_change,
        dow_jones_eod_to_eod_absolute_change: date.dow_jones_eod_to_eod_absolute_change,
        dow_jones_eod_to_sod_absolute_change: date.dow_jones_eod_to_sod_absolute_change,
        dow_jones_sod_to_eod_absolute_change: date.dow_jones_sod_to_eod_absolute_change,
        // shanghai_total: date.shanghai_total,
        // hong_kong_total: date.hong_kong_total,
        // shanghai_eod_to_eod_percent_change: date.shanghai_eod_to_eod_percent_change,
        // shanghai_eod_to_sod_percent_change: date.shanghai_eod_to_sod_percent_change,
        // shanghai_sod_to_eod_percent_change: date.shanghai_sod_to_eod_percent_change,
        // shanghai_eod_to_eod_absolute_change: date.shanghai_eod_to_eod_absolute_change,
        // shanghai_eod_to_sod_absolute_change: date.shanghai_eod_to_sod_absolute_change,
        // shanghai_sod_to_eod_absolute_change: date.shanghai_sod_to_eod_absolute_change,
        // hong_kong_eod_to_eod_percent_change: date.hong_kong_eod_to_eod_percent_change,
        // hong_kong_eod_to_sod_percent_change: date.hong_kong_eod_to_sod_percent_change,
        // hong_kong_sod_to_eod_percent_change: date.hong_kong_sod_to_eod_percent_change,
        // hong_kong_eod_to_eod_absolute_change: date.hong_kong_eod_to_eod_absolute_change,
        // hong_kong_eod_to_sod_absolute_change: date.hong_kong_eod_to_sod_absolute_change,
        // hong_kong_sod_to_eod_absolute_change: date.hong_kong_sod_to_eod_absolute_change,
      }, '*')
      .then((result) => {
        return camelizeKeys(result)
      });
  }

  deleteDate(date_id) {
    return knex('dates')
      .del()
      .where('date_id', date_id)
      .returning('*')
      .then((result) => {
        return camelizeKeys(result)
      });
  }



}

module.exports = Dates;
