import getResource from '../utils/getResource';

const getPeople = async orderBy => {
  try {
    let people = await getResource('people');

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

export default getPeople;
