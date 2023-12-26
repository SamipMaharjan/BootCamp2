// console.log(document.querySelector("input"));
const API_KEY = "f732d5f2ab5831395e6737c5930f578a";

let latestCurrData;
fetch(`http://api.exchangeratesapi.io/v1/latest?access_key=${API_KEY}`)
  .then((res) => res.json())
  .then((data) => {
    latestCurrData = data;
    console.log("res data", data);
    const rates = data.rates;
    const date = document.querySelector(".date");
    date.innerHTML = `Date: ${data.date}`;

    document.querySelector(
      ".base-currency"
    ).innerHTML = `Base currency: ${data.base}`;

    const displayedCurrencies = [
      "AED",
      "AFN",
      "ALL",
      "AMD",
      "ANG",
      "AOA",
      "ARS",
      "AUD",
    ];

    displayedCurrencies.forEach((currency, i) => {
      console.log("rate.curr", rates[currency]);
      document.querySelector(`.currency-${i + 1}`).innerHTML = currency;
      document.querySelector(`.rate-${i + 1}`).innerHTML = rates[currency];
    });

    const colors = [
      "#fc892d",
      "#4c68ef",
      "#3cc5fb",
      "#58dfb6",
      "#fdcd3d",
      "#ff8f67",
      "#7639fc",
      "#7639fc",
    ];
    colors.forEach((color, i) => {
      const card = document.querySelector(`.card-${i + 1}`);
      card.style.backgroundColor = color;
      console.log("card", card);
    });
  });

document
  .querySelector(".search")
  .addEventListener("input", getExchangeRateWithSymbolCurrency);

async function getExchangeRateWithSymbolCurrency(event) {
  const currency = event.target.value;
  const search_validation = document.querySelector(".search-validation");

  if (!latestCurrData.rates.hasOwnProperty(currency)) {
    console.log("before return ", currency);
    search_validation.innerHTML = "Invalid currency";
    return;
  }
  search_validation.innerHTML = "";

  try {
    const res = await fetch(
      `http://api.exchangeratesapi.io/v1/latest?access_key=${API_KEY}&symbols=${currency}`
    );
    const data = await res.json();
    document.querySelector(`.currency-searched`).innerHTML = currency;
    document.querySelector(`.searched-rate`).innerHTML = data.rates[currency];
    return data;
  } catch (err) {
    console.error(err);
    return "err";
  }
}
