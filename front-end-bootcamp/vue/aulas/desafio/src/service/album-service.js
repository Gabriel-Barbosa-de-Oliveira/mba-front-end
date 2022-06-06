import axios from "axios";


const getAlbum = async id => {
  const resp = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}/albums`);
  return resp.data;
}

const getPhotos = async id => {
  const resp = await axios.get(`https://jsonplaceholder.typicode.com/albums/${id}/photos`);
  return resp.data;
}

export {
  getAlbum,
  getPhotos
}