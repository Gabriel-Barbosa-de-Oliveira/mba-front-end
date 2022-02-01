let products = [];
let activeProductList = [];
let brands = [];
let types = [];
let initialState = true;

const listEl = document.getElementsByClassName('catalog');
const inputName = document.getElementById('filter-name');
const inputBrand = document.getElementById('filter-brand');
const inputType = document.getElementById('filter-type');
const inputSort = document.getElementById('sort-type');

//EXEMPLO DO CÓDIGO PARA OS DETALHES DE UM PRODUTO
function loadDetails(product) {
  let details = `
  <section class="product-details">
    <div class="details-row">
        <div>Brand</div>
        <div class="details-bar">
        <div class="details-bar-bg" style="width= 250">nyx</div>
        </div>
        </div><div class="details-row">
        <div>Price</div>
        <div class="details-bar">
        <div class="details-bar-bg" style="width= 250">10.49</div>
        </div>
        </div><div class="details-row">
        <div>Rating</div>
        <div class="details-bar">
        <div class="details-bar-bg" style="width= 250">5</div>
        </div>
        </div><div class="details-row">
        <div>Category</div>
        <div class="details-bar">
        <div class="details-bar-bg" style="width= 250"></div>
        </div>
        </div><div class="details-row">
        <div>Product_type</div>
        <div class="details-bar">
        <div class="details-bar-bg" style="width= 250">bronzer</div>
        </div>
    </div>
  </section>`;
}


async function init() {
  products = await listProducts();
  activeProductList = cloneDeep(products);
  renderData();
  // inputName
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
  //colocar detalhes
  container.appendChild(figure);
  container.appendChild(sectionDescription);

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

function renderBasedOnBrand() {
  const value = inputBrand.value
  if (value != "all") {
    activeProductList = products.filter(product => product.brand === value);
  } else {
    activeProductList = cloneDeep(products);
  }
  renderData();
}

function renderBasedOnType() {
  console.log("chamou tyoe")
}

function renderBasedOnSort() {
  console.log("chamou sort")
}