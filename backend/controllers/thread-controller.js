const Thread = require('../models/thread');

const handleError = (res, error) => {
  res.status(500).json({ error });
}

const getThreads = (req, res) => {
  Thread
  .find()
  .sort({ title: 1 })
  .then((threads) => {
    res
      .status(200)
      .json(threads);
  })
  .catch((err) => handleError(res, err));
};

const getThread = (req, res) => {
  Thread
  .findById(req.params.id)
  .then((thread) => {
    res
      .status(200)
      .json(thread);
  })
  .catch((err) => handleError(res, err));
};

const searchThreads = (req, res) => {
  const query = req.body.search; console.log('queryy', query);
  Thread
  .find({
    content: { $regex: query, $options: 'i' }  
  })
  .then((result) => {
    res
      .status(201)
      .json(result);
  })
  .catch((err) => handleError(res, err));
}

const deleteThread = (req, res) => {
  Thread
  .findByIdAndDelete(req.params.id)
  .then((result) => {
    res
      .status(200)
      .json(result);
  })
  .catch((err) => handleError(res, err));
};


const addThread = (req, res) => {
  const thread = new Thread(req.body); 
  thread
  .save()
  .then((result) => {
    res
      .status(201)
      .json(result);
  })
  .catch((err) => handleError(res, err));
};

const updateThread = (req, res) => {
  Thread
  .findByIdAndUpdate(req.params.id, req.body)
  .then((result) => {
    res
      .status(200)
      .json(result);
  })
  .catch((err) => handleError(res, err));
};

const getThreadsByUserId = (req, res) => {
    const username = req.params.username;
  
    Thread
      .find({ username: username }) 
      .sort({ title: 1 }) 
      .then((result) => {
        res.status(200).json(result); 
      })
      .catch((err) => handleError(res, err)); 
  };

  const getThreadsByUsername = (req, res) => {
    const username = req.params.username;
    console.log('username', username);
  
    Thread
      .find({ username: username }) 
      .sort({ title: 1 })
      .then((result) => {
        res.status(200).json(result); 
      })
      .catch((err) => handleError(res, err)); 
  };

module.exports = {
  getThreads,
  getThread,
  deleteThread,
  addThread,
  updateThread,
  getThreadsByUserId,
  getThreadsByUsername,
  searchThreads
};