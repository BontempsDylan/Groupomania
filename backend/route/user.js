const express = require('express');
// import express-validator for validate all writing fields.
const { body } = require('express-validator');
const { finalValidation } = require('../middleware/final-validation')

const userCtrl = require('../controllers/user');

const router = express.Router();

/*
* Objectif => define a router for the differente requete's methodes.
*/

router.post(
    '/signup', 
    body('nom')
        .not().isEmpty()
        .withMessage("Vous devez rentrer votre nom")
        .escape(),
    body('prenom')
        .not().isEmpty()
        .withMessage("Vous devez rentrer votre prenom")
        .escape(),
    body('password')
        .isLength({ min: 5, max: 20 })
        .withMessage("Votre mot de passe doit contenir minimum 5 caractères et maximum 20 caractères")
        .not().isEmpty()
        .withMessage("Le champ mot de passe ne doit pas être vide.")
        .matches(/[!@#%^&*_+\-:?~]/)
        .withMessage("Votre mot de passe doit contenir au moins un symbole parmi !@#%^&*_+\-:?~")
        .matches(/\d{2,}/)
        .withMessage("Votre mot de passe doit contenir au moins 2 chiffres")
        .escape(),
    body('password').custom(pwd => {
        const validated = pwd.toLowerCase() !== pwd && pwd.toUpperCase() !== pwd;
        if (!validated) {
            throw new Error("Votre mot de passe doit contenir au moins une lettre en minuscule et au moins une lettre en majuscule");
        } else {
            return true;
        }
    }),
    body('password').custom(pwd2 => {
        const validated = pwd2.trim() !== "";
        if (!validated) {
            throw new Error("Votre mot de passe doit ne doit pas etre vide apres un espace");
        } else {
            return true;
        }
    }),
    body('email').isEmail(),
    finalValidation,
    userCtrl.signup
);
router.post(
    '/login', 
    body('password')
        .not().isEmpty()
        .withMessage("Le champ mot de passe ne doit pas être vide.")
        .isString()
        .withMessage("Veuillez envoyer une chaîne de caractères"),
    body('email').isEmail(),
    finalValidation,
    userCtrl.login
);
router.get('/users',userCtrl.getAllUser)
router.get('/users/:id',userCtrl.getOneUser)

module.exports = router;