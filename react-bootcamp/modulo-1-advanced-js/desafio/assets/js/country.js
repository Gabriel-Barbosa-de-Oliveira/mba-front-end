const contryOptions = document.getElementById('cmbCountry');
const dateStart = document.getElementById('date_start');
const dateEnd = document.getElementById('date_end');
const cmbData = document.getElementById('cmbData');
const filtro = document.getElementById('filtro');
const kpiconfirmed = document.getElementById('kpiconfirmed');
const kpideaths = document.getElementById('kpideaths');
const kpirecovered = document.getElementById('kpirecovered');

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
  const promises = [
    getData(`https://api.covid19api.com/country/${contryOptions.value}/status/${cmbData.value}`),
    getData(`https://api.covid19api.com/country/${contryOptions.value}/status/confirmed`),
    getData(`https://api.covid19api.com/country/${contryOptions.value}/status/recovered`),
    getData(`https://api.covid19api.com/country/${contryOptions.value}/status/deaths`)
  ]

  Promise.all(promises).then((list) => {
    console.log('Result:');
    console.log(list);
    kpiconfirmed.textContent = formatNumberWithDots(_.last(list[1].data).Cases)
    kpirecovered.textContent = formatNumberWithDots(_.last(list[2].data).Cases)
    kpideaths.textContent = formatNumberWithDots(_.last(list[3].data).Cases)
  })
    .catch((error) => {
      console.log('Error:');
      console.log(error);
    });

  // const { data } = await getData(`https://api.covid19api.com/country/${contryOptions.value}/status/${cmbData.value}`);
  // console.log(data);


}

