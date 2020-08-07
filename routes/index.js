const router = require('express').Router()

const users = require('./users')
const deliveries = require('./deliveries')

router.get('/', (req, res) => res.send('Fast server deliveries.'))
router.use('/users', users)
router.use('/deliveries', deliveries)

module.exports = router
