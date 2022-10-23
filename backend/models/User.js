const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator');

/*
* Objectif => Créate model of user. 
*/

// model of sauces.
const userSchema = mongoose.Schema({
    nom: { type: String, required: true},
    prenom: { type: String, required: true},
    email: { type: String, required: true, unique: false},
    password: { type: String, required: true},
    admin: { type: String, required: true, default:false}
});

userSchema.plugin(uniqueValidator)

module.exports = mongoose.model('User', userSchema);