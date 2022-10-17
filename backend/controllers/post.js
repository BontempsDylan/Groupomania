// Package file system for modify the system of data for delete function.
const fs = require('fs');
// import of model's post.
const { json } = require('express');
require('dotenv').config();

const Post = require('../models/Post');

/*
 * objectif => create post with the model of post.
 */

exports.createPost = (req, res, next) => {
    const postObject = req.body;
    if (req.file == undefined && postObject.publication == "") {
      return res.status(400).json({ message: "Votre post doit minimum contenir une publication ou une photo"})
    } else if (req.file == undefined) {
      const post = new Post({
        ...postObject,
      });
      post.save()
      .then(() => { res.status(201).json({ post })})
      .catch(error => { res.status(400).json({ error })});
    } else {
      const post = new Post({
        ...postObject,
        imageUrl: `${req.protocol}://${process.env.HOSTNAME}/images/${req.file.filename}`
        
      });
      post.save()
      .then(() => { res.status(201).json({ post })})
      .catch(error => { res.status(400).json({ error })});
    }
};

/*
 * objectif => modify post.
 */

exports.modifyPost = (req, res, next) => {
    const postObject = req.file ? {
      ...json(req.body.post),
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body }

    delete postObject._userId
    Post.findOne({ _id: req.params.id })
      .then((post) => {
          Post.updateOne({ _id: req.params.id }, { ...postObject, _id: req.params.id})
          .then(() => res.status(200).json({message: 'Publication modifié!'}))
          .catch(error => res.status(401).json({ error }));       
      })
      .catch(error => res.status(400).json({ error }));
}

/*
 * objectif => delete one post.
 */
exports.deletePost = async (req, res, next) => {
  const post = await Post.findOne({ _id: req.params.id});
  if (post === null) {
    return res.status(404).json({ message: "Cette publication n'éxiste pas." })
  }
  // deleting image if exists in the post
  if (post.imageUrl && fs.existsSync(`./images/${post.imageUrl.split('/images/')[1]}`)) {
    fs.unlinkSync(`./images/${post.imageUrl.split('/images/')[1]}`);
  }
  try {
    await Post.deleteOne({_id: req.params.id});
    res.status(200).json({message: 'Publication supprimé !'});
  } catch (error) {
    res.status(401).json({ error })
  }
};

/*
 * objectif => get one post.
 */

exports.getOnePost = (req, res, next) => {
    Post.findOne({ _id: req.params.id })
    .then((post) =>{
      if (post === null) {
        return res.status(404).json({ message: "Cette publication n'éxiste pas." })
      } else {
        Post.findOne({ _id: req.params.id })
          .then((post) => res.status(200).json(post))
          .catch(error => res.status(404).json({ error }));
      }
    })
      
    
      
}

/*
 * objective => get all posts.
 */

exports.getAllPost = (req, res, next) => {
    Post.find()
      .then((posts) => res.status(200).json(posts))
      .catch(error => res.status(400).json({ error }));
}

/*
* Objectif => liked post 
*/

exports.likePost = (req, res, next) => {
  switch (req.body.like) {
    //likes = 0 to cancel the like.
    //uptade the post, send message/error
    case 0:
      Post.findOne({ _id: req.params.id})
        .then((post) =>{
          if (post.usersLiked.find(user => user === req.body.userId)) {
            Post.updateOne({ _id: req.params.id}, {
              $inc: { likes: -1 },
              $pull: { usersLiked: req.body.userId},
              _id: req.params.id
            })
            .then(() => { res.status(200).json({ message: "Votre avis sur la publication a été pris en compte." });})
            .catch((error) => { res.status(400).json({ error: error });});
          } else {
            return res.status(404).json({ message: "Vous n'avez pas encore like Cette publication." })
          }
        })
        .catch((error) => { res.status(404).json({ error: error });});
        break;
    //likes = 1 for liked post.
    //uptade the post, send message/error    
    case 1:
      Post.findOne({ _id: req.params.id})
        .then((post) =>{
          Post.findOne({ _id: req.params.id})       
            if (post.usersLiked.find(user => user === req.body.userId)) {
              return res.status(404).json({ message: "Vous avez déjà like Cette publication."})
            } else {
              Post.updateOne({ _id: req.params.id }, {
                $inc: { likes: 1 },
                $push: { usersLiked: req.body.userId },
                _id: req.params.id
              })
              .then(() => { res.status(201).json({ message: "Votre like a été pris en compte!" }); })
              .catch((error) => { res.status(400).json({ error: error }); });
            }
        })
        .catch((error) => { res.status(404).json({ error: error });
        });        
      break;
    default:
      return res.status(404).json({ message: "Mauvaise requete."});
  }
};
