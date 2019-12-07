'use strict';

module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://localhost/stock_market_tracker'
  },

  test: {
    client: 'pg',
    connection: 'postgres://localhost/stock_market_tracker_test'
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL
  }
};
