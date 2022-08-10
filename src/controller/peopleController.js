import getPeople from '../services/getPeople';

const peopleController = {
  async people(req, res, next) {
    try {
      const { orderBy } = req.query;
      if (orderBy) {
        const validOrderBy = ['name', 'height', 'mass'];
        if (!validOrderBy.includes(orderBy)) {
          return res.status(400).json({
            message: 'Order by must be name, height or mass',
          });
        }
      }
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
