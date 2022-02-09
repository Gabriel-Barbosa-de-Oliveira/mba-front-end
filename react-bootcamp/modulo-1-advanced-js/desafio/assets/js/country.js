const contryOptions = document.getElementById('cmbCountry');
const dateStart = document.getElementById('date_start');
const dateEnd = document.getElementById('date_end');
const cmbData = document.getElementById('cmbData');
const filtro = document.getElementById('filtro');
const kpiconfirmed = document.getElementById('kpiconfirmed');
const kpideaths = document.getElementById('kpideaths');
const kpirecovered = document.getElementById('kpirecovered');
const linhas = document.getElementById('linhas').getContext('2d');

let retrievedCountries = {};
let myChart;

let data_type = {
  Deaths: "Mortes",
  Recovered: "Recuperados",
  Confirmed: "Confirmados"
}

init();

async function init() {
  const { data } = await getData('https://api.covid19api.com/countries');
  mapDataToRetrivedData(data);
  addEventListeners()
  submit()
}


function addEventListeners() {
  filtro.addEventListener("click", submit);
}

function mapDataToRetrivedData(data) {
  retrievedCountries = _.orderBy(data, ['Country'], ['asc']);
  buildCustomOptions(retrievedCountries, contryOptions)
  contryOptions.value = 'brazil';
  dateStart.value = '2021-01-01';
  dateEnd.value = '2021-02-28';

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
  if (evt)
    evt.preventDefault();
  getFilteredData();
}

async function getFilteredData() {
  if (myChart) {
    myChart.destroy();
  }

  const startDate = dateStart.value.split('-').map((item) => {
    return parseInt(item);
  });
  const endDate = dateEnd.value.split('-').map((item) => {
    return parseInt(item);
  });
  const promises = [
    getData(`https://api.covid19api.com/country/${contryOptions.value}?from=${new Date(startDate[0], startDate[1], startDate[2], -3, 0, 0).toISOString()}&to=${new Date(endDate[0], endDate[1], endDate[2], -3, 0, 0).toISOString()}`),
    getData(`https://api.covid19api.com/country/${contryOptions.value}?from=${new Date(startDate[0], startDate[1], (startDate[2] - 1), -3, 0, 0).toISOString()}&to=${new Date(endDate[0], endDate[1], (endDate[2] - 1), -3, 0, 0).toISOString()}`)
  ]

  Promise.allSettled(promises).then((list) => {
    if (list[0].status == "fulfilled" && list[1].status == "fulfilled") {
      kpiconfirmed.textContent = formatNumberWithDots(_.last(list[0].value.data).Confirmed)
      kpirecovered.textContent = formatNumberWithDots(_.last(list[0].value.data).Recovered)
      kpideaths.textContent = formatNumberWithDots(_.last(list[0].value.data).Deaths)
      loadLineChart(list[0].value.data, list[1].value.data, cmbData.value)
    }
  })
    .catch((error) => {
      console.log('Error:');
      console.log(error);
    });
}

function loadLineChart(json, jsonDelta, dataType) {
  let dates = _.map(json, "Date");
  let values = _.map(json, dataType);
  let deltaValues = _.map(jsonDelta, dataType);

  values = _.each(values, (x, index) => {
    values[index] = values[index] - deltaValues[index];
  })

  let avg = _.times(values.length, _.constant(_.mean(values)));


  myChart = new Chart(linhas, {
    type: 'line',
    data: {
      labels: dates,
      datasets: [
        {
          data: values,
          label: `Número de ${data_type[dataType]}`,
          borderColor: "rgb(255,140, 13)"
        },
        {
          data: avg,
          label: `Média de ${data_type[dataType]}`,
          borderColor: 'rgb(255,0,0)'
        }
      ]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: 'Curva Diária de Covid-19'
        }
      }
    },
  })
}
