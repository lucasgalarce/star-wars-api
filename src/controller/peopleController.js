import getPeople from '../services/getPeople';

const peopleController = {
  async people(req, res, next) {
    try {
      const { orderBy } = req.query;
      const people = await getPeople(orderBy);
      return res.status(200).json({
        people,
      });
    } catch (e) {
      next(e);
    }
  },
};

export default peopleController;
