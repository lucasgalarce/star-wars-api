import getResource from '../utils/getResource';

const getPlanets = async () => {
  try {
    let planets = await getResource('planets');
    let people = await getResource('people');

    planets = planets.map(planet => {
      const residents = [];
      for (let resident of planet.residents) {
        const character = people.find(people => people.url === resident);
        residents.push(character.name);
      }
      planet.residents = residents;
      return planet;
    });
    return planets;
  } catch (e) {
    console.log(e);
  }
};

export default getPlanets;
