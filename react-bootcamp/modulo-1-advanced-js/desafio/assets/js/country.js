const contryOptions = document.getElementById('cmbCountry');
const dateStart = document.getElementById('date_start');
const dateEnd = document.getElementById('date_end');
const cmbData = document.getElementById('cmbData');
const filtro = document.getElementById('filtro');

let retrievedCountries = {};

init();

async function init() {
  const { data } = await getData('https://api.covid19api.com/countries');
  mapDataToRetrivedData(data);
  addEventListeners()
}


function addEventListeners() {
  // contryOptions.addEventListener("change", mapNewCountryOption);
  // dateStart.addEventListener("change", mapStartDateValue);
  // dateEnd.addEventListener("change", mapEndDateValue);
  // cmbData.addEventListener("change", mapCmbDataValue);
  filtro.addEventListener("click", submit);
}

function mapDataToRetrivedData(data) {
  retrievedCountries = _.orderBy(data, ['Country'], ['asc']);
  buildCustomOptions(retrievedCountries, contryOptions)
  console.log(retrievedCountries)
}


function buildCustomOptions(array, input) {
  for (const item of array) {
    const option = document.createElement("option");
    option.textContent = item.Country;
    option.value = item.Slug;
    input.appendChild(option);
  }
}

// function mapNewCountryOption() {
//   console.log(contryOptions.value)
// }

// function mapStartDateValue() {
//   console.log(dateStart.value)
// }

// function mapEndDateValue() {
//   console.log(dateEnd.value)
// }

// function mapCmbDataValue() {
//   console.log(cmbData.value)
// }

function submit(evt) {
  evt.preventDefault();
  console.log("cmbData.value")
  getFilteredData();
}

async function getFilteredData() {
  console.log(await getData(`https://api.covid19api.com/country/${contryOptions.value}/status/${cmbData.value}`));
}

