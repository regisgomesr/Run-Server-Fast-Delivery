const router = require('express').Router()
const controller = require('../controllers/users')

const auth = require('./auth')

const db = require('../db')
const jwt = require('jsonwebtoken')
const jwtSecret = 'FastDeliveries!'

router.post('/login', controller.login({ db, jwt, jwtSecret }))
router.post('/', auth.injectUserFromToken({ jwt, jwtSecret }), controller.create({ db }))

router.use(auth.checkJWT({ jwt, jwtSecret }))
router.get('/', controller.get({ db }))
router.get('/me', controller.getMe({ db }))
router.get('/:id', controller.getOne({ db }))

module.exports = router
