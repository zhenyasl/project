const express = require('express');
const authenticate = require('../services/auth/authenticate');

const {
    getThreads,
    getThread,
    deleteThread,
    addThread,
    updateThread,
    getThreadsByUserId,
    getThreadsByUsername,
    searchThreads
} = require('../controllers/thread-controller.js');

const router = express.Router();

router.get('/threads', getThreads);
router.get('/threads/:id', getThread);
router.get('/threads/user/:userId', getThreadsByUserId);
router.get('/threads/username/:username', getThreadsByUsername);
router.post('/threads/search/search', searchThreads); //get
router.delete('/threads/:id', deleteThread);
router.post('/threads', addThread);
router.patch('/threads/:id', updateThread);

module.exports = router;