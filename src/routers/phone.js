const express = require("express");
const routers = express.Router();
const phoneController = require("../controllers/phone.js");
const authMiddleware = require("../middleware/auth.js");

routers.get("/", authMiddleware.authentication, phoneController.getPhone);
routers.post("/", authMiddleware.authentication, phoneController.addPhone);
routers.delete(
  "/:id",
  authMiddleware.authentication,
  phoneController.deletePhone
);

module.exports = routers;
