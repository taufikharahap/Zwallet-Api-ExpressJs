const db = require("../config/db");
const escape = require("pg-format");
const model = {};

// mengambil data user untuk kebutuhan login berdasarkan email
model.getPassByEmail = (email) => {
    console.log(email);
    return new Promise((resolve, reject) => {
      db.query(`SELECT id, password FROM users WHERE email = $1`, [email])
        .then((res) => {
          if (res.rows.length) {
            resolve(res.rows[0]);
          } else {
            resolve(false);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
  
  // Cek data apakah ada atau tidak didalam table user with id user
  // Sekarang hanya mengambil id dan img (jika membutuhkan colom lain tambahkan saja)
  model.getUserById = (id) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT id, image FROM users WHERE id = $1`, [id])
        .then((res) => {
          let result = res.rows;
          if (result <= 0) {
            result = false;
          }
          resolve(result);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
  
  model.updateImageUser = (image, id_user) => {
    return new Promise((resolve, reject) => {
      db.query(
        `UPDATE users SET
                  image = $1,
                  updated_at = now()
              WHERE id = $2`,
        [image, id_user]
      )
        .then((res) => {
          resolve(`${res.rowCount} user updated`);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
  
  model.getProfile = (id) => {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT u.*, string_agg(p.phone_number, ', ') AS phone FROM users u 
        left JOIN public.phone p ON p.user_id = u.id WHERE u.id = $1 group by u.id`,
        [id]
      )
        .then((res) => {
          let result = res.rows;
          resolve(result);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
  
  model.getBy = async (search, idToken) => {
    try {
      let filterQuery = "";
      console.log(search);
      if (search) {
        filterQuery += search
          ? escape("AND username like %L", `%${search}%`)
          : "";
      }
  
      const data = await db.query(
        `
                SELECT 
                    u.id, u.username, u.image,
                    string_agg(p.phone_number, ', ') AS phone
                FROM public.users u
                JOIN public.phone p ON p.user_id = u.id 
                WHERE true and u.id != $1 ${filterQuery}
                GROUP BY u.id
            `,
        [idToken]
      );
  
      if (data.rows <= 0) {
        return "data not found";
      } else {
        return { data: data.rows };
      }
    } catch (error) {
      throw error;
    }
  };
  
  model.updatePin = (pin, id_user) => {
    return new Promise((resolve, reject) => {
      db.query(
        `UPDATE users SET
                  pin = $1,
                  updated_at = now()
              WHERE id = $2`,
        [pin, id_user]
      )
        .then((res) => {
          resolve(`${res.rowCount} user updated`);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  model.updatePass = (password, id_user) => {
    return new Promise((resolve, reject) => {
      db.query(
        `UPDATE users SET
                  password = $1,
                  updated_at = now()
              WHERE id = $2`,
        [password, id_user]
      )
        .then((res) => {
          resolve(`${res.rowCount} user updated`);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

//check apakah email atau password sudah ada
model.getPassword = ({email, username}) => {
    return new Promise((resolve, reject) => {
        db.query(`SELECT 
                    email, 
                    username
                    FROM public.users 
                    WHERE email = $1 or username = $2`,
                    [email, username])
            .then((res) => {
                if (res.rows.length) {
                    resolve(res.rows[0])
                } else {
                    resolve(false)
                }
            })
            .catch((er) => {
                reject(er)
            })
    })
}

model.createNewUser = ({email, username, password}) => {
    return new Promise((resolve, reject) => {
        db.query(
            `INSERT INTO public.users (email, username, password)
                VALUES($1, $2, $3)`,
                [email, username, password]
        )
        .then((res) => {
            resolve(`${res.rowCount} user created`)
        })
        .catch((er) => {
            reject(er)
        })
    })
}

model.createPin = ({pin, email,}) => {
    return new Promise((resolve, reject) => {
        db.query(
            `UPDATE public.users SET
                pin = COALESCE(NULLIF($1, ''), pin),
                updated_at = now()
            WHERE email = $2           
        `,
            [pin, email]
        )
            .then((res) => {
                resolve(`${res.rowCount} user pin created`)
            })
            .catch((er) => {
                reject(er)
            })
    })
}

model.checkEmail = (email) => {
  return new Promise((resolve, reject) => {
    db.query(`SELECT id, password FROM public.users WHERE email = $1`, [email])
      .then((res) => {
        if (res.rows.length) {
          resolve(res.rows[0]);
          console.log(res.rows[0])
        } else {
          resolve(false);
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
}

model.resetPassword = ({password, id}) => {
  return new Promise((resolve, reject) => {
    db.query(
      `UPDATE public.users SET
                password = $1,
                updated_at = now()
            WHERE id = $2`,
      [password, id]
    )
      .then((res) => {
        resolve(`password telah diubah`);
      })
      .catch((error) => {
        reject(error);
      });
  });
};


module.exports = model;
