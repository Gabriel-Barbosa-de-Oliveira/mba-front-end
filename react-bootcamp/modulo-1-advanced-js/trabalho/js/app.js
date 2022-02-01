let products = [];
let selectedItem;
const listEl = document.getElementsByClassName('catalog');

//EXEMPLO DO CÓDIGO PARA UM PRODUTO

//EXEMPLO DO CÓDIGO PARA OS DETALHES DE UM PRODUTO
function loadDetails(product) {
  let details = `<section class="product-details"><div class="details-row">
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
        </div></section>`;
}


async function init() {
  console.log(listEl)
  products = await listProducts();
  renderData();
}

init();

function productItem(product) {
  return item = `<div class="product" data-name="NYX Mosaic Powder Blush Paradise" data-brand="nyx" data-type="bronzer" tabindex="508">
  <figure class="product-figure">
    <img src="https://d3t32hsnjxo7q6.cloudfront.net/i/deedb7bd74bda43f062a09aab2ee1ec8_ra,w158,h184_pa,w158,h184.png" width="215" height="215" alt="NYX Mosaic Powder Blush Paradise" onerror="javascript:this.src='img/unavailable.png'">
  </figure>
  <section class="product-description">
    <h1 class="product-name">NYX Mosaic Powder Blush Paradise</h1>
    <div class="product-brands"><span class="product-brand background-brand">Nyx</span>
    <span class="product-brand background-price">R$ 57.70</span></div>
  </section>
  // CARREGAR OS DETALHES
</div>`;
}

function renderProductItem(product) {
  const container = document.createElement('div');
  container.className = 'product'
  container.setAttribute('data-name', product.name);
  container.setAttribute('data-brand', product.brand);
  container.setAttribute('data-type', product.product_type);
  container.setAttribute('tabindex', 508);
  const figure = document.createElement('figure');
  figure.className = "product-figure";
  const img = document.createElement('img');
  img.src = product.image_link;
  img.width = 215;
  img.height = 215;
  img.setAttribute('alt', product.name);
  img.setAttribute('onerror', "javascript:this.src='img/unavailable.png'")
  figure.appendChild(img);

  const sectionDescription = document.createElement('section')
  sectionDescription.className = "product-description";

  const h1 = document.createElement('h1');
  h1.className = "product-name";
  h1.textContent = product.name;

  const divProductBrands = document.createElement('div');
  divProductBrands.className = "product-brands";

  const divProductBrandsSpan = document.createElement('span')
  divProductBrandsSpan.className = "product-brand background-brand";
  divProductBrandsSpan.textContent = product.brand;

  const spanPrice = document.createElement('span');
  spanPrice.className = "product-brand background-price";
  spanPrice.textContent = product.price;

  divProductBrands.appendChild(divProductBrandsSpan);
  divProductBrands.appendChild(spanPrice);

  sectionDescription.appendChild(h1);
  sectionDescription.appendChild(divProductBrands);

  container.appendChild(figure);
  container.appendChild(sectionDescription);

  return container;
}

function renderData() {
  listEl.innerHTML = "";
  listEl[0].appendChild(renderProductItem(products[0]));

  // products.forEach((product, index) => {
  //   listEl[0].appendChild(renderProductItem(product));
  // });
}