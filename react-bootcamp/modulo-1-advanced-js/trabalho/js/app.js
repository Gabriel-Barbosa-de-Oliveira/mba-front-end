let products = [];
let activeProductList = [];
let brands = [];
let types = [];
let initialState = true;
let queryBrand = "";
let queryTypes = "";
let queryName = "";

const listEl = document.getElementsByClassName('catalog');
const inputName = document.getElementById('filter-name');
const inputBrand = document.getElementById('filter-brand');
const inputType = document.getElementById('filter-type');
const inputSort = document.getElementById('sort-type');

async function init() {
  products = await listProducts();
  activeProductList = cloneDeep(products);
  renderBestAvailablesOrder();
  inputName.addEventListener("input", withDelay(renderBasedOnName, 500));
  inputBrand.addEventListener("change", renderBasedOnBrand);
  inputType.addEventListener("change", renderBasedOnType);
  inputSort.addEventListener("change", renderBasedOnSort);
}

function cloneDeep(json) {
  return JSON.parse(JSON.stringify(json));
}

init();


function renderProductItem(product) {
  const container = createContainerComponent(product);
  const figure = createImageComponent(product)
  const sectionDescription = createDescriptionContainer();
  const h1 = createH1Component(product);
  const divProductBrands = createDivProductBrandsComponent();
  const divProductBrandsSpan = createDivProductBrandsSpanComponent(product);
  const spanPrice = createSpanPriceComponent(product);

  divProductBrands.appendChild(divProductBrandsSpan);
  divProductBrands.appendChild(spanPrice);
  sectionDescription.appendChild(h1);
  sectionDescription.appendChild(divProductBrands);
  container.appendChild(figure);
  container.appendChild(sectionDescription);
  container.appendChild(renderDetails(product));

  return container;
}


function createContainerComponent(product) {
  const container = document.createElement('div');
  container.className = 'product'
  container.setAttribute('data-name', product.name);
  container.setAttribute('data-brand', product.brand);
  container.setAttribute('data-type', product.product_type);
  container.setAttribute('tabindex', 508);
  return container;
}

function createImageComponent(product) {
  const figure = document.createElement('figure');
  figure.className = "product-figure";
  const img = document.createElement('img');
  img.src = product.image_link;
  img.width = 215;
  img.height = 215;
  img.setAttribute('alt', product.name);
  img.setAttribute('onerror', "javascript:this.src='img/unavailable.png'")
  figure.appendChild(img);
  return figure;
}

function createDescriptionContainer() {
  const sectionDescription = document.createElement('section')
  sectionDescription.className = "product-description";
  return sectionDescription;
}

function createH1Component(product) {
  const h1 = document.createElement('h1');
  h1.className = "product-name";
  h1.textContent = product.name;
  return h1;
}

function createDivProductBrandsComponent() {
  const divProductBrands = document.createElement('div');
  divProductBrands.className = "product-brands";
  return divProductBrands;
}

function createDivProductBrandsSpanComponent(product) {
  const divProductBrandsSpan = document.createElement('span');
  divProductBrandsSpan.className = "product-brand background-brand";
  divProductBrandsSpan.textContent = product.brand;
  return divProductBrandsSpan;
}

function createSpanPriceComponent(product) {
  const spanPrice = document.createElement('span');
  spanPrice.className = "product-brand background-price";
  const price = parseInt(getConvertedPrice(product)).toString();
  spanPrice.textContent = `${currencyFormatter(price)}`;
  return spanPrice;
}

function getConvertedPrice(product) {
  return product.price ? product.price * 5.5 : 0;
}

function currencyFormatter(priceString) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(priceString);
}

function renderDetails(product) {
  const productDetails = document.createElement('section');
  productDetails.className = "product-details";
  const brand = renderDetailsRow('Brand', product.brand);
  const formattedPrice = parseInt(getConvertedPrice(product)).toString();
  const price = renderDetailsRow('Price', currencyFormatter(formattedPrice));
  const rating = renderDetailsRow('Rating', product.rating);
  const category = renderDetailsRow('Category', product.category);
  const product_type = renderDetailsRow('Product Type', product.product_type);
  if (product.brand) {
    productDetails.appendChild(brand)
  }
  if (product.price) {
    productDetails.appendChild(price)
  }
  if (product.rating) {
    productDetails.appendChild(rating)
  }
  if (product.category) {
    productDetails.appendChild(category)
  }
  if (product.product_type) {
    productDetails.appendChild(product_type)
  }

  return productDetails;
}

function renderDetailsRow(title, value) {
  const detailsRow = document.createElement('div');
  detailsRow.className = "details-row";
  const detailsTitle = document.createElement('div');
  detailsTitle.textContent = title;
  detailsRow.appendChild(detailsTitle);
  detailsRow.className = "details-row"
  const detailsBar = document.createElement('div');
  detailsBar.className = "details-bar";
  const detailsBarBg = document.createElement('div');
  detailsBarBg.className = "details-bar-bg"
  detailsBarBg.textContent = value;
  detailsBar.appendChild(detailsBarBg);
  detailsRow.appendChild(detailsBar);
  return detailsRow;
}



function renderData() {
  listEl[0].innerHTML = "";
  activeProductList.forEach((product) => {
    listEl[0].appendChild(renderProductItem(product));
    if (initialState) {
      pushOnlyUniqueStringValueToArray(product.brand, brands)
      pushOnlyUniqueStringValueToArray(product.product_type, types)
    }
  });

  buildOptionsWhenPageInits();
  initialState = false;
}

function buildOptionsWhenPageInits() {
  if (initialState) {
    buildCustomOptions(brands, inputBrand);
    buildCustomOptions(types, inputType);
  }
}

function pushOnlyUniqueStringValueToArray(value, array) {
  const index = array.findIndex(x => x === value)
  if (index === -1) {
    array.push(value);
  }
}

function buildCustomOptions(array, input) {
  for (const item of array) {
    const option = document.createElement("option");
    option.textContent = item;
    option.value = item;
    input.appendChild(option);
  }
}

function renderBasedOnName() {
  const value = inputName.value
  if (value !== "") {
    queryName = `name=${value}`
  } else {
    queryName = "";
  }
  getProductsBasedOnQuery();
}
function renderBasedOnBrand() {
  const value = inputBrand.value
  if (value !== 'all') {
    queryBrand = `brand=${value}`
  } else {
    queryBrand = "";
  }
  getProductsBasedOnQuery();
}

function renderBasedOnType() {
  const value = inputType.value
  if (value !== 'all') {
    queryTypes = `product_type=${value}`
  } else {
    queryTypes = "";
  }
  getProductsBasedOnQuery();
}

function renderBasedOnSort() {
  const methods = {
    "1": () => { renderBestAvailablesOrder() },
    "2": () => { renderMinorPricesOrder() },
    "3": () => { renderBiggerPricesOrder() },
    "4": () => { renderAlphabeticOrder() },
    "5": () => { renderInverseAlphabeticOrder() },
  }

  const methodCall = methods[inputSort.value.toString()];
  methodCall();

  console.log("chamou sort")
}

function renderBestAvailablesOrder() {
  activeProductList.sort(function (a, b) { return b.rating - a.rating })
  renderData();
}
function renderMinorPricesOrder() {
  activeProductList.sort((a, b) => a.price.localeCompare(b.price))
  renderData();
}

function renderBiggerPricesOrder() {
  activeProductList.sort((a, b) => b.price.localeCompare(a.price))
  renderData();

}
function renderAlphabeticOrder() {
  activeProductList.sort((a, b) => a.name.localeCompare(b.name))
  renderData();
}

function renderInverseAlphabeticOrder() {
  activeProductList.sort((a, b) => b.name.localeCompare(a.name))
  renderData();
}



async function getProductsBasedOnQuery() {
  activeProductList = await listProductsWithQuery(queryBuilder());
  renderData();
}

function queryBuilder() {
  return queryBrandBuilder() + queryTypesBuilder() + queryNameBuilder();
}

function queryBrandBuilder() {
  return queryBrand;
}

function queryTypesBuilder() {
  if (queryBrand !== "" && queryTypes !== "") {
    return `&${queryTypes}`
  }

  return queryTypes;
}
function queryNameBuilder() {
  if ((queryBrand !== "" || queryTypes !== "") && queryName !== "") {
    return `&${queryName}`
  }

  return queryName;
}

function withDelay(fn, delay) {
  let timeout;
  return function () {
    clearTimeout(timeout);
    timeout = setTimeout(fn, delay);
  };
}

