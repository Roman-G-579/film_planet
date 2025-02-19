import {Router} from "express";
import {validateUserRegistration} from "../pipes/validator.pipe";
import {validator} from "../middlewares/validator.middleware";
import {getUserByToken, login, logout, refreshToken, registerUser, validateToken} from "../controllers/auth.controller";
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
 * @route GET /api/auth/refresh-token
 * @description refresh the user's access tokens
 * @access public
 */
router.get('/refresh-token', refreshToken);

/**
 * @route POST /api/auth/logout
 * @description log a user out of the website
 * @access public
 */
router.post('/logout', logout);

/**
 * @route GET /api/auth/user
 * @description get user info
 * @access jwt
 */
router.get('/user', authMiddleware, getUserByToken);

/**
 * @route GET /api/auth/validate-token
 * @description validate the user's access token to determine whether he is already logged in
 * @access jwt
 */
router.get('/validate-token', authMiddleware, validateToken);

export default router;
