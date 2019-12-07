'use strict';

exports.up = function(knex) {
  return knex.schema.createTable('company_data_picks', (table) => {
    table.increments('company_data_pick_id').primary();
    table.integer('pick_id').references('picks.pick_id').notNullable().onDelete('CASCADE');
    // this is the duplicate i need to look for. Or i can decide not ot do anything about it. look for where the duplicate would be. if its the same date_id, same company_data_id, different pick group_id, than it is a duplicate
    table.integer('company_data_id').references('company_data.company_data_id').notNullable().onDelete('CASCADE');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('company_data_picks');
}
