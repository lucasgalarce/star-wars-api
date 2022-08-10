import getResource from '../utils/getResource';

const getPeople = async orderBy => {
  try {
    const people = await getResource('people');

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
        people.sort((a, b) => {
          if (b[orderBy] === 'unknown') return -1;
          const cleanNumberA = parseFloat(a[orderBy].replace(/,/g, ''));
          const cleanNumberB = parseFloat(b[orderBy].replace(/,/g, ''));
          if (cleanNumberA < cleanNumberB) {
            return -1;
          } else if (cleanNumberA > cleanNumberB) {
            return 1;
          }
          return 0;
        });
      }
    }

    return people;
  } catch (e) {
    console.log(e);
  }
};

export default getPeople;
