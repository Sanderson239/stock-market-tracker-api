
exports.up = function(knex, Promise) {
  // UP adds / creates tables / fields to the DB
return knex.schema.createTable('company_data', (table) => {
  table.increments('company_data_id').primary();
  table.integer('company_id').references('companies.company_id');
  table.string('pc').notNullable().defaultTo('');
  table.string('reason').notNullable().defaultTo('');
  table.string('rating').notNullable().defaultTo('');
  table.float('after_hours').notNullable().defaultTo(0);
  table.float('pre_market').notNullable().defaultTo(0);
  table.float('period11').notNullable().defaultTo(0);
  table.float('period12').notNullable().defaultTo(0);
  table.float('period21').notNullable().defaultTo(0);
  table.float('period22').notNullable().defaultTo(0);
  table.float('period31').notNullable().defaultTo(0);
  table.float('period32').notNullable().defaultTo(0);

  //added these as database columns
  table.float('eod_to_eod_percent_change').notNullable().defaultTo(0);
  table.float('eod_to_sod_percent_change').notNullable().defaultTo(0);
  table.float('sod_to_eod_percent_change').notNullable().defaultTo(0);
  table.float('eod_to_eod_absolute_change').notNullable().defaultTo(0);
  table.float('eod_to_sod_absolute_change').notNullable().defaultTo(0);
  table.float('sod_to_eod_absolute_change').notNullable().defaultTo(0);
  table.bigint('today_market_cap').notNullable().defaultTo(0);
  table.float('volume').notNullable().defaultTo(0);

  table.float('change_percentage').notNullable().defaultTo(0);
  table.float('change_absolute').notNullable().defaultTo(0);
  table.float('overall_change').notNullable().defaultTo(0);


})
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('company_data');
};
