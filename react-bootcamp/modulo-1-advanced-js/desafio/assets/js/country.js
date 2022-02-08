const contryOptions = document.getElementById('cmbCountry');
const dateStart = document.getElementById('date_start');
const dateEnd = document.getElementById('date_end');
const cmbData = document.getElementById('cmbData');
const filtro = document.getElementById('filtro');
const kpiconfirmed = document.getElementById('kpiconfirmed');

let retrievedCountries = {};

init();

async function init() {
  const { data } = await getData('https://api.covid19api.com/countries');
  mapDataToRetrivedData(data);
  addEventListeners()
}


function addEventListeners() {
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

function submit(evt) {
  evt.preventDefault();
  console.log("cmbData.value")
  getFilteredData();
}

async function getFilteredData() {
  const { data } = await getData(`https://api.covid19api.com/country/${contryOptions.value}/status/${cmbData.value}`);
  console.log(data);
  kpiconfirmed.textContent = formatNumberWithDots(_.last(data).Cases)


}

