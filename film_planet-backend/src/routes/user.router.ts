import {validateProfile, validateUser} from "../pipes/validator.pipe";
import {validator} from "../middlewares/validator.middleware";
import { Router } from "express";
import {getUserProfile, registerUser} from "../controllers/user.controller";
import {authMiddleware} from "../middlewares/auth.middleware";

const router = Router();

/**
 * @route GET /api/profile/:email
 * @description get the user profile
 * @access public
 */
router.get('/:email', validateProfile, validator, authMiddleware, getUserProfile);

/**
 * @route POST /api/register
 * @description register a user to the website
 * @access public
 */
router.post('/', validateUser, validator, registerUser);

export default router;
