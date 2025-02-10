import { param, body } from 'express-validator';

export const validateMongoId = [param('id').exists().bail().isMongoId()];

export const validateUserRegistration = [
    body('username').exists().isString().notEmpty(),
    body('password').exists().isString().notEmpty(),
    body('firstName').exists().isString(),
    body('lastName').exists().isString(),
    body('email').exists().isEmail(),
];

export const validateProfile = [param('email').exists().isEmail()];
