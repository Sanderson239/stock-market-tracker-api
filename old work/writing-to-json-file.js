const fs = require('fs');
let fullCompanyData = require ('./new-full-company-data.json');






let newCompanyData = {date: '2019-07-19', dateId: 5053, dailyStockInfo: 1};
for (let i = 4; i < fullCompanyData.length; i++) {
  if (fullCompanyData[i].MarketCapitalization && fullCompanyData[i].volume) {
    newCompanyData[`${fullCompanyData[i].code}`] = {
      code: fullCompanyData[i].code,
      MarketCapitalization: fullCompanyData[i].MarketCapitalization,
      open: fullCompanyData[i].open,
      close: fullCompanyData[i].close,
      volume: fullCompanyData[i].volume,
      mostRecentPosition: i,
    }
    console.log(i);
  }
}


fs.writeFileSync('new-new-company-data.json', JSON.stringify(newCompanyData))
