const mongoose = require('mongoose');

/*
* Objectif => Créate model of post 
*/

// model of sauces.
const postSchema = mongoose.Schema({
  userId: {type: mongoose.Types.ObjectId, ref: "User"},
  publication: { type: String, required: false },
  imageUrl: { type: String, required: false },
  likes: { type: Number, required: false, default:0},
  usersLiked: { type: [String], required: false}, 
});

module.exports = mongoose.model('Post', postSchema);