import axios from 'axios';

const KEY = '32940895-a059968cc230e91a3d13d319b';
axios.defaults.baseURL = `https://pixabay.com/api/`;

export async function getPictures(value, page, per_page) {
  const { data } = await axios.get(
    `?q=${value}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=${per_page}`
  );
  return data;
}
