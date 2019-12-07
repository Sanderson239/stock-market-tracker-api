
exports.up = function(knex, Promise) {
  // UP adds / creates tables / fields to the DB
  return knex.schema.createTable('picks', (table) => {
    // I should add volume here
    table.increments('pick_id').primary();
    table.integer('date_id').references('dates.date_id');
    // table.integer('order_filter_id').references('order_filters.order_filter_id');
    // going to have to make many composite tables for order filters. many to many relationship
    table.integer('select_filter_id').references('select_filters.select_filter_id');
    table.float('group_id').notNullable().defaultTo(0);
    table.int('group_id_2').notNullable().defaultTo(0);
    table.string('buy_period').notNullable().defaultTo('');
    table.string('sell_period').notNullable().defaultTo('');
    table.string('result').notNullable().defaultTo('');
    table.integer('grade').notNullable().defaultTo(0);
    table.float('day_change_avg_percentage').notNullable().defaultTo(0);
    table.float('day_change_avg_absolute').notNullable().defaultTo(0);
    table.float('day_overall_change').notNullable().defaultTo(0);
    table.float('day_change_median_percent').notNullable().defaultTo(0);
    table.float('day_change_median_absolute').notNullable().defaultTo(0);
    table.string('pc').notNullable().defaultTo('');
    table.integer('limit').notNullable().defaultTo(0);
    table.string('reason').notNullable().defaultTo('none');
    table.string('rating').notNullable().defaultTo('neutral');


  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('picks');
};
