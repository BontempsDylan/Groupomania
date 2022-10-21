require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const User = require('../models/User');
const {sendServerErrorResponse, sendUnauthorizedResponse} = require("./../error-handlers");

const createJwtResponse = (user) => {
    return {
        userId: user._id,
        token: jwt.sign(
            { userId: user._id, isAdmin: user.isAdmin, username: user.name},
            process.env.SECRET_TOKEN,
            { expiresIn: '24h'}
        )
    };
};

/*
* Objectif => Create account. 
*/
exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new User({
                nom: req.body.nom,
                prenom: req.body.prenom,
                email: req.body.email,
                password: hash
            });
            user.save()
                .then(() => {
                    res.status(200).json(createJwtResponse(user));
                })
                .catch(error => res.status(400).json({ error }));
                 
        })
        .catch(error => res.status(500).json({ error }));
         
};

/*
* Objective => allow account login. 
*/
exports.login = async (req, res, next) => {
    let user;

    try {
        user = await User.findOne({email: req.body.email});
    } catch(error) {
        sendServerErrorResponse(res);
        return;
    }

    if(user === null) {
        res.status(404).json({message: "utilisateur non trouvé"});
        return;
    } 

    try {
        const passwordComparisonIsValid = await bcrypt.compare(req.body.password, user.password);
        if(!passwordComparisonIsValid) {
            sendUnauthorizedResponse(res);
        } else {
            res.status(200).json(createJwtResponse(user));
        }
    } catch(error) {
        console.error(error);
        console.error("BCRYPT COMPARE ERROR");
        sendServerErrorResponse(res);
    }
};

exports.getAllUser = (req, res, next) => {
    User.find()
      .then((users) => res.status(200).json(users))
      .catch(error => res.status(400).json({ error }));
}

exports.getOneUser = (req, res, next) => {
    User.findOne({ _id: req.params.id })
    .then((user) =>{ 
      if (user) {
        User.findOne({ _id: req.params.id })
          .then((user) => res.status(200).json(user))
          .catch(error => res.status(404).json({ error }));
      } else {
        return res.status(404).json({ message: "Cette utilisateur n'éxiste pas." })
      }
    })    
  }