'use strict';

const knex = require('../../knex.js');
const { decamelizeKeys, camelizeKeys } = require('humps');

class OrderFilters {
  getOrderFilter() {
    return knex('order_filters')
      .orderBy('order_filter_id')
      .then((result) => camelizeKeys(result));
  }

  getOrderFilterById(orderFilter_id) {
    return knex('order_filters')
      .where('order_filter_id', orderFilter_id)
      .first()
      .then((result) => {
        return camelizeKeys(result);
      });
  }

  getOrderFilterByFilter(orderFilter) {
    console.log('controller order filter', orderFilter);
    let keys = Object.keys(orderFilter);
    console.log('controller keys', keys);
    let orderFilterArr = [];
    for (let i = 0; i < keys.length; i ++ ) {
      console.log('i', i, orderFilter[`${i}`].name, orderFilter[`${i}`].symbol);
      orderFilterArr.push(orderFilter[`${i}`].name);
      orderFilterArr.push(orderFilter[`${i}`].symbol);
    }
    console.log('controller order filter array', orderFilterArr);
    return knex('order_filters')
      .whereIn('order_filter_name', orderFilterArr)
      .whereIn('symbol', orderFilterArr)
      .orderBy('order_filter_id')
      .then((result) => {
        return camelizeKeys(result);
      });
  }

  addOrderFilter(orderFilter) {
    return knex('order_filters')
      .insert(orderFilter,'*')
      .then((result) => {
        return camelizeKeys(result)
      });
  }

  addOrderFilterPickIds(pickId, orderFilters) {
    let dataToAdd = [];
    for (let i = 0; i < orderFilters.length; i++) {
      if (orderFilters[i].name != 'daily_stock_info_id') {
        dataToAdd[i] = {
          pick_id: pickId,
          order_filter_id: orderFilters[i].orderFilterId,
          number: orderFilters[i].number,
        }
      }
    }

    return knex('order_filters_picks')
      .insert(dataToAdd,'*')
      .then((result) => {
        return camelizeKeys(result)
      });
  }

  getOrderFiltersAndPicks() {
    return knex('order_filters_picks')
      .orderBy('order_filter_pick_id')
      .then((result) => camelizeKeys(result));
  }

  updateOrderFilter(orderFilter) {
    // const order_filter_id = orderFilter.order_filter_id;
    console.log('controller order filter', orderFilter);

    for(let i = 0; i < orderFilter.length; i++) {
      console.log(i);


    return knex('order_filters')
      .where('order_filter_id', orderFilter[i].orderFilterId)
      .update({
        order_filter_id: orderFilter[i].orderFilterId,
        order_filter_name: orderFilter[i].orderFilterName,
        symbol: orderFilter[i].symbol,
        number: orderFilter[i].number,
      }, '*')
      // .then((result) => {
      //   return camelizeKeys(result)
      // });
    }
  }

  deleteOrderFilter(orderFilter_id) {
    return knex('order_filters')
      .del()
      .where('order_filter_id', orderFilter_id)
      .returning('*')
      .then((result) => {
        return camelizeKeys(result)
      });
  }



}

module.exports = OrderFilters;
