const model = require("../models/phone");
const response = require("../utils/response");

const controller = {
  getPhone: async (req, res) => {
    try {
      // decodeToken ngambil dari auth
      const data = await model.getPhone(req.decodeToken.id);
      return response(res, 200, data);
    } catch (error) {
      return response(res, 500, error.message);
    }
  },
  addPhone: async (req, res) => {
    try {
      const { phone_number } = req.body;
      const phoneExists = await model.dataExistsPhone(phone_number);
      if (phoneExists) {
        return response(res, 401, "Phone already exists");
      }
      const data = await model.addPhone(req.decodeToken.id, phone_number);
      return response(res, 201, data);
    } catch (error) {
      return response(res, 500, error.message);
    }
  },

  deletePhone: async (req, res) => {
    try {
      const id = req.params.id;
      const data = await model.deletePhone(id);
      return response(res, 200, data);
    } catch (error) {
      return response(res, 500, error.message);
    }
  },
};

module.exports = controller;
