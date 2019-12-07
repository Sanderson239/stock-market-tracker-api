'use strict';

const knex = require('../../knex.js');
const { decamelizeKeys, camelizeKeys } = require('humps');

class SelectFilters {
  getSelectFilter() {
    return knex('select_filters')
      .selectBy('select_filter_id')
      .then((result) => camelizeKeys(result));
  }

  getSelectFilterById(selectFilter_id) {
    return knex('select_filters')
      .where('select_filter_id', selectFilter_id)
      .first()
      .then((result) => {
        return camelizeKeys(result);
      });
  }

  addSelectFilter(selectFilter) {
    return knex('select_filters')
      .insert(selectFilter,'*')
      .then((result) => {
        return camelizeKeys(result)
      });
  }

  updateSelectFilter(selectFilter) {
    const selectFilter_id = selectFilter.selectFilter_id;
    return knex('select_filters')
      .where('select_filter_id', selectFilter.selectFilter_id)
      .update({
        select_filter_id: selectFilter.selectFilter_id,
        select_filter_name: selectFilter.selectFilter_name,
        symbol: selectFilter.symbol,
        number: selectFilter.number,
      }, '*')
      .then((result) => {
        return camelizeKeys(result)
      });
  }

  deleteSelectFilter(selectFilter_id) {
    return knex('select_filters')
      .del()
      .where('select_filter_id', selectFilter_id)
      .returning('*')
      .then((result) => {
        return camelizeKeys(result)
      });
  }



}

module.exports = SelectFilters;
