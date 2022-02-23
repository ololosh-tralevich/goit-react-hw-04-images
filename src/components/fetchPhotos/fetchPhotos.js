import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://pixabay.com/api/',
  params: {
    per_page: 12,
    orientation: 'horizontal',
    image_type: 'photo',
    key: '25409970-76d3bd325deb034b2a97ea891',
  },
});

export const fetchPhotos = async (searchWord, page) => {
  const { data } = await instance.get('?', {
    params: {
      page,
      q: searchWord,
    },
  });
  return data;
};
