import {Config} from "../config/config";
import {NextFunction, Request, Response} from "express";
import httpStatus from "http-status";
import {formatDate} from "../utils/data-utils";

/**
 * Contains function related to the retrieval of  tmdb items collections (films, tv shows, actors etc.)
 */

const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${Config.TMDB_API_KEY}`
    }
};

export async function getRecentFilmsMiddleware(req: Request, res: Response, next: NextFunction) {
    try {
        const pageNum = req.headers['page-num'];

        const currentDate = new Date();

        // Minimum date - two weeks ago
        const minDate = new Date(currentDate);
        minDate.setDate(minDate.getDate() - 14);

        // Maximum date - a week from now
        const maxDate = new Date(currentDate);
        maxDate.setDate(maxDate.getDate() + 7);

        const response = await fetch(`https://api.themoviedb.org/3/discover/movie?language=en-US&page=${pageNum}&primary_release_date.gte.gte=${formatDate(minDate)}&primary_release_date.lte=${formatDate(maxDate)}&sort_by=popularity.desc&vote_count.gte=50`, options);
        const data = await response.json();

        return res.status(httpStatus.OK).send(data);
    } catch (err) {
        console.error(err);
        next(err);
    }
}

export async function getPopularFilmsMiddleware(req: Request, res: Response, next: NextFunction) {
    try {
        const pageNum = req.headers['page-num'];

        const currentDate = new Date();
        const minDate = new Date(currentDate);

        // Sets the min date to the first of the month 3 months ago
        minDate.setMonth(minDate.getMonth() - 3);
        minDate.setDate(1);
        const minDateStr = formatDate(minDate);

        const response = await fetch(`https://api.themoviedb.org/3/discover/movie?language=en-US&page=${pageNum}&primary_release_date.gte=${minDateStr}&sort_by=vote_count.desc`, options);
        const data = await response.json();

        return res.status(httpStatus.OK).send(data);
    } catch (err) {
        next(err);
    }
}

export async function getTopFilmsMiddleware(req: Request, res: Response, next: NextFunction) {
    try {
        const baseUrl = `https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=`
        const results = await fetchMultiplePages(baseUrl, 10);

        return res.status(httpStatus.OK).send(results);
    } catch (err) {
        next(err);
    }
}

export async function getFilmsByGenreMiddleware(req: Request, res: Response, next: NextFunction) {
    try {
        const pageNum = req.headers['page-num'];
        const genre = req.headers['genre'];

        const response = await fetch(`https://api.themoviedb.org/3/discover/movie?language=en-US&page=${pageNum}&sort_by=popularity.desc&with_genres=${genre}&with_original_language=en`, options);
        const data = await response.json();

        return res.status(httpStatus.OK).send(data);
    } catch (err) {
        next(err);
    }
}

export async function getFilmSearchResultsMiddleware(req: Request, res: Response, next: NextFunction) {
    try {
        const query = req.params.query;

        const response = await fetch(`https://api.themoviedb.org/3/search/movie?query=${query}`, options);
        const data = await response.json();

        return res.status(httpStatus.OK).send(data);
    } catch (err) {
        next(err);
    }
}

export async function getRecentTVMiddleware(req: Request, res: Response, next: NextFunction) {
    try {
        const pageNum = req.headers['page-num'];
        const currentDate = new Date();

        // Minimum date - a week ago
        const minDate = new Date(currentDate);
        minDate.setDate(minDate.getDate() - 7);

        // Maximum date - a week from now
        const maxDate = new Date(currentDate);
        maxDate.setDate(maxDate.getDate() + 7);

        const response = await fetch(`https://api.themoviedb.org/3/discover/tv?air_date.gte=${formatDate(minDate)}&air_date.lte=${formatDate(maxDate)}language=en-US&page=${pageNum}&sort_by=popularity.desc&vote_count.gte=50&with_original_language=en`, options);
        const data = await response.json();

        return res.status(httpStatus.OK).send(data);
    } catch (err) {
        console.error(err);
        next(err);
    }
}

export async function getPopularTVMiddleware(req: Request, res: Response, next: NextFunction) {
    try {
        const pageNum = req.headers['page-num'];

        const currentDate = new Date();
        const minDate = new Date(currentDate);

        // Sets the min date to the first of the month 3 months ago
        minDate.setMonth(minDate.getMonth() - 3);
        minDate.setDate(1);
        const minDateStr = formatDate(minDate);

        const response = await fetch(`https://api.themoviedb.org/3/discover/tv?first_air_date.gte=${minDateStr}&language=en-US&page=${pageNum}&sort_by=vote_count.desc&with_original_language=en`, options);
        const data = await response.json();

        return res.status(httpStatus.OK).send(data);
    } catch (err) {
        console.error(err);
        next(err);
    }
}

export async function getTopTVMiddleware(req: Request, res: Response, next: NextFunction) {
    try {
        const baseUrl = `https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=`
        const results = await fetchMultiplePages(baseUrl, 10);

        return res.status(httpStatus.OK).send(results);
    } catch (err) {
        next(err);
    }
}

export async function getTVByGenreMiddleware(req: Request, res: Response, next: NextFunction) {
    try {
        const pageNum = req.headers['page-num'];
        const genre = req.headers['genre'];

        const response = await fetch(`https://api.themoviedb.org/3/discover/tv?language=en-US&page=${pageNum}&sort_by=popularity.desc&with_genres=${genre}&with_original_language=en`, options);
        const data = await response.json();

        return res.status(httpStatus.OK).send(data);
    } catch (err) {
        next(err);
    }
}

export async function getTVSearchResultsMiddleware(req: Request, res: Response, next: NextFunction) {
    try {
        const query = req.params.query;

        const response = await fetch(`https://api.themoviedb.org/3/search/tv?query=${query}`, options);
        const data = await response.json();

        return res.status(httpStatus.OK).send(data);
    } catch (err) {
        next(err);
    }
}

/**
 * Fetches multiple pages of data from the TMDB API at once
 * @param baseUrl the url of the API request
 * @param numOfPages the number of pages to be fetched
 */
async function fetchMultiplePages(baseUrl: string, numOfPages: number) {
    const results = [];

    for (let page = 1; page <= numOfPages; page++) {
        const response = await fetch(`${baseUrl}${page}`, options);
        const data = await response.json();

        // Saves each item's ranking
        const pageResults = data.results.map((item: any, index: number) => ({
            ...item,
            ranking: (page - 1) * data.results.length + index + 1,
        }));
        results.push(...pageResults);
    }
    return results;
}
