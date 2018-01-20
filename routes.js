const express = require('express');
const router = express.Router();

const jwtMiddleware = require('./helpers/jwtHelper').validateRequest;

const auth = require('./controllers/auth');
// const game = require('./controllers/game');

router.post('/signup', auth.signup);
router.post('/login', auth.login);
router.get('/token', auth.token);

router.get('/wat', jwtMiddleware, () => { console.log('WATTTT') })

module.exports = router;
