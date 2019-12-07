
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('companies').del()
    .then(function () {
      // Inserts seed entries
      return knex('companies').insert([{
        company_id: 1,
        company_name: 'Google',
        ticker: 'goog',
        country: 'usa',
        last_filing_date: 1,
        market_cap: 1000000001,
        sector: 'a'
      }, {
        company_id: 2,
        company_name: 'Apple',
        ticker: 'apple',
        country: 'usa',
        last_filing_date: 2,
        market_cap: 5000000,
        sector: 'a'
      }]);
    });
};
