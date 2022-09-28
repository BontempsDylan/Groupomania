// Package file system for modify the system of data for delete function.
const fs = require('fs');
// import of model's post.
const Post = require('../models/Post');
const { json } = require('express');
require('dotenv').config();

/*
 * objectif => create post with the model of post.
 */

exports.createPost = (req, res, next) => {
    const postObject = JSON.parse(req.body.post);
    const post = new Post({
      ...postObject,
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    
    post.save()
      .then(() => { res.status(201).json({ post })})
      .catch(error => { res.status(400).json({ error })});
    
};

/*
 * objectif => modify post.
 */

exports.modifyPost = (req, res, next) => {
    const postObject = req.file ? {
      ...json.parse(req.body.post),
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body }

    delete postObject._userId
    Post.findOne({ _id: req.params.id })
      .then((post) => {
          Post.updateOne({ _id: req.params.id }, { ...postObject, _id: req.params.id})
          .then(() => res.status(200).json({message: 'Objet modifié!'}))
          .catch(error => res.status(401).json({ error }));       
      })
      .catch(error => res.status(400).json({ error }));
}

/*
 * objectif => delete one post.
 */

exports.deletePost = (req, res, next) => {
    Post.findOne({ _id: req.params.id})
      .then(post => {
          const filename = post.imageUrl.split('/images/')[1];
          fs.unlink(`images/${filename}`, () => {
            Post.deleteOne({_id: req.params.id})
              .then(() => { res.status(200).json({message: 'Objet supprimé !'})})
              .catch(error => res.status(401).json({ error }));
          });
        })     
}

/*
 * objectif => get one post.
 */

exports.getOnePost = (req, res, next) => {
    Post.findOne({ _id: req.params.id })
      .then((post) => res.status(200).json(post))
      .catch(error => res.status(404).json({ error }));
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
            .then(() => { res.status(200).json({ message: "Votre avis sur le post a été pris en compte." });})
            .catch((error) => { res.status(400).json({ error: error });});
          } else {
            return res.status(404).json({ message: "Vous n'avez pas encore like ce post." })
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
              return res.status(404).json({ message: "Vous avez déjà like ce post."})
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
      console.error("not today : mauvaise requête");
  }
};
