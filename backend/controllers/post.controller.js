
const PostModel = require('../models/post.model');


// Retrieve and return all posts from the database.
module.exports.findAllPosts = async (req, res) => {
  const posts = await PostModel.find();
  res.json(posts);
};

// Create and Save a new Post
module.exports.createPosts = async (req, res) => {
  // Validate request
  if (!req.body.message) {
    return res.status(400).json({
      message: "Post content can not be empty"
    });
  }

  // Create a Post
  const post = new PostModel({
    message: req.body.message,
    author : req.body.author,
  });

  // Save Post in the database
  await post.save();

  res.status(201).json({post: post, message: 'Post created!'});
};

// Update a post identified by the postId in the request
module.exports.updatePost = async (req, res) => {
  // Validate Request
  if (!req.body.message) {
    return res.status(400).json({
      message: "Post content can not be empty"
    });
  }

  // Find post and update it with the request body
  // const post = await PostModel.findByIdAndUpdate(req.params.id, {
  //   message: req.body.message,
  // }, {new: true});

  const post = await PostModel.findById(req.params.id);

  if (!post) {
    return res.status(404).json({
      message: "Post not found with id " + req.params.id
    });
  }

  const updatedPost = await PostModel.findByIdAndUpdate(post, req.body, {new: true});

  res.json(updatedPost);
};

// Delete a post with the specified postId in the request
module.exports.deletePost = async (req, res) => {
  const post = await PostModel.findById(req.params.id);

  if (!post) {
    return res.status(404).json({
      message: "Post not found with id " + req.params.id
    });
  }

  console.log(post);

  await PostModel.deleteOne(post);
  res.json({message: 'Post deleted successfully!'});
};

// Patch a post with the specified postId in the request
module.exports.likePost = async (req, res) => {

  const post = await PostModel.findById(req.params.id);

  if (!post) {
    return res.status(404).json({
      message: "Post not found with id " + req.params.id
    });
  }

  try{
    var liker = await PostModel.findById(String(req.body.likerId));
    if (!liker) {
      return res.status(404).json({
        message: "Liker not found with id " + req.body.likerId
      });
    }
  } catch {
    return res.status(404).json({
      message: "Liker not found"
    })
  }

  // try{
  //   PostModel.findByIdAndUpdate(
  //     req.params.id,
  //     { $addToSet: { likers: req.params.id } },
  //     { new: true }
  //   ).then(data => res.json(data))
  // } catch (error) {
  //   return res.status(400).json(error);
  // }

  post.likers.push(liker.id);

  await post.save();
  res.json({message: 'Post liked successfully!'});
};  

// 
module.exports.DislikePost = (req, res)=>{
  try{
    PostModel.findByIdAndUpdate(
      req.params.id,
      { $pull: { likers: req.body.likerId } },
      { new: true }
    ).then(data => res.json(data))
  } catch (error) {
    return res.status(400).json(error);
  }
}