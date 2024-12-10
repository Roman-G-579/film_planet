import {Router} from "express";
import {getPopularFilmsMiddleware, getRecentFilmsMiddleware, loginMiddleware} from "../controllers/library.controller";
import {validator} from "../middlewares/validator.middleware";

const router = Router();

router.get('/film/recent', getRecentFilmsMiddleware);

router.get('/film/popular' getPopularFilmsMiddleware);

export default router;
