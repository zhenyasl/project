const Post = require('../models/post');

const handleError = (res, error) => {
  res.status(500).json({ error });
}

const getPosts = (req, res) => {
  Post
  .find({thread_id : req.params.threadId})
  .sort({ title: 1 })
  .then((posts) => {
    res
      .status(200)
      .json(posts);
  })
  .catch((err) => handleError(res, err));
};

const getPost = (req, res) => {
  Post
  .findById(req.params.id)
  .then((post) => {
    res
      .status(200)
      .json(post);
  })
  .catch((err) => handleError(res, err));
};

const deletePost = (req, res) => {
  Post
  .findByIdAndDelete(req.params.id)
  .then((result) => {
    res
      .status(200)
      .json(result);
  })
  .catch((err) => handleError(res, err));
};

const addPost = (req, res) => {
  const post = new Post(req.body);
  console.log(req.body);
  post
  .save()
  .then((result) => {
    res
      .status(201)
      .json(result);
  })
  .catch((err) => handleError(res, err));
};

const updatePost = (req, res) => {
  Post
  .findByIdAndUpdate(req.params.id, req.body)
  .then((result) => {
    res
      .status(200)
      .json(result);
  })
  .catch((err) => handleError(res, err));
};

module.exports = {
  getPosts,
  getPost,
  deletePost,
  addPost,
  updatePost,
};