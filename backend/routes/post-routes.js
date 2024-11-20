const express = require('express');
const authenticate = require('../services/auth/authenticate');

const {
  getPosts, 
  getPost, 
  deletePost,
  addPost,
  updatePost,
} = require('../controllers/post-controller');

const router = express.Router();

router.get('/posts/:threadId', getPosts);
router.get('/posts/post/:id', getPost);
router.delete('/posts/:id', deletePost);
router.post('/posts', addPost);
router.patch('/posts/:id', updatePost);

module.exports = router;