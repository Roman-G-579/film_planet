import {Router} from "express";

import {
    getFilmsByGenre,
    getPopularFilms,
    getPopularTV,
    getRecentFilms,
    getRecentTV,
    getFilmSearchResults,
    getTopFilms,
    getTopTV,
    getTVByGenre, getTVSearchResults, getPeopleSearchResults
} from "../controllers/library.controller";

const router = Router();

router.get('/film/recent', getRecentFilms);

router.get('/film/popular', getPopularFilms);

router.get('/film/top', getTopFilms);

router.get('/film/genre/:id', getFilmsByGenre)

router.get('/search/film/:query', getFilmSearchResults);

router.get('/tv/recent', getRecentTV);

router.get('/tv/popular', getPopularTV);

router.get('/tv/top', getTopTV);

router.get('/tv/genre/:id', getTVByGenre);

router.get('/search/tv/:query', getTVSearchResults);

router.get('/search/person/:query', getPeopleSearchResults);

export default router;
