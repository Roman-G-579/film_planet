/**
 * Contains function related to the retrieval of details of specific tmdb items
 */
import {Config} from "../config/config";
import {NextFunction, Request, Response} from "express";
import httpStatus from "http-status";

const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${Config.TMDB_API_KEY}`
    }
};

/**
 * Fetches a specific film or TV show's details and credits (cast & crew)
 *
 * Request headers:
 *
 * @mediaType - movie (converted from 'film' in the frontend service) or TV
 * @id - the film or TV show's TMDB ID
 */
export async function getItemMiddleware(req: Request, res: Response, next: NextFunction) {
    try {
        const  mediaType = req.headers['media-type'];
        const  id = req.headers['id'];

        const response = await fetch(`https://api.themoviedb.org/3/${mediaType}/${id}?append_to_response=credits&language=en-US`, options);
        const data = await response.json();
        console.log(data)

        return res.status(httpStatus.OK).send(data);
    } catch (err) {
        next(err);
    }
}
