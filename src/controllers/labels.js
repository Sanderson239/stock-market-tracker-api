'use strict';

const knex = require('../../knex.js');
const { decamelizeKeys, camelizeKeys } = require('humps');

class Labels {
  getLabels() {
    return knex('labels')
      .orderBy('label_id')
      .then((result) => camelizeKeys(result));
  }

  getAllLabelInfo() {
    return knex('labels')
    .join('picks', 'labels.pick_id', '=', 'picks.pick_id')
    .join('order_filters_labels', 'labels.label_id', '=', 'order_filters_labels.label_id')
    .join('order_filters', 'order_filters_labels.order_filter_id', '=', 'order_filters.order_filter_id')
    .select('picks.group_id', 'picks.group_id_2', 'labels.buy', 'labels.sell', 'labels.limit', 'labels.reason', 'labels.rating', 'order_filters.order_filter_name', 'order_filters.symbol', 'order_filters_labels.number')
      .orderBy('picks.group_id')
      .then((result) => camelizeKeys(result));
  }

  getOrderFiltersAndLabels() {
    return knex('order_filters_labels')
      .orderBy('order_filter_label_id')
      .then((result) => camelizeKeys(result));
  }



  addLabel(labels) {
    // console.log('labels', labels);
    return knex('labels')
      .insert(labels,'*')
      .then((result) => {
        return camelizeKeys(result)
      });
  }


  addOrderFilterLabelIds(labelId, orderFilters) {
    let dataToAdd = [];
    for (let i = 0; i < orderFilters.length; i++) {
      if (orderFilters[i].name != 'daily_stock_info_id') {
        dataToAdd[i] = {
          label_id: labelId,
          order_filter_id: orderFilters[i].orderFilterId,
          number: orderFilters[i].number,
        }
      }
    }

    return knex('order_filters_labels')
      .insert(dataToAdd,'*')
      .then((result) => {
        return camelizeKeys(result)
      });
  }



}

module.exports = Labels;
