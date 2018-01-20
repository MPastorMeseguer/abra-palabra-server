const express = require('express');
const router = express.Router();

const jwtMiddleware = require('./helpers/jwt.helper').validateRequest;

const auth = require('./controllers/auth');
const card = require('./controllers/card');
// const game = require('./controllers/game');

router.post('/signup', auth.signup);
router.post('/login', auth.login);
router.get('/token', auth.token);

// router.get('/test', jwtMiddleware, () => { })

router.post('/card', card.create);


module.exports = router;
