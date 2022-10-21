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


/*
* Objectif => define a router and middleware for the differente requete's methodes.
*/

router.post(
    '/',
    auth, 
    multer,
    (req, res, next) => {
        req.body = JSON.parse(req.body.post);
        next();
    },
    body('publication') 
        .isLength({ max: 300 })
        .withMessage("La publication doit contenir maximum 300 caractères.")
        .escape(),
    finalValidation,
    post.createPost
    );
router.put(
    '/:id',
    auth, 
    multer, 
    (req, res, next) => {
        try {
            req.body = JSON.parse(req.body.post);
        } catch (error) {
            console.info(req.body);
        }
        next();
    },
    body('publication')
        .isLength({ max: 300 })
        .withMessage("La publication doit contenir maximum 300 caractères")
        .escape(),
    finalValidation, 
    post.modifyPost
    );
router.delete('/:id', auth, post.deletePost)
router.get('/:id', auth, post.getOnePost);
router.get('/', auth, post.getAllPost);
router.post('/:id/like', auth, post.likePost);

module.exports = router;