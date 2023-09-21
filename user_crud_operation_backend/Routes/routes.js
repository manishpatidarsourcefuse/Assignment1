const express = require('express');
const router = express.Router();

const  { getAllUser, addUser, getUserById, updateUser, deleteUser } = require('../controllers/userController.js')

router.get("/user", getAllUser);
router.post("/user", addUser);
router.get('/user/:id', getUserById);
router.put('/user/:id', updateUser);
router.delete('/user/:id', deleteUser);

module.exports = router;


