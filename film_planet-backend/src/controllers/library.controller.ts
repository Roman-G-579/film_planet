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

// export async function getItemsFromApi(req: Request, res: Response, next: NextFunction) {
//     try {
//         const {mediaType, category} = req.params;
//
//         if (!mediaType || !['film', 'tv'].includes(mediaType)) {
//             return res.status(httpStatus.BAD_REQUEST).send({error: 'Invalid media type in request header. Must be "film" or "tv".'});
//         }
//
//         if (!category || !['recent', 'popular', 'top'].includes(category)) {
//             return res.status(httpStatus.BAD_REQUEST).send({error: 'Invalid category in request header. Must be "recent", "popular", or "top".'});
//         }
//
//         const {requestMediaType, requestCategory} = generateRequestStrings(mediaType, category);
//
//         const response = await fetch(`https://api.themoviedb.org/3/${requestMediaType}/${requestCategory}?language=en-US&page=1`, options);
//         const data = await response.json();
//
//         return res.status(httpStatus.OK).send(data);
//     } catch (err) {
//         console.error(err);
//         next(err);
//     }
// }

// /**
//  * Matches the mediaType and category strings to their equivalents that are used by the TMDB API requests
//  * @param mediaType film or TV
//  * @param category recent, popular or top
//  */
// function generateRequestStrings(mediaType: string, category: string): {requestMediaType: string, requestCategory: string} {
//     // Matches the names provided by the header to the names used by the API requests
//     const categoryMapping: Record<string, string> = {
//         'film': 'movie',
//         'film:recent': 'now_playing',
//         'tv:recent': 'on_the_air',
//     };
//
//     // Sets the correct strings with the help of the categoryMapping Record
//     const requestMediaType = categoryMapping[`${mediaType}`] || mediaType;
//     const requestCategory = categoryMapping[`${mediaType}:${category}`] || category;
//
//     return {requestMediaType, requestCategory};
// }

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
        const currentDate = new Date();
        const minDate = new Date(currentDate);
        minDate.setMonth(minDate.getMonth() - 3);
        minDate.setDate(1); // Sets the min date to the first of the month
        const minDateStr = minDate.toISOString().split('T')[0];

        const response = await fetch(`https://api.themoviedb.org/3/discover/tv?first_air_date.gte=${minDateStr}&include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=vote_count.desc&with_original_language=en`, options);
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
