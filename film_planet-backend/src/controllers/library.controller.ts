import {Config} from "../config/config";
import {NextFunction, Request, Response} from "express";
import httpStatus from "http-status";

/**
 * Contains function related to the retrieval of tmdb items (films, tv shows, actors etc.)
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
        const response = await fetch('https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1', options);
        const data = await response.json();

        return res.status(httpStatus.OK).send(data);
    } catch (err) {
        console.error(err);
        next(err);
    }
}

export async function getPopularFilmsMiddleware(req: Request, res: Response, next: NextFunction) {
    try {
        const response = await fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', options);
        const data = await response.json();

        return res.status(httpStatus.OK).send(data);
    } catch (err) {
        next(err);
    }
}

export async function getTopFilmsMiddleware(req: Request, res: Response, next: NextFunction) {
    try {
        const response = await fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options);
        const data = await response.json();

        return res.status(httpStatus.OK).send(data);
    } catch (err) {
        next(err);
    }
}

export async function getRecentTVMiddleware(req: Request, res: Response, next: NextFunction) {
    try {
        const response = await fetch('https://api.themoviedb.org/3/tv/on_the_air?language=en-US&page=1', options);
        const data = await response.json();

        return res.status(httpStatus.OK).send(data);
    } catch (err) {
        console.error(err);
        next(err);
    }
}

export async function getPopularTVMiddleware(req: Request, res: Response, next: NextFunction) {
    try {
        const response = await fetch('https://api.themoviedb.org/3/tv/popular?language=en-US&page=1', options);
        const data = await response.json();

        return res.status(httpStatus.OK).send(data);
    } catch (err) {
        console.error(err);
        next(err);
    }
}

export async function getTopTVMiddleware(req: Request, res: Response, next: NextFunction) {
    try {
        const response = await fetch('https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=1', options);
        const data = await response.json();

        return res.status(httpStatus.OK).send(data);
    } catch (err) {
        next(err);
    }
}
