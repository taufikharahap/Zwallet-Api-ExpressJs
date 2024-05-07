const model = require("../models/user");
const response = require("../utils/response");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// tidak mempunyai model karena akan memakai model user

const genToken = (id) => {
  const payload = {
    id: id,
  };
  const token = jwt.sign(payload, process.env.JWT_KEY, { expiresIn: "1d" });
  return token;
};

const controller = {
  login: async (req, res) => {
    try {
      const { password, id } = await model.getPassByEmail(req.body.email);
      console.log(id);
      if (!password) {
        return response(res, 401, "Invalid Email");
      }
      const passwordUser = req.body.password;
        const check = await bcrypt.compare(passwordUser, password);
    //   const check = passwordUser == password;
      if (check) {
        const tokenJwt = genToken(id);
        return response(res, 200, {
          message: "Login Succesful",
          token: tokenJwt,
        });
      } else {
        return response(res, 401, "Incorrect Password");
      }
    } catch (error) {
      response(res, 200, error.message);
    }
  },
};

module.exports = controller;
