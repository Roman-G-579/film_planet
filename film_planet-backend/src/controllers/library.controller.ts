import {Config} from "../config/config";
import {NextFunction, Request, RequestHandler, Response} from "express";
import httpStatus from "http-status";
import HttpStatus from 'http-status';

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
        // let test = req.header('test');
        //
        // if (!test) {
        //     return res.status(400).send({ error: 'Error reading parameter' });
        // }
        const response = await fetch('https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1', options);
        const data = await response.json();
        //    .then(res => res.json())
          //  .then(res => console.log(res))
            //.catch(err => console.error(err));

        return res.status(httpStatus.OK).send(data);
    } catch (err) {
        console.error(err);
        next(err);
    }
}

export async function getPopularFilmsMiddleware(req: Request, res: Response, next: NextFunction) {
    try {
        fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', options)
            .then(res => res.json())
            .then(res => console.log(res))
            .catch(err => console.error(err));

        return res.status(httpStatus.OK).send(res);
    } catch (err) {
        next(err);
    }
}

export async function loginMiddleware(req: Request, res: Response, next: NextFunction) {
    try {
        const { email, password } = req.body;

        // Check if email and password are provided
        if (!email || !password) {
            return res
                .status(HttpStatus.BAD_REQUEST)
                .json({ message: 'Email and password are required' });
        }

        // Find the user by email
        const user = {name: 'aaa', id: 123};
        if (!user) {
            return res.status(HttpStatus.UNAUTHORIZED).json({ message: 'Invalid email or password' });
        }

        // Compare the provided password with the stored hashed password
        //const isMatch = await bcrypt.compare(password, user.password);
        // if (!isMatch) {
        //     return res.status(HttpStatus.UNAUTHORIZED).json({ message: 'Invalid email or password' });
        // }

        // Generate a JWT token
        const token = 24;
        // Return the token
        return res.status(HttpStatus.OK).json({ token, user });
    } catch (err) {
        next(err);
    }
}
