const User = require('../models/user');

const handleError = (res, error) => {
  res.status(500).json({ error });
}

const getUsers = (req, res) => {
    User
  .find()
  .sort({ title: 1 })
  .then((users) => {
    res
      .status(200)
      .json(users);
  })
  .catch((err) => handleError(res, err));
}; 

const getUser = (req, res) => {
    User
  .findById(req.params.id)
  .then((user) => {
    res
      .status(200)
      .json(user);
  })
  .catch((err) => handleError(res, err));
};

const getUserByEmail = (req, res) => {
    User
  .findOne({ username: req.params.email })
  .then((user) => {
    res
      .status(200)
      .json(user);
  })
  .catch((err) => handleError(res, err));
};

const getUserByUsername = (req, res) => {
    User
    .findOne({ username: req.params.username })
  .then((user) => {
    res
      .status(200)
      .json(user);
  })
  .catch((err) => handleError(res, err));
};


const deleteUser = (req, res) => {
    User
  .findByIdAndDelete(req.params.id)
  .then((result) => {
    res
      .status(200)
      .json(result);
  })
  .catch((err) => handleError(res, err));
};

const addUser = (req, res) => {
  const user = new User(req.body);
  user
  .save()
  .then((result) => {
    res
      .status(201)
      .json(result);
  })
  .catch((err) => handleError(res, err));
};

const updateUser = (req, res) => {
    User
  .findByIdAndUpdate(req.params.id, req.body)
  .then((result) => {
    res
      .status(200)
      .json(result);
  })
  .catch((err) => handleError(res, err));
};

const addSavedThread = (req, res) => {
 
};

module.exports = {
  getUsers,
  getUser,
  deleteUser,
  addUser,
  updateUser,
  //
  getUserByUsername,
  getUserByEmail
};