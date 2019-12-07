
exports.up = function(knex, Promise) {
  // UP adds / creates tables / fields to the DB
return knex.schema.createTable('companies', (table) => {
  table.increments('company_id').primary();
  table.string('company_name').notNullable().defaultTo('');
  table.string('ticker').notNullable().defaultTo('');
  table.string('country').notNullable().defaultTo('');
  table.integer('last_filing_date').references('dates.date_id').onDelete('cascade');
  table.bigint('market_cap').notNullable().defaultTo(0);
  table.string('sector').notNullable().defaultTo('');
  table.integer('most_recent_position').defaultTo(3);
})
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('companies');
};
