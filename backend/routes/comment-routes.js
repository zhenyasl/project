const express = require('express');
const authenticate = require('../services/auth/authenticate');

const {
  getPostComments,
  getRepliedComments, 
  getComment, 
  deleteComment,
  addPostComment,
  addRepliedComment,
  updateComment,
} = require('../controllers/comment-controller');

const router = express.Router();

router.get('/comments/post/:postId', getPostComments);
router.get('/comments/replied/:repliedId', getRepliedComments);
router.get('/comments/:id', getComment);
router.delete('/comments/:id', deleteComment);
router.post('/comments', addPostComment);
// router.post('/comments/replied/:repliedId', addRepliedComment);
router.patch('/comments/:id', updateComment);

module.exports = router;