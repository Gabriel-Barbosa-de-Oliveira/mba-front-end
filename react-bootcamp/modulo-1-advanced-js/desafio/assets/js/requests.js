
async function getData(url) {
  try {
    const response = await axios.get(url);
    return response;
  } catch {
    throw err;
  }
}

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