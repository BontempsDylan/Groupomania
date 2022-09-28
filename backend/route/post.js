const express = require('express');
// import auth for road's secure.
const auth = require('../middleware/auth');
// import multer for image's gestion.
const multer = require('../middleware/multer-config');
// import express-validator for validate all writing fields.
const { body } = require('express-validator');
const { finalValidation } = require('../middleware/final-validation')

const router = express.Router();

const post = require('../controllers/post');

// costum multer to handle errors.
const customMulter = (req, res, next) => {
    multer(req, res, function(err) {
        if (req.body.image === '') {
            res.status(400).json({
                message: "no file included, file is required here"
            });
            return;
        }
        else if (err) {
            res.status(400).json({
                message: "bad request, check your input file"
            });
            return;
        }
        next();
    }) 
};

/*
* Objectif => define a router and middleware for the differente requete's methodes.
*/

router.post(
    '/',
    auth, 
    customMulter,
    (req, res, next) => {
        req.body = JSON.parse(req.body.sauce);
        next();
    },
    body('publication')
        .isLength({ min: 2, max: 300 })
        .withMessage("Le nom doit contenir min 2 caractères et maximum 300 caractères")
        .escape(),
    finalValidation,
    post.createPost
    );
router.put('/:id', auth, customMulter, post.modifyPost);
router.delete('/:id', auth, post.deletePost)
router.get('/:id', auth, post.getOnePost);
router.get('/', auth, post.getAllPost);
router.post('/:id/like', auth, post.likePost);

module.exports = router;