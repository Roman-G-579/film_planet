import {NextFunction, Request, Response} from "express";
import {User, UserModel} from "../models/user.interface";
import httpStatus from "http-status";
import {Schema} from "mongoose";
import {UserRating, UserRatingModel} from "../models/user-rating.interface";
import {UserReview, UserReviewModel, userReviewSchema} from "../models/user-review.interface";

export async function getUserProfile(req: Request, res: Response, next: NextFunction) {
    try {
        const { email } = req.params;
        const user = await UserModel.findOne({ email});

        if (!user) {
            return res.status(httpStatus.NOT_FOUND).json({ message: 'User not found'});
        }

        const ratings = await fetchUserRatings(user._id);
        const reviews = await fetchUserReviews(user._id);

        const userProfile: User = {
            ...user.toObject(),
            password: undefined,
            ratings: ratings as UserRating[],
            reviews: reviews as UserReview[]
        };

        return res.status(httpStatus.OK).send(userProfile);
    } catch (err) {
        next(err);
    }
}

async function fetchUserRatings(userId: Schema.Types.ObjectId) {
    return UserRatingModel.find({ user: userId }).sort({ date: -1});
}

async function fetchUserReviews(userId: Schema.Types.ObjectId) {
    return UserReviewModel.find({ user: userId }).sort({ date: -1});
}





