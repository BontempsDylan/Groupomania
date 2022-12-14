const mongoose = require('mongoose');

/*
* Objectif => Créate model of post 
*/

// model of sauces.
const postSchema = mongoose.Schema({
  userId: {type: mongoose.Types.ObjectId, ref: "User"},
  nom: { type: String, required: true },
  prenom: { type: String, required: true },
  publication: { type: String, required: false },
  imageUrl: { 
    type: String,
    maxLength: [250, 'Le nom de votre fichier est trop long réduisez le.'], 
    required: false 
  },
  date: { type: Date, required: true },
  likes: { type: Number, required: false, default:0},
  usersLiked: { type: [String], required: false}, 
});

module.exports = mongoose.model('Post', postSchema);