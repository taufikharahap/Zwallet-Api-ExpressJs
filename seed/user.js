const { register } = require('../src/controllers/auth')

module.exports = async () => {
  try {
    // Tambahkan data user sesuai kebutuhan
    const usersData = [
      {
        email: 'user1@example.com',
        username: 'user1',
        password: 'password1',
        pin: '1234',
        balance: 100,
      },
      {
        email: 'user2@example.com',
        username: 'user2',
        password: 'password2',
        pin: '5678',
        balance: 200,
      },
      {
        email: 'user3@example.com',
        username: 'user3',
        password: 'password3',
        pin: '9012',
        balance: 150,
      },
      {
        email: 'user4@example.com',
        username: 'user4',
        password: 'password4',
        pin: '3456',
        balance: 300,
      },
      {
        email: 'user5@example.com',
        username: 'user5',
        password: 'password5',
        pin: '7890',
        balance: 250,
      },
      {
        email: 'user6@example.com',
        username: 'user6',
        password: 'password6',
        pin: '2345',
        balance: 400,
      },
      {
        email: 'user7@example.com',
        username: 'user7',
        password: 'password7',
        pin: '6789',
        balance: 350,
      },
      {
        email: 'user8@example.com',
        username: 'user8',
        password: 'password8',
        pin: '0123',
        balance: 500,
      },
      {
        email: 'user9@example.com',
        username: 'user9',
        password: 'password9',
        pin: '4567',
        balance: 450,
      },
      {
        email: 'user10@example.com',
        username: 'user10',
        password: 'password10',
        pin: '8901',
        balance: 600,
      },
    ]

    for await (const userData of usersData) {
      console.log(userData.email)
      await register(userData.username, userData.password, userData.email)
    }

    console.log(`${usersData.length} users created`)
  } catch (error) {
    throw error
  }
}
