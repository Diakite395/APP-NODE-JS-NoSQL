const express = require('express');

const { createPosts, findAllPosts, updatePost, deletePost, likePost, DislikePost } = require('../controllers/post.controller');

const router = express.Router();

// Get method 
router.get('/post', findAllPosts);

// Post method
router.post('/post', createPosts);

// Put method
router.put('/post/:id', updatePost);

// Delete method
router.delete('/post/:id', deletePost);

// patch method (Like)
router.patch('/like/:id', likePost);

// patch method (Dislike)
router.patch('/dislike/:id', DislikePost);


module.exports = router;