exports.up = function(knex, Promise) {
  // UP adds / creates tables / fields to the DB
return knex.schema.createTable('select_filters', (table) => {
  table.increments('select_filter_id').primary();
  table.string('select_filter_name').notNullable().defaultTo('');
  table.string('symbol').notNullable().defaultTo('');
  table.integer('number').notNullable().defaultTo(0);
})
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('select_filters');
};
