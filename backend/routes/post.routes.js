const express = require('express');

const router = express.Router();

// Get method 
router.get('/post', (req, res) => {
  res.json({message: 'Get all posts!'});
});

// Post method
router.post('/post', (req, res) => {
  console.log(req.body);
  res.json({message: 'Post created!'});
});

// Put method
router.put('/post/:id', (req, res) => {
  console.log(req.body);
  console.log(req.params.id);
  res.json({message: 'Put updated!'});
});

// Delete method
router.delete('/post/:id', (req, res) => {
  console.log(req.params.id);
  res.json({message: 'delete item!'});
});

// patch method
router.patch('/post/:id', (req, res) => {
  console.log(req.body);
  console.log(req.params.id);
  res.json({message: 'patch updated!'});
});


module.exports = router;