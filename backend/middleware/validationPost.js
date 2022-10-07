const { body } = require('express-validator');


const selectionValidation = (req, res, next) => {
    const reqBody = req.body
    if (reqBody.publication !== "") {
        body('publication') 
            .isLength({ min: 2, max: 300 })
            .withMessage("Le nom doit contenir min 2 caractères et maximum 300 caractères")
            .escape()
    } else {
        body('publication') 
            .escape()
    }
    next();
}

module.exports = {
    selectionValidation
};