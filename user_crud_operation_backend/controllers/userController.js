const client = require("../database/db.js");

const addUser = ((req, res) => {
    const userData = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        phone: req.body.phone,
        address: req.body.address
    }

    try {
        if (!userData) {
          throw Error("Send data in request body");
        }
        client.query(
          `INSERT INTO user_detail (first_name, last_name, email, phone, address) VALUES ($1, $2, $3, $4, $5)`,
          [userData.first_name, userData.last_name, userData.email, userData.phone, userData.address],
          (err, data) => {
            res.status(200).json({
              message: "Created new User",
            });
          }
        );
      } catch (error) {
        res.status(500).json({
          error: error.message,
          message: "Failed to create new User",
        });
      }
})


const getAllUser = ((req, res) => {
  try {
    client.query("SELECT * FROM user_detail", (err, data) => {
      if (err) throw err;
      res.status(200).json({
        user: data.rows,
      });
    });
  } catch (error) {
    res.status(500).json({
      err: error.message,
      notes: null,
    });
  }
})

const getUserById = ((req, res) => {
    try {
      const { id } = req.params;
      client.query("SELECT * FROM user_detail WHERE id=$1", [id], (err, data) => {
        if (err) throw err;
  
        res.status(200).json({
          user: data.rows[0],
        });
      });
    } catch (error) {
      res.status(500).json({
        err: err.message,
        note: null,
      });
    }
})

const updateUser = ((req, res) => {
    const { id } = req.params;
    const userData = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      phone: req.body.phone,
      address: req.body.address
    }
    
    try {
        if (!userData) {
          throw Error("Send data in request body");
        }
        client.query(
          "UPDATE user_detail SET first_name = $1, last_name = $2, email = $3, phone = $4, address = $5 WHERE id = $6",
          [userData.first_name, userData.last_name, userData.email, userData.phone, userData.address, id],
          (err, data) => {
            if (err) throw err;
            res.status(200).json({
              message: "Updated user",
            });
          }
        );
      } catch (error) {
        res.status(500).json({
          err: error.message,
          message: "Failed to update user",
        });
      }
})


const deleteUser = ((req, res) => {
  try {
    const { id } = req.params;
    client.query("DELETE FROM user_detail WHERE id=$1", [id], (err, data) => {
      if (err) throw err;
      res.status(200).json({
        error: null,
        message: "User deleted",
      });
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
      message: "Failed to delete user",
    });
  }
})

module.exports = { addUser, getAllUser, getUserById, updateUser, deleteUser}