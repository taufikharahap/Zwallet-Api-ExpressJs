const db = require('../src/config/db')
const user = require('./user')

db.connect(async (err, client, done) => {
  if (err) {
    console.error(err)
    return
  }

  try {
    await user()
    console.log(`seed table success`)
    process.exit(0)
  } catch (error) {
    console.log(error)
  }
})
