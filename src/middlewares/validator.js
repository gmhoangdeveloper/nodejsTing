const createHttpError = require('http-errors');
const Joi = require('joi');
const Validators = require('../schemas');

function validator(validator) {
    //! If validator is not exist, throw err
    if(!Validators.hasOwnProperty(validator))
        throw new Error(`'${validator}' validator is not exist`)

    return async function(req, res, next) {
        try {
            const validated = await Validators[validator].validateAsync(req.body)
            req.body = validated
            next()
        } catch (err) {
            //* Pass err to next
            //! If validation error occurs call next with HTTP 422. Otherwise HTTP 500
            if(err.isJoi) 
                return next(createHttpError(400, {message: err.message}))
            next(createHttpError(500))
        }
    }
}

export default validator;