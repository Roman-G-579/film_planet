import passport from 'passport';
import httpStatus from "http-status";
import { Request, Response, NextFunction } from 'express';
import {User} from "../models/user.interface";

interface AuthenticatedRequest extends Request {
    user?: User;
}

export const authMiddleware = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
) => {
    passport.authenticate(
       'jwt',
        { session: false },
        async (err: Error, user: User) => {
           if (err) {
               console.error('Error in authMiddleware: ', err);
               return next(err);
           }
           if (!user) {
               console.error(err);
               return res.status(httpStatus.UNAUTHORIZED).json({message: 'Unauthorized'});
           }
           req.user = user;

           next();
        },
    )(req, res, next);
};
