import {NextFunction, Request, Response} from "express";
import {User, UserModel} from "../models/user.interface";
import httpStatus from "http-status";

export async function getUserProfile(req: Request, res: Response, next: NextFunction) {
    try {
        const { email } = req.params;
        const user = await UserModel.findOne({ email});

        if (!user) {
            return res.status(httpStatus.NOT_FOUND).json({ message: 'User not found'});
        }

        const userProfile: User = {
            ...user.toObject(),
            password: undefined,

        };

        return res.status(httpStatus.OK).send(userProfile);
    } catch (err) {
        next(err);
    }
}






