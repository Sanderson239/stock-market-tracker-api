

//orders the days stock changes by filter
return knex('daily_stock_info')
.select('daily_stock_info_id', 'date_id', 'ticker', 'company_id', 'open_price', 'closing_price', 'eod_to_sod_percent_change')
// .whereIn('date_id', dateArr)
.where('date_id', start_date_id)
.whereNotNull('company_id')
.where(order_filters[`0`].name, order_filters[`0`].symbol, (order_filters[`0`].number / 100))
.orderBy('eod_to_sod_percent_change')
.limit(limit * 2)

//gets data for resulting companies for the two days after
return knex('daily_stock_info')
.select('date_id', 'company_id', 'open_price', 'closing_price')
.whereIn('company_id', company_ids)
.whereBetween('date_id', [start_date_id, start_date_id + 2])
.orderBy('company_id')
.orderBy('date_id')

//experiments

return knex('daily_stock_info')
.select('daily_stock_info_id', 'date_id', 'ticker', 'company_id', 'open_price', 'closing_price', 'eod_to_sod_percent_change')
.whereBetween('date_id', [start_date_id, end_date_id])
.whereNotNull('company_id')
.where(order_filters[`0`].name, order_filters[`0`].symbol, (order_filters[`0`].number / 100))
.orderBy('date_id')
.orderBy('eod_to_sod_percent_change')
.limit(limit * 2)
