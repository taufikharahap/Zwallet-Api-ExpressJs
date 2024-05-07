const express = require("express");
const routers = express.Router();
const authRoutes = require("./auth");
const userRoutes = require("./user");
<<<<<<< HEAD
const transRoutes = require("./transaction");
const phoneRoutes = require("./phone");

routers.use("/user", userRoutes);
routers.use("/auth", authRoutes);
routers.use("/transaction", transRoutes);
routers.use("/phone", phoneRoutes);
routers.use("/transaction", transRoutes);
=======
>>>>>>> taufik-backend

routers.use("/user", userRoutes);
routers.use("/auth", authRoutes);

module.exports = routers;