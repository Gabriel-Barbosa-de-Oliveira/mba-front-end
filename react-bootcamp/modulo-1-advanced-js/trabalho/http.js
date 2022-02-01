function fetchJson(url, options) {
  return fetch(url, options).then((r) => {
    if (r.ok) {
      return r.json()
    } else {
      throw new Error(r.statusText);
    }
  }).catch(error => {
    showError("Error loading data", error);
    throw error;
  })
}

const baseUrl = 'http://makeup-api.herokuapp.com/' //online 
const path = 'api/v1/products.json'//online
// const baseUrl = 'http://localhost:3000/' //local 
// const path = "products"


function listProducts() {
  return fetchJson(`${baseUrl}${path}`)
}

function listProductsWithQuery(query) {
  return fetchJson(`${baseUrl}${path}?${query}`)
}