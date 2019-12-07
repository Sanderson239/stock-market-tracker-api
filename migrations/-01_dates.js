
exports.up = function(knex, Promise) {
  return knex.schema.createTable('dates', (table) => {
    table.increments('date_id').primary();
    table.string('date').notNullable().defaultTo('');
    table.float('sandp_total').notNullable().defaultTo(0);
    table.float('sandp_sod').notNullable().defaultTo(0);
    table.float('sandp_eod').notNullable().defaultTo(0);
    table.float('nasdaq_total').notNullable().defaultTo(0);
    table.float('nasdaq_sod').notNullable().defaultTo(0);
    table.float('nasdaq_eod').notNullable().defaultTo(0);
    table.float('dow_jones_total').notNullable().defaultTo(0);
    table.float('dow_jones_sod').notNullable().defaultTo(0);
    table.float('dow_jones_eod').notNullable().defaultTo(0);
    table.float('sandp_eod_to_eod_percent_change').notNullable().defaultTo(0);
    table.float('sandp_eod_to_sod_percent_change').notNullable().defaultTo(0);
    table.float('sandp_sod_to_eod_percent_change').notNullable().defaultTo(0);
    table.float('sandp_eod_to_eod_absolute_change').notNullable().defaultTo(0);
    table.float('sandp_eod_to_sod_absolute_change').notNullable().defaultTo(0);
    table.float('sandp_sod_to_eod_absolute_change').notNullable().defaultTo(0);
    table.float('nasdaq_eod_to_eod_percent_change').notNullable().defaultTo(0);
    table.float('nasdaq_eod_to_sod_percent_change').notNullable().defaultTo(0);
    table.float('nasdaq_sod_to_eod_percent_change').notNullable().defaultTo(0);
    table.float('nasdaq_eod_to_eod_absolute_change').notNullable().defaultTo(0);
    table.float('nasdaq_eod_to_sod_absolute_change').notNullable().defaultTo(0);
    table.float('nasdaq_sod_to_eod_absolute_change').notNullable().defaultTo(0);
    table.float('dow_jones_eod_to_eod_percent_change').notNullable().defaultTo(0);
    table.float('dow_jones_eod_to_sod_percent_change').notNullable().defaultTo(0);
    table.float('dow_jones_sod_to_eod_percent_change').notNullable().defaultTo(0);
    table.float('dow_jones_eod_to_eod_absolute_change').notNullable().defaultTo(0);
    table.float('dow_jones_eod_to_sod_absolute_change').notNullable().defaultTo(0);
    table.float('dow_jones_sod_to_eod_absolute_change').notNullable().defaultTo(0);
    table.float('shanghai_total').notNullable().defaultTo(0);
    table.float('shanghai_sod').notNullable().defaultTo(0);
    table.float('shanghai_eod').notNullable().defaultTo(0);
    table.float('hong_kong_total').notNullable().defaultTo(0);
    table.float('hong_kong_sod').notNullable().defaultTo(0);
    table.float('hong_kong_eod').notNullable().defaultTo(0);
    table.float('shanghai_eod_to_eod_percent_change').notNullable().defaultTo(0);
    table.float('shanghai_eod_to_sod_percent_change').notNullable().defaultTo(0);
    table.float('shanghai_sod_to_eod_percent_change').notNullable().defaultTo(0);
    table.float('shanghai_eod_to_eod_absolute_change').notNullable().defaultTo(0);
    table.float('shanghai_eod_to_sod_absolute_change').notNullable().defaultTo(0);
    table.float('shanghai_sod_to_eod_absolute_change').notNullable().defaultTo(0);
    table.float('hong_kong_eod_to_eod_percent_change').notNullable().defaultTo(0);
    table.float('hong_kong_eod_to_sod_percent_change').notNullable().defaultTo(0);
    table.float('hong_kong_sod_to_eod_percent_change').notNullable().defaultTo(0);
    table.float('hong_kong_eod_to_eod_absolute_change').notNullable().defaultTo(0);
    table.float('hong_kong_eod_to_sod_absolute_change').notNullable().defaultTo(0);
    table.float('hong_kong_sod_to_eod_absolute_change').notNullable().defaultTo(0);
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('dates');
};
