'use strict';

const knex = require('../../knex.js');
const { decamelizeKeys, camelizeKeys } = require('humps');

class Companies {
  getCompany() {
    return knex('companies')
      .orderBy('company_id')
      .then((result) => camelizeKeys(result));
  }

  getCompanyById(company_id) {
    return knex('companies')
      .where('company_id', company_id)
      .first()
      .then((result) => {
        return camelizeKeys(result);
      });
  }

  getCompanyByTicker(ticker) {
    return knex('companies')
      .where('ticker', ticker)
      .first()
      .then((result) => {
        return camelizeKeys(result);
      });
  }

  getCompaniesByTicker(tickers) {
    return knex('companies')
      .whereIn('ticker', tickers)
      .then((result) => {
        return camelizeKeys(result);
      });
  }

  // getCompanyByTicker(ticker) {
  //   return knex('companies')
  //     .where('ticker', ticker)
  //     .then((result) => {
  //       return camelizeKeys(result);
  //     });
  // }

  addCompany(company) {
    return knex('companies')
      .insert(company,'*')
      .then((result) => {
        return camelizeKeys(result)
      });
  }

  updateCompany(company) {
    const company_id = company.company_id;
    return knex('companies')
      .where('company_id', company.company_id)
      .update({
        company_id: company.company_id,
        company_name: company.company_name,
        ticker: company.ticker,
        country: company.country,
        last_filing_date: company.last_filing_date,
        market_cap: company.market_cap
      }, '*')
      .then((result) => {
        return camelizeKeys(result)
      });
  }

  deleteCompany(company_id) {
    return knex('companies')
      .del()
      .where('company_id', company_id)
      .returning('*')
      .then((result) => {
        return camelizeKeys(result)
      });
  }



}

module.exports = Companies;
