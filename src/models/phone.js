const db = require("../config/db");

const model = {
  getPhone: (idUser) => {
    return new Promise((resolve, reject) => {
      db.query(`select id, phone_number from phone where user_id = $1`, [
        idUser,
      ])
        .then((res) => {
          let result = res.rows;
          if (result <= 0) {
            result = "Data not found";
          }
          resolve(result);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  addPhone: (user_id, phone_number) => {
    return new Promise((resolve, reject) => {
      db.query(
        `insert into phone (user_id, phone_number) 
            values($1, $2)`,
        [user_id, phone_number]
      )
        .then((res) => {
          resolve(`${res.rowCount} data created`);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  deletePhone: (id) => {
    return new Promise((resolve, reject) => {
      db.query(`delete from phone where id = $1`, [id])
        .then((res) => {
          resolve(`${res.rowCount} data deleted`);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  dataExistsPhone: (phone) => {
    return new Promise((resolve, reject) => {
      db.query("SELECT id FROM phone WHERE phone_number = $1", [phone])
        .then((res) => {
          if (res.rows.length) {
            resolve(true);
          } else {
            resolve(false);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
};

module.exports = model;
