module.exports = {
  test: (req, res) => res.status(200).jsonp({ data: 'API looking good' })
};