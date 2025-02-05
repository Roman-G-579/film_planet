import {Router} from "express";
import {validateUserRegistration} from "../pipes/validator.pipe";
import {validator} from "../middlewares/validator.middleware";
import {getUserByToken, login, registerUser} from "../controllers/auth.controller";
import {authMiddleware} from "../middlewares/auth.middleware";

const router = Router();

/**
 * @route POST /api/auth/register
 * @description register a user to the website
 * @access public
 */
router.post('/register', validateUserRegistration, validator, registerUser);

/**
 * @route POST /api/auth/login
 * @description log a user in to the website
 * @access public
 */
router.post('/login', login);

/**
 * @route GET /api/auth/user
 * @description get user info
 * @access jwt
 */
router.get('/user', authMiddleware, getUserByToken);

export default router;
