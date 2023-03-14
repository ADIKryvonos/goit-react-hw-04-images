const KEY = '32940895-a059968cc230e91a3d13d319b';

export const getPictures = (nextValue, page, per_page) => {
  return fetch(
    `https://pixabay.com/api/?q=${nextValue}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=${per_page}`
  );
};
