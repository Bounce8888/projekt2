const url = "https://api.nbp.pl/api/exchangerates/tables/a/";

const select = document.querySelector(".currencies");
const button = document.querySelector(".btn");
const input = document.querySelector(".inputVal");
const currencyConverted = document.querySelector(".pln-converted");

const getCurrencies = () => {
  fetch(url)
    .then((response) => response.json())
    .then((data) => convertValue(data))
    .catch((err) => console.log(err));
};

button.addEventListener("click", getCurrencies);
function blockNotNumber(event) {
  if (event.keyCode === 69 || event.keyCode === 189 || event.keyCode === 187) {
    event.preventDefault();
  }
}
input.addEventListener("keydown", blockNotNumber);

const convertValue = (data) => {
  const selectVal = select.value;
  const inputVal = input.value;
  const mid = data[0].rates.find((element) => element.code === selectVal).mid;
  const converted = countThePln(mid, inputVal);
  currencyConverted.innerHTML = converted;
};

const countThePln = (foreignCurrency, domesticCurrency) => {
  const count = foreignCurrency * domesticCurrency;
  return count.toFixed(2);
};
