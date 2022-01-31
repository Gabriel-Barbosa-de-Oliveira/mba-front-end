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

const baseUrl = 'http://makeup-api.herokuapp.com/'

function listProducts() {
  return fetchJson(`${baseUrl}api/v1/products.json`)
}