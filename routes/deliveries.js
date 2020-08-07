const router = require('express').Router()
const controller = require('../controllers/deliveries')

const auth = require('./auth')

const db = require('../db')
const jwt = require('jsonwebtoken')
const jwtSecret = 'FastDeliveries!'

router.use(auth.checkJWT({ jwt, jwtSecret }))
router.post('/', controller.create({ db }))
router.get('/', controller.get({ db }))

module.exports = router
