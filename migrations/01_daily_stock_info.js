
exports.up = function(knex, Promise) {
return knex.schema.createTable('daily_stock_info', (table) => {
  table.increments('daily_stock_info_id').primary();
  table.integer('company_id').references('companies.company_id').onDelete('cascade');
  table.float('open_price').notNullable().defaultTo(0);
  table.float('closing_price').notNullable().defaultTo(0);
  table.integer('date_id').references('dates.date_id').onDelete('cascade');
  table.integer('last_filing_date').references('dates.date_id').onDelete('cascade');
  table.float('ask_price').notNullable().defaultTo(0);
  table.float('bid_price').notNullable().defaultTo(0);
  table.float('last_price').notNullable().defaultTo(0);
  table.float('eod_to_eod_percent_change').notNullable().defaultTo(0);
  table.float('eod_to_sod_percent_change').notNullable().defaultTo(0);
  table.float('sod_to_eod_percent_change').notNullable().defaultTo(0);
  table.float('eod_to_eod_absolute_change').notNullable().defaultTo(0);
  table.float('eod_to_sod_absolute_change').notNullable().defaultTo(0);
  table.float('sod_to_eod_absolute_change').notNullable().defaultTo(0);
  table.bigint('today_market_cap').notNullable().defaultTo(0);
  table.float('volume').notNullable().defaultTo(0);
  table.string('ticker').notNullable().defaultTo('');
  table.string('date').notNullable().defaultTo('');
})
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('daily_stock_info');
};
