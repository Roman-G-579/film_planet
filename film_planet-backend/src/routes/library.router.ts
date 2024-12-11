import {Router} from "express";

import {
    getPopularFilmsMiddleware,
    getPopularTVMiddleware,
    getRecentFilmsMiddleware, getRecentTVMiddleware, getTopFilmsMiddleware, getTopTVMiddleware
} from "../controllers/library.controller";

const router = Router();

router.get('/film/recent', getRecentFilmsMiddleware);

router.get('/film/popular', getPopularFilmsMiddleware);

router.get('/film/top', getTopFilmsMiddleware);

router.get('/tv/recent', getRecentTVMiddleware);

router.get('/tv/popular', getPopularTVMiddleware);

router.get('/tv/top', getTopTVMiddleware);

export default router;
