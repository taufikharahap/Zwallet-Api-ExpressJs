const express = require("express");
const app = express();
const port = 3001;
<<<<<<< HEAD
const db = require("./src/config/db");
const routers = require("./src/routers/index");
=======
const routers = require("./src/routers");
>>>>>>> taufik-backend
const cors = require("cors");

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routers);

db.connect()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
