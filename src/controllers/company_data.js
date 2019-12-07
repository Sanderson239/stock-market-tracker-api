'use strict';

const knex = require('../../knex.js');
const { decamelizeKeys, camelizeKeys } = require('humps');

class CompanyData {
  getCompanyData() {
    return knex('company_data')
      .orderBy('company_data_id')
      .then((result) => camelizeKeys(result));
  }



  addCompanyData(companyData) {
    // console.log('controller companyData', companyData);
    let keys = Object.keys(companyData);
    let companyDataToAdd = [];
    for (let i = 0; i < keys.length; i++) {
      let currentCompany = companyData[`${keys[i]}`];
      let newCompanyData = {
        company_id: currentCompany.companyId,
        pc: currentCompany.pc,
        period11: currentCompany.period11,
        period12: currentCompany.period12,
        period21: currentCompany.period21,
        period22: currentCompany.period22,
        period31: currentCompany.period31,
        period32: currentCompany.period32,
        //this is where volume will go

        eod_to_eod_percent_change: currentCompany.eodToEodPercentChange,
        eod_to_sod_percent_change: currentCompany.eodToSodPercentChange,
        sod_to_eod_percent_change: currentCompany.sodToEodPercentChange,
        eod_to_eod_absolute_change: currentCompany.eodToEodAbsoluteChange,
        eod_to_sod_absolute_change: currentCompany.eodToSodAbsoluteChange,
        sod_to_eod_absolute_change: currentCompany.sodToEodAbsoluteChange,
        today_market_cap: currentCompany.todayMarketCap,
        volume: currentCompany.volume,




        change_percentage: currentCompany.changePercentage,
        change_absolute: currentCompany.changeAbsolute,
        overall_change: currentCompany.overallChange,
      };
      companyDataToAdd[i] = newCompanyData;
    }
    return knex('company_data')
      .insert(companyDataToAdd,'*')
      .then((result) => {
        return camelizeKeys(result)
      });
  }

  updateCompanyData(companyData) {
    const company_data_id = companyData.company_data_id;
    return knex('company_data')
      .where('company_data_id', companyData.company_data_id)
      .update({
        company_data_id: companyData.companyData_id,
        company_id: companyData.company_id,
        pc: companyData.pc,
        reason: companyData.reason,
        rating: companyData.rating,
        after_hours: companyData.after_hours,
        pre_market: companyData.pre_market,
        period11: companyData.period11,
        period12: companyData.period12,
        period21: companyData.period21,
        period22: companyData.period22,
        period31: companyData.period31,
        period32: companyData.period32,
      }, '*')
      .then((result) => {
        return camelizeKeys(result)
      });
  }




}

module.exports = CompanyData;
