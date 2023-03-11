const input_amount = document.getElementById('amount');
const currency_select = document.getElementById('currencies');
const result_value = document.getElementById('result');
const check_button = document.getElementById('button');
const currency_table = getCurrencies();
const resultValue = document.getElementById('result');
const select = document.getElementById('select');
let currencies;
let currencyPLN;

resultValue.innerHTML = ' XXX PLN';

function getCurrencies() {
  fetch('http://api.nbp.pl/api/exchangerates/tables/A/')
    .then((response) => response.json())
    .then((data) => {
      currencies = data[0].rates;
    });
}
document.addEventListener('DOMContentLoaded', getCurrencies);

function convertCurrency() {
  currencies.forEach((item) => {
    if (item.code === currency_select.value) {
      const result = item.mid * input_amount.value;
      console.log(item.mid);
      result_value.innerHTML = result + ' PLN';
    }
  });
}

const button = document
  .getElementById('button')
  .addEventListener('click', convertCurrency);
