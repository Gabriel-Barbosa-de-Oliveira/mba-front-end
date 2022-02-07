import { format, add, getHours, parse } from "https://cdn.skypack.dev/date-fns@2.16.1";

let confirmed = document.getElementById('confirmed');
let death = document.getElementById('death');
let recovered = document.getElementById('recovered');
const data = document.getElementById('date');
const pizza = document.getElementById('pizza').getContext('2d');
const barras = document.getElementById('barras').getContext('2d');

let retrievedData = {};
let deaths;
let confirmeds;
let recovereds;

init();

async function init() {
  const { data } = await getData('https://api.covid19api.com/summary');
  mapDataToRetrivedData(data);
  mapConfirmedCases(retrievedData.Global.TotalConfirmed);
  mapDeaths(retrievedData.Global.TotalDeaths);
  mapRecovered(retrievedData.Global.TotalRecovered);
  mapDate(retrievedData.Date);
  mapPieChart();
  mapBarChart();
}

function mapDataToRetrivedData(data) {
  retrievedData = data;
  console.log(retrievedData)
}

function mapConfirmedCases(totalConfirmed) {
  confirmeds = totalConfirmed;
  confirmed.textContent = formatNumberWithDots(totalConfirmed)
}

function mapDeaths(totalDeaths) {
  deaths = totalDeaths;
  death.textContent = formatNumberWithDots(totalDeaths);
}

function mapRecovered(totalRecovered) {
  recovereds = totalRecovered;
  recovered.textContent = formatNumberWithDots(totalRecovered);
}

function mapDate(date) {
  data.textContent += ' ' + format(new Date(date), 'dd/MM/yyyy');
}


function mapPieChart() {
  const myChart = new Chart(pizza, getChartConfig('pie', getPieChartData(), undefined))
}

function getPieChartData() {
  return {
    labels: ['Confimados', 'Recuperados', 'Mortes'],
    datasets: [{
      data: [confirmeds, recovereds, deaths],
      backgroundColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)'
      ],
      borderWidth: 1
    }]
  }
}

function mapBarChart() {
  const orderedDataArray = _.take(_.orderBy(retrievedData.Countries, ['TotalDeaths'], ['desc']), 10);
  const labels = _.map(orderedDataArray, 'Country');
  const data = _.map(orderedDataArray, 'TotalDeaths');
  const myChart = new Chart(barras, getChartConfig('bar', getBarChartData(labels, data), undefined))
}

function getBarChartData(labels, orderedDataArray) {
  return {
    labels: labels,
    datasets: [{
      data: orderedDataArray,
      label: "Total de Mortes por país - Top 10",
      backgroundColor: [
        'rgba(0, 0, 0, 1)',
      ],
      borderWidth: 1
    }]
  }
}