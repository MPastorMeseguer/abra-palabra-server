const User = require('../models/user');

module.exports = {
  get: (req, res) => {
    User.findOne({ id: req.params.id })
      .then(user => {
        if (!user) return res.status(404).json({ message: 'user does not exist' });
        return res.status(200).json({ user });
      }).catch(err => res.status(500).json({ message: 'something went wrong' }));
  }
}