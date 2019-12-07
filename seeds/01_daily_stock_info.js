
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('daily_stock_info').del()
    .then(function () {
      // Inserts seed entries
      return knex('daily_stock_info').insert([{
        daily_stock_info_id: 1,
        company_id: 1,
        open_price: 2.01,
        closing_price: 3.50,
        date_id: 1,
        last_filing_date: 1,
        ask_price: 2.5,
        bid_price: 3.1,
        last_price: 1,
        eod_to_eod_percent_change: .5,
        eod_to_sod_percent_change: .03,
        sod_to_eod_percent_change: .20,
        eod_to_eod_absolute_change: 50,
        eod_to_sod_absolute_change: 20,
        sod_to_eod_absolute_change: 10
      }, {
        daily_stock_info_id: 2,
        company_id: 2,
        open_price: 2.01,
        closing_price: 3.50,
        date_id: 1,
        last_filing_date: 1,
        ask_price: 2.5,
        bid_price: 3.1,
        last_price: 1,
        eod_to_eod_percent_change: .5,
        eod_to_sod_percent_change: .03,
        sod_to_eod_percent_change: .20,
        eod_to_eod_absolute_change: 50,
        eod_to_sod_absolute_change: 20,
        sod_to_eod_absolute_change: 10
      }]);
    });
};
