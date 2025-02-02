import {Router} from "express";

import {
    getFilmsByGenreMiddleware,
    getPopularFilmsMiddleware,
    getPopularTVMiddleware,
    getRecentFilmsMiddleware,
    getRecentTVMiddleware,
    getFilmSearchResultsMiddleware,
    getTopFilmsMiddleware,
    getTopTVMiddleware,
    getTVByGenreMiddleware, getTVSearchResultsMiddleware, getPeopleSearchResultsMiddleware
} from "../controllers/library.controller";

const router = Router();

router.get('/film/recent', getRecentFilmsMiddleware);

router.get('/film/popular', getPopularFilmsMiddleware);

router.get('/film/top', getTopFilmsMiddleware);

router.get('/film/genre/:id', getFilmsByGenreMiddleware)

router.get('/search/film/:query', getFilmSearchResultsMiddleware);

router.get('/tv/recent', getRecentTVMiddleware);

router.get('/tv/popular', getPopularTVMiddleware);

router.get('/tv/top', getTopTVMiddleware);

router.get('/tv/genre/:id', getTVByGenreMiddleware);

router.get('/search/tv/:query', getTVSearchResultsMiddleware);

router.get('/search/person/:query', getPeopleSearchResultsMiddleware);

export default router;
