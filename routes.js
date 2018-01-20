const express = require('express');
const router = express.Router();

const jwtMiddleware = require('./helpers/jwt.helper').validateRequest;

const auth = require('./controllers/auth');
const card = require('./controllers/card');
const user = require('./controllers/user');

router.post('/signup', auth.signup);
router.post('/login', auth.login);
router.get('/token', auth.token);

router.get('/user/:id', jwtMiddleware, user.get);

router.post('/card', jwtMiddleware, card.create);
router.get('/card/:id', jwtMiddleware, card.get);

module.exports = router;
