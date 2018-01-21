const express = require('express');
const router = express.Router();

const doc = require('./controllers/doc');
const auth = require('./controllers/auth');
const card = require('./controllers/card');
const user = require('./controllers/user');
const game = require('./controllers/game');

const jwtMiddleware = require('./helpers/jwt.helper').validateRequest;
const asyncMiddleware = require('./helpers/async.helper').asyncMiddleware;

router.get('/doc/test', doc.test);

router.post('/signup', auth.signup);
router.post('/login', auth.login);
router.get('/token', asyncMiddleware(auth.token));

router.get('/user/:id', jwtMiddleware, user.get);

router.post('/card', jwtMiddleware, card.create);
router.get('/card/:id', jwtMiddleware, card.get);

router.post(
  '/game/single/:userId/new',
  jwtMiddleware,
  asyncMiddleware(game.singlesInit)
);
router.put(
  '/game/single/:gameId/refill',
  jwtMiddleware,
  asyncMiddleware(game.refill)
);

module.exports = router;
