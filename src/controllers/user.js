const model = require("../models/user");
const controller = {};
const response = require("../utils/response");
const hashing = require("../utils/hash");
const fs = require("fs");

// add data user
controller.createUser = async (req, res) => {
    try {
        //check apakah email atau password sudah ada
        const checkEmailOrUsername = await model.getPassword(req.body);
        if (checkEmailOrUsername) {
            if(checkEmailOrUsername.username == req.body.username){
                return response(res, 500, `Username sudah terdaftar`);
            }

            if(checkEmailOrUsername.email == req.body.email){
                return response(res, 500, `Email sudah terdaftar`);
            }
        }
        
        req.body.password = await hashing(req.body.password)
        const result = await model.createNewUser(req.body)
        return response(res, 200, result)
    } catch (error) {
        return response(res, 500, error.message)
    }
}

// add pin user
controller.createPin = async (req, res) => {
    try {
        const result = await model.createPin(req.body)
        return response(res, 200, result)
    } catch (error) {
        return response(res, 500, error.message)
    }
}

controller.checkEmail = async (req, res) => {
  try {
        const check = await model.checkEmail(req.body.email)
        if(!check) {
          return response(res, 500, `Email tidak terdaftar`);
        }
        const data = check;
        return response(res, 200, {message : `Email terdaftar`, data});
  } catch (error) {
    return response(res, 500, error.message);
  }
};

controller.resetPassword = async (req, res) => {
  try {
    req.body.password = await hashing(req.body.password)
    
    const data = await model.resetPassword(req.body)
    return response(res, 200, data)


  } catch (error) {
    return response(res, 500, error.message);
  }
};


controller.updateImageUser = async (req, res) => {
  try {
    console.log(req.file);
    const image = `http://localhost:3001/user/image/${req.file.filename}`;
    const dataExist = await model.getUserById(req.decodeToken.id);
    if (dataExist === false) {
      return response(res, 404, "Data not found");
    }
    const result = await model.updateImageUser(image, req.decodeToken.id);
    console.log(req.file);
    // cek apakah update mengirim file dan value db user.image tidak null
    if (image && dataExist[0].image) {
      const imageName = dataExist[0].image.replace(
        "http://localhost:3001/user/image/",
        ""
      );
      const path = `./public/upload/user/${imageName}`;
      fs.unlinkSync(path);
    }
    return response(res, 200, result);
  } catch (error) {
    return response(res, 500, error.message);
  }
};

controller.getProfile = async (req, res) => {
  try {
    const result = await model.getProfile(req.decodeToken.id);
    return response(res, 200, result);
  } catch (error) {
    return response(res, 500, error.message);
  }
};
controller.getAllUser = async (req, res) => {
  try {
    const result = await model.getBy(req.query.search, req.decodeToken.id);
    return response(res, 200, result);
  } catch (error) {
    return response(res, 500, error.message);
  }
};

controller.checkPin = async (req, res) => {
  try {
    const result = await model.getProfile(req.decodeToken.id);
    const pin = result[0].pin;
    if (pin != req.body.pin) {
      return response(res, 401, "Incorrect Pin");
    }
    return response(res, 200, "Pin Verified Successfully");
  } catch (error) {
    return response(res, 500, error.message);
  }
};

controller.updatePass = async (req, res) => {
  try {
    const password = req.body.password ? req.body.password : true;
    const newPassword = req.body.newpassword ? req.body.newpassword : true;
    const confirmNewPassword = req.body.confirmnewpassword
      ? req.body.confirmnewpassword
      : false;

    const result = await model.getProfile(req.decodeToken.id);
    const currenPass = result[0].password;
    if (password != currenPass) {
      return response(res, 401, "Incorrect Password");
    }
    if (newPassword !== confirmNewPassword) {
      return response(
        res,
        401,
        "New Password and Comfirm Password do not match"
      );
    }

    const data = await model.updatePass(newPassword, req.decodeToken.id);

    return response(res, 200, data);
  } catch (error) {
    return response(res, 500, error.message);
  }
};
controller.updatePin = async (req, res) => {
  try {
    console.log("yo");
    const pin = req.body.pin ? req.body.pin : null;
    console.log(pin);
    if (!pin) {
      return response(res, 401, "Please Input Pin");
    }
    const data = await model.updatePin(pin, req.decodeToken.id);

    return response(res, 200, data);
  } catch (error) {
    return response(res, 500, error.message);
  }
};

module.exports = controller;
