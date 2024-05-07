const express = require('express')
const routers = express.Router()
const transController = require('../controllers/transaction.js')
const authMiddleware = require('../middleware/auth.js')

routers.post(
  '/balance',
  authMiddleware.authentication,
  transController.getBalance
)

routers.post(
  '/history',
  authMiddleware.authentication,
  transController.getHistory
)

routers.post('/:id', authMiddleware.authentication, transController.transfer)
routers.post(
  '/send/:id',
  authMiddleware.authentication,
  transController.newTransaction
)

module.exports = routers
