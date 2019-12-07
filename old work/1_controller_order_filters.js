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
    return knex('order_filters')
      .where('order_filter_name', orderFilter.name)
      .where('symbol', orderFilter.symbol)
      .first()
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

  updateOrderFilter(orderFilter) {
    const order_filter_id = orderFilter.order_filter_id;
    return knex('order_filters')
      .where('order_filter_id', order_filter_id)
      .update({
        order_filter_id: order_filter_id,
        order_filter_name: orderFilter.order_filter_name,
        symbol: orderFilter.symbol,
        number: orderFilter.number,
      }, '*')
      .then((result) => {
        return camelizeKeys(result)
      });
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
