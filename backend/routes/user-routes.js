const express = require('express');
const authenticate = require('../services/auth/authenticate');

const {
  getUsers, 
  getUser, 
  deleteUser,
  addUser,
  updateUser,
  getUserByUsername,
  getUserByEmail,
  // addSavedThread
} = require('../controllers/user-controller');

const router = express.Router();

router.get('/users', getUsers);
router.get('/users/:id', getUser);
router.get('/users/email/:email', getUserByEmail);

router.delete('/users/username/:username',  getUserByUsername);
router.delete('/users/:id', deleteUser);
router.post('/users', addUser);
router.patch('/users/:id', updateUser);


module.exports = router;