const UserSchema = require("../model/UserSchema");
const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");

const signup = async (req, resp) => {
  UserSchema.findOne({ email: req.body.email }).then((result) => {
    if (result == null) {
      bcrypt.hash(req.body.password, 10, function (err, hash) {
        const user = new UserSchema({
          username: req.body.username,
          fullname: req.body.fullname,
          password: hash,
        });
        user
          .save()
          .then((result) => {
            resp.status(201).json({
              status: true,
              message: "User saved successfully",
            });
          })
          .catch((error) => {
            resp.status(500).json(error);
          });
      });
    } else {
      resp.status(409).json({
        status: false,
        message: "email already exists",
      });
    }
  });
};

const login = async (req, resp) => {
  UserSchema.findOne({ username: req.body.username }).then((selectedUser) => {
    if (selectedUser == null) {
      resp.status(404).json({
        status: false,
        message: "User not found",
      });
    } else {
      bcrypt.compare(
        req.body.password,
        selectedUser.password,
        function (err, result) {
          if (err) {
            return resp.status(500).json(err);
          }
          if (result) {
            //generate token
            const token = jsonwebtoken.sign(
              {
                username: selectedUser.username,
              },
              process.env.SECRET_KEY,
              {expiresIn: "1h"}
            );
            resp.setHeader("Authorization", "Bearer " + token);
            return resp.status(200).json({ message: "check the headers" });
          } else {
            return resp.status(401).json({
              status: false,
              message: "Invalid password",
            });
          }
        }
      );
    }
  });
};

module.exports = {
  signup,
  login,
};
