import getResource from '../utils/getResource';
import axios from 'axios';

const getPlanets = async () => {
  try {
    let planets = await getResource('planets');

    planets = await Promise.all(
      planets.map(async planet => {
        const residents = [];
        for (let resident of planet.residents) {
          try {
            const res = await axios.get(resident);
            residents.push(res.data.name);
          } catch (error) {
            console.log(error);
          }
        }
        planet.residents = residents;
        return planet;
      })
    );
    console.log(planets);
    return planets;
  } catch (e) {
    console.log(e);
  }
};

export default getPlanets;
