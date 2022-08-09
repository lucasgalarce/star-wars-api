import getPeople from '../services/getPeople';

const peopleController = {
  async people(req, res, next) {
    try {
      const { orderBy } = req.query;
      const array = await getPeople(orderBy);
      return res.status(200).json({
        array,
      });
    } catch (e) {
      next(e);
    }
  },
};

export default peopleController;
