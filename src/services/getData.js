import axios from 'axios';

const getData = async orderBy => {
  try {
    const baseUrl = 'https://swapi.dev/api/';
    const limit = 10;
    const res = await axios.get(`${baseUrl}people`);
    const countPeople = res.data.count;
    const pages = countPeople / limit;
    const finalPages = Number.isInteger(pages) ? pages : pages + 1;
    const promiseArray = [];

    for (let i = 1; i <= finalPages; i++) {
      promiseArray.push(axios.get(`${baseUrl}people/?page=${i}`));
    }

    let people = [];

    await Promise.all(promiseArray).then(values => {
      values.forEach(promiseResponse => {
        people.push(...promiseResponse.data.results);
      });
    });

    if (orderBy) {
      if (orderBy === 'name') {
        people.sort((a, b) => {
          if (a[orderBy] < b[orderBy]) {
            return -1;
          }
          if (a[orderBy] > b[orderBy]) {
            return 1;
          }
          return 0;
        });
      } else {
        const filteredPeople = people.filter(
          value => value[orderBy] !== 'unknown'
        );
        const unknownDataPeople = people.filter(
          value => value[orderBy] === 'unknown'
        );

        filteredPeople.sort((a, b) => {
          const cleanNumberA = parseFloat(a[orderBy].replace(/,/g, ''));
          const cleanNumberB = parseFloat(b[orderBy].replace(/,/g, ''));

          if (cleanNumberA < cleanNumberB) {
            return -1;
          } else if (cleanNumberA > cleanNumberB) {
            return 1;
          }
          return 0;
        });

        people = [...filteredPeople, ...unknownDataPeople];
      }
    }

    return people;
  } catch (e) {
    console.log(e);
  }
};

export default getData;
