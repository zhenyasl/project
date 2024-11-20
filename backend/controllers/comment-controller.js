const Comment = require('../models/comment');

const handleError = (res, error) => {
  res.status(500).json({ error });
}

const getPostComments = (req, res) => {
  Comment
  .find({post_id : req.params.postId})
  .sort({ title: 1 })
  .then((comments) => {
    res
      .status(200)
      .json(comments);
  })
  .catch((err) => handleError(res, err));
};

const getRepliedComments = (req, res) => {
  Comment
  .find({replied_id : req.params.repliedId})
  .sort({ title: 1 })
  .then((comments) => {
    res
      .status(200)
      .json(comments);
  })
  .catch((err) => handleError(res, err));
};

const getComment = (req, res) => {
    Comment
  .findById(req.params.id)
  .then((comment) => {
    res
      .status(200)
      .json(comment);
  })
  .catch((err) => handleError(res, err));
};

const deleteComment = (req, res) => {
    Comment
  .findByIdAndDelete(req.params.id)
  .then((result) => {
    res
      .status(200)
      .json(result);
  })
  .catch((err) => handleError(res, err));
};

const addPostComment = (req, res) => {
  const comment = new Comment(req.body);
  comment
  .save()
  .then((result) => {
    res
      .status(201)
      .json(result);
  })
  .catch((err) => handleError(res, err));
};

const addRepliedComment = (req, res) => {
  const comment = new Comment(req.body);
  comment
  .save()
  .then((result) => {
    res
      .status(201)
      .json(result);
  })
  .catch((err) => handleError(res, err));
};

const updateComment = (req, res) => {
    Comment
  .findByIdAndUpdate(req.params.id, req.body)
  .then((result) => {
    res
      .status(200)
      .json(result);
  })
  .catch((err) => handleError(res, err));
};

module.exports = {
  getPostComments,
  getRepliedComments,
  getComment,
  deleteComment,
  addPostComment,
  addRepliedComment,
  updateComment,
};