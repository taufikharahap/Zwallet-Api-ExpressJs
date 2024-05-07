const db = require('../config/db')

const model = {
  getBalance: (id, date) => {
    return new Promise((resolve, reject) => {
      if (!date) {
        db.query(
          `SELECT total, phone_number
           FROM
           (
              SELECT SUM(amount) AS total
              FROM transactions
              WHERE receiver_id = $1
              
              UNION ALL
              
              SELECT SUM(amount) AS total
              FROM transactions
              WHERE sender_id = $1
           ) AS transaction_totals
           CROSS JOIN (
              SELECT phone_number
              FROM phone
              WHERE user_id = $1
           ) AS user_phone`,
          [id]
        )
          .then((res) => {
            let result = res.rows
            if (result <= 0) {
              result = 'Data not found'
            }
            resolve(result)
          })
          .catch((err) => {
            reject(err)
          })
      } else {
        db.query(
          `WITH income AS (
            SELECT 
                COALESCE(SUM(amount), 0) AS total_income
            FROM 
                transactions
            WHERE 
                receiver_id = $1
                AND date_transaction <= $2
          ),
            expense AS (
              SELECT 
                  COALESCE(SUM(amount), 0) AS total_expense
              FROM 
                  transactions
              WHERE 
                  sender_id = $1
                  AND date_transaction <= $2
            )
            SELECT 
              total_income - total_expense AS balance
            FROM 
              income, expense`,
          [id, date]
        )
          .then((res) => {
            let result = res.rows
            if (result <= 0) {
              result = 'Data not found'
            }
            resolve(result)
          })
          .catch((err) => {
            reject(err)
          })
      }
    })
  },

  getHistory: ({ id, type, weekRange, monthRange }) => {
    return new Promise((resolve, reject) => {
      if (!type) {
        if (!weekRange && !monthRange) {
          db.query(
            `SELECT t.sender_id, t.receiver_id, t.amount, t.notes, t.date_transaction, sender.image AS sender_image,  
             sender.username AS sender_username, receiver.image AS receiver_image, receiver.username AS receiver_username FROM transactions t
             JOIN users AS sender ON t.sender_id = sender.id
             JOIN users AS receiver ON t.receiver_id = receiver.id
             WHERE sender_id = $1 OR receiver_id = $1
             ORDER BY t.id DESC
             LIMIT 10`,
            [id]
          )
            .then((res) => {
              let result = res.rows
              if (result <= 0) {
                result = 'Data not found'
              }
              resolve(result)
            })
            .catch((err) => {
              reject(err)
            })
        } else {
          if (weekRange) {
            const startDate = weekRange[0]
            const endDate = weekRange[1]
            db.query(
              `SELECT t.sender_id, t.receiver_id, t.amount, t.notes, t.date_transaction, sender.image AS sender_image,  
             sender.username AS sender_username, receiver.image AS receiver_image, receiver.username AS receiver_username FROM transactions t
             JOIN users AS sender ON t.sender_id = sender.id
             JOIN users AS receiver ON t.receiver_id = receiver.id
             WHERE (sender_id = $1 OR receiver_id = $1) AND date_transaction BETWEEN $2 AND $3
             ORDER BY t.id DESC
             LIMIT 10`,
              [id, startDate, endDate]
            )
              .then((res) => {
                let result = res.rows
                if (result <= 0) {
                  result = 'Data not found'
                }
                resolve(result)
              })
              .catch((err) => {
                reject(err)
              })
          } else if (monthRange) {
            const startDate = monthRange[0]
            const endDate = monthRange[1]
            db.query(
              `SELECT t.sender_id, t.receiver_id, t.amount, t.notes, t.date_transaction, sender.image AS sender_image,  
             sender.username AS sender_username, receiver.image AS receiver_image, receiver.username AS receiver_username FROM transactions t
             JOIN users AS sender ON t.sender_id = sender.id
             JOIN users AS receiver ON t.receiver_id = receiver.id
             WHERE (sender_id = $1 OR receiver_id = $1) AND date_transaction BETWEEN $2 AND $3
             ORDER BY t.id
             LIMIT 10`,
              [id, startDate, endDate]
            )
              .then((res) => {
                let result = res.rows
                if (result <= 0) {
                  result = 'Data not found'
                }
                resolve(result)
              })
              .catch((err) => {
                reject(err)
              })
          }
        }
      } else {
        if (type === 'income') {
          if (weekRange) {
            const startDate = weekRange[0]
            const endDate = weekRange[1]
            db.query(
              `SELECT t.sender_id, t.amount, t.notes, t.date_transaction, sender.image AS sender_image,  
               sender.username AS sender_username FROM transactions t
               JOIN users AS sender ON t.sender_id = sender.id
               WHERE receiver_id = $1 AND date_transaction BETWEEN $2 AND $3
               ORDER BY t.id DESC
               LIMIT 10`,
              [id, startDate, endDate]
            )
              .then((res) => {
                let result = res.rows
                if (result <= 0) {
                  result = 'Data not found'
                }
                resolve(result)
              })
              .catch((err) => {
                reject(err)
              })
          } else if (monthRange) {
            const startDate = monthRange[0]
            const endDate = monthRange[1]
            db.query(
              `SELECT t.sender_id, t.amount, t.notes, t.date_transaction, sender.image AS sender_image,  
               sender.username AS sender_username FROM transactions t
               JOIN users AS sender ON t.sender_id = sender.id
               WHERE receiver_id = $1 AND date_transaction BETWEEN $2 AND $3
               ORDER BY t.id
               LIMIT 10`,
              [id, startDate, endDate]
            )
              .then((res) => {
                let result = res.rows
                if (result <= 0) {
                  result = 'Data not found'
                }
                resolve(result)
              })
              .catch((err) => {
                reject(err)
              })
          }
        } else if (type === 'expense') {
          if (weekRange) {
            const startDate = weekRange[0]
            const endDate = weekRange[1]
            db.query(
              `SELECT t.sender_id, t.receiver_id, t.amount, t.notes, t.date_transaction, receiver.image AS receiver_image,   
               receiver.username AS receiver_username FROM transactions t
               JOIN users AS receiver ON t.receiver_id = receiver.id
               WHERE sender_id = $1 AND date_transaction BETWEEN $2 AND $3
               ORDER BY t.id DESC
               LIMIT 10`,
              [id, startDate, endDate]
            )
              .then((res) => {
                let result = res.rows
                if (result <= 0) {
                  result = 'Data not found'
                }
                resolve(result)
              })
              .catch((err) => {
                reject(err)
              })
          } else if (monthRange) {
            const startDate = monthRange[0]
            const endDate = monthRange[1]
            db.query(
              `SELECT t.sender_id, t.receiver_id, t.amount, t.notes, t.date_transaction, receiver.image AS receiver_image, 
               receiver.username AS receiver_username FROM transactions t
               JOIN users AS receiver ON t.receiver_id = receiver.id
               WHERE sender_id = $1 AND date_transaction BETWEEN $2 AND $3
               ORDER BY t.id
               LIMIT 10`,
              [id, startDate, endDate]
            )
              .then((res) => {
                let result = res.rows
                if (result <= 0) {
                  result = 'Data not found'
                }
                resolve(result)
              })
              .catch((err) => {
                reject(err)
              })
          }
        }
      }
    })
  },
  transfer: (idToken, receiver, amount, notes) => {
    return new Promise((resolve, reject) => {
      db.query(
        `insert into transactions (sender_id, receiver_id, amount, notes) 
                  values($1, $2, $3, $4)`,
        [idToken, receiver, amount, notes]
      )
        .then((res) => {
          resolve(`${res.rowCount} data created`)
        })
        .catch((err) => {
          reject(err)
        })
    })
  },
  newTransaction: (idToken, receiver, amount, notes) => {
    return new Promise(async (resolve, reject) => {
      try {
        await db.query('BEGIN')

        const senderBalanceResult = await db.query(
          'SELECT balance FROM users WHERE id = $1',
          [idToken]
        )
        const senderBalance = senderBalanceResult.rows[0].balance

        if (senderBalance < amount) {
          throw new Error('Insufficient balance')
        }

        await db.query(
          'UPDATE users SET balance = balance - $1 WHERE id = $2',
          [amount, idToken]
        )

        await db.query(
          'UPDATE users SET balance = balance + $1 WHERE id = $2',
          [amount, receiver]
        )

        await db.query(
          `INSERT INTO transactions (sender_id, receiver_id, amount, notes) 
                  VALUES ($1, $2, $3, $4)`,
          [idToken, receiver, amount, notes]
        )

        await db.query('COMMIT')

        resolve('Transaction successful')
      } catch (error) {
        await db.query('ROLLBACK')
        reject(error)
      }
    })
  },
}

module.exports = model
