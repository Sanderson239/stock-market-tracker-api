// probably wont need this
'use strict';

exports.up = function(knex) {
  return knex.schema.createTable('order_filters_picks', (table) => {
    table.increments('order_filter_pick_id').primary();
    table.integer('pick_id').references('picks.pick_id').notNullable().onDelete('CASCADE');
    table.integer('order_filter_id').references('order_filters.order_filter_id').notNullable().onDelete('CASCADE');
    table.float('number').notNullable().defaultTo(0);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('order_filters_picks');
}
