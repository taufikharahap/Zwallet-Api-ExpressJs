const model = require('../models/transaction')
const response = require('../utils/response')

const controller = {
  getBalance: async (req, res) => {
    try {
      const dates = req.body.dates
      let data

      if (dates && Array.isArray(dates) && dates.length > 0) {
        const promises = dates.map(async (date) => {
          return model.getBalance(req.decodeToken.id, date)
        })

        const results = await Promise.all(promises)

        data = results.reduce((acc, result) => {
          return acc.concat(result)
        }, [])
      } else {
        data = await model.getBalance(req.decodeToken.id)
      }

      console.log(data)
      return response(res, 200, data)
    } catch (error) {
      return response(res, 500, error.message)
    }
  },

  getHistory: async (req, res) => {
    try {
      const weekRange = req.body.weekRange
      const monthRange = req.body.monthRange
      const type = req.body.type
      const id = req.decodeToken.id

      if (weekRange) {
        data = await model.getHistory({ id, type, weekRange })
      } else if (monthRange) {
        data = await model.getHistory({ id, type, monthRange })
      } else {
        data = await model.getHistory({ id })
      }

      return response(res, 200, data)
    } catch (error) {
      return response(res, 500, error.message)
    }
  },
  transfer: async (req, res) => {
    try {
      const amount = req.body.amount ? req.body.amount : ''
      const notes = req.body.notes ? req.body.notes : ''
      const data = await model.transfer(
        req.decodeToken.id,
        req.params.id,
        amount,
        notes
      )

      return response(res, 201, data)
    } catch (error) {
      return response(res, 500, error.message)
    }
  },
  newTransaction: async (req, res) => {
    try {
      const amount = req.body.amount ? req.body.amount : ''
      const notes = req.body.notes ? req.body.notes : ''
      const data = await model.newTransaction(
        req.decodeToken.id,
        req.params.id,
        amount,
        notes
      )

      return response(res, 201, data)
    } catch (error) {
      return response(res, 500, error.message)
    }
  },
}

module.exports = controller
