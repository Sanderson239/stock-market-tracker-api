'use strict';

exports.up = function(knex) {
  return knex.schema.createTable('labels', (table) => {
    table.increments('label_id').primary();
    table.integer('pick_id').references('picks.pick_id').notNullable().onDelete('CASCADE');
    table.string('buy').notNullable().defaultTo('');
    table.string('sell').notNullable().defaultTo('');
    table.string('limit').notNullable().defaultTo(0);
    table.string('reason').notNullable().defaultTo('none');
    table.string('rating').notNullable().defaultTo('neutral');

  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('labels');
}
