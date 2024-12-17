import {Router} from "express";

import {
    getFilmsByGenre,
    getPopularFilmsMiddleware,
    getPopularTVMiddleware,
    getRecentFilmsMiddleware, getRecentTVMiddleware, getTopFilmsMiddleware, getTopTVMiddleware, getTvByGenre
} from "../controllers/library.controller";

const router = Router();

router.get('/film/recent', getRecentFilmsMiddleware);

router.get('/film/popular', getPopularFilmsMiddleware);

router.get('/film/top', getTopFilmsMiddleware);

router.get('/film/genre/:id', getFilmsByGenre)

router.get('/tv/recent', getRecentTVMiddleware);

router.get('/tv/popular', getPopularTVMiddleware);

router.get('/tv/top', getTopTVMiddleware);

router.get('/tv/genre/:id', getTvByGenre)

export default router;
