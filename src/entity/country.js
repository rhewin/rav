import fetch from 'node-fetch';
import {FIXER_URL, FIXER_TOKEN, REST_COUNTRIES_URL} from '../constant.js';
import History from '../entity/history.js';

export default class Country {
  constructor() {}

  async getByName(s) {
    return await fetch(REST_COUNTRIES_URL + s)
      .then((response) => response.text())
      .then((data) => {
        return JSON.parse(data);
      });
  }

  async getConvertCurrencytoIDR(fromCurrency) {
    var myHeaders = new fetch.Headers();
    myHeaders.append('apikey', FIXER_TOKEN);

    var requestOptions = {
      method: 'GET',
      redirect: 'follow',
      headers: myHeaders,
    };

    return await fetch(
      FIXER_URL + `?to=IDR&from=${fromCurrency}&amount=1`,
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => { return JSON.parse(result); })
      .catch((error) => console.log('error', error));
  }

  apiHandlerCountrySearch() {
    const $this = this;
    return async function (req, res) {
      const countries = await $this.getByName(req.query.s);
      if (!countries[0]) {
        res.status(404).send(`Data not found!`);
        return;
      }
      const currency = countries[0] ? Object.keys(countries[0]?.currencies)[0] : null;
      const currencyRate = await $this.getConvertCurrencytoIDR(currency);
      let history = new History();
      history.add({
        to: 'IDR',
        from: currency,
        rate: currencyRate ? currencyRate.info.rate : 0,
      });

      res.json({
        data: {
          fullname: countries[0]?.name.official,
          population: countries[0]?.population,
          currency,
          rate: currencyRate ? currencyRate.info.rate : 0,
        },
        message: `Find Country by Name`,
      });
    };
  }
}
