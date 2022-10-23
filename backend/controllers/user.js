require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const User = require('../models/User');
const {sendServerErrorResponse, sendUnauthorizedResponse} = require("./../error-handlers");


const createJwtResponse = (user) => {
    return {
        userId: user._id,
        token: jwt.sign(
            { userId: user._id, isAdmin: user.isAdmin},
            process.env.SECRET_TOKEN,
            { expiresIn: '40s'}
        )
    };
};

const createRefreshJwtResponse = (user) => {
    return {
        userId: user._id,
        token: jwt.sign(
            { userId: user._id, isAdmin: user.isAdmin},
            process.env.REFRESH_TOKEN,
            { expiresIn: '1y'}
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
            const accessToken = createJwtResponse(user);
            const refreshToken = createRefreshJwtResponse(user);
            user.save()
                .then(() => {
                    res.send({
                        accessToken,
                        refreshToken
                    });
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
            const accessToken = createJwtResponse(user);
            const refreshToken = createRefreshJwtResponse(user);
            res.send({
                accessToken,
                refreshToken
            });
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

exports.userRefreshToken = (req, res) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if(!token) {
        return res.sendStatus(401);
    }

    jwt.verify(token, process.env.REFRESH_TOKEN, (err, user) => {
        if (err) {
            return res.sendStatus(401)
        }
        delete user.iat;
        delete user.exp;
        const accessToken = createRefreshJwtResponse(user);
        res.send({
            accessToken
        });
    });
}