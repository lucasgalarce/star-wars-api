import axios from 'axios';

const getResource = async resource => {
  const baseUrl = 'https://swapi.dev/api/';
  const limit = 10;
  const res = await axios.get(`${baseUrl}${resource}`);
  const count = res.data.count;
  const pages = count / limit;
  const finalPages = Number.isInteger(pages) ? pages : pages + 1;
  const promiseArray = [];

  for (let i = 1; i <= finalPages; i++) {
    promiseArray.push(axios.get(`${baseUrl}${resource}/?page=${i}`));
  }

  const array = [];
  await Promise.all(promiseArray).then(values => {
    values.forEach(promiseResponse => {
      array.push(...promiseResponse.data.results);
    });
  });
  console.log(array);
  return array;
};

export default getResource;
