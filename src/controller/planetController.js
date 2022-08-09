import getPlanets from '../services/getPlanets.js';

const planetController = {
  async planet(req, res, next) {
    try {
      const planets = await getPlanets();
      return res.status(200).json({
        planets,
      });
    } catch (e) {
      next(e);
    }
  },
};

export default planetController;
