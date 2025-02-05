import { validateProfile } from "../pipes/validator.pipe";
import {validator} from "../middlewares/validator.middleware";
import { Router } from "express";
import {getUserProfile} from "../controllers/user.controller";
import {authMiddleware} from "../middlewares/auth.middleware";

const router = Router();

/**
 * @route GET /api/profile/:email
 * @description get the user profile
 * @access public
 */
router.get('/:email', validateProfile, validator, authMiddleware, getUserProfile);



export default router;
