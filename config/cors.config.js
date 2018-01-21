const cors = require('cors');

corsOptions = {
  credentials: true,
  origin: [
    process.env.FRONT_END_URL_1,
    process.env.FRONT_END_URL_2
  ]
};

module.exports = (app) => {
  app.options('*', cors(corsOptions));
  app.use(cors(corsOptions));
}
