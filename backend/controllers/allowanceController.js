// controllers/allowance-controller
const { Allowance } = require('../models');

module.exports = {
  getAll: async (req, res) => {
    try {
      const data = await Allowance.findAll();
      res.json(data);
    } catch (err) {
      console.error('getAll error:', err);
      res.status(500).json({ message: 'Internal server error', error: err });
    }
  }
};
