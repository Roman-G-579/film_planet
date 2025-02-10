import {model, Schema} from "mongoose";
import {UserRating, userRatingSchema} from "./user-rating.interface";
import {UserReview, userReviewSchema} from "./user-review.interface";

export interface User {
    _id: Schema.Types.ObjectId;
    username: string;
    firstName?: string;
    lastName?: string;
    email: string;
    password: string;
    ratings: UserRating[];
    reviews: UserReview[];
}

const userSchema = new Schema<User>(
    {
        username: {
            type: String,
            required: true
        },
        firstName: {
            type: String,
            required: false
        },
        lastName: {
            type: String,
            required: false
        },
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        ratings: [userRatingSchema],
        reviews: [userReviewSchema]
    },
    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }
);

export const UserModel = model<User>(
    "User",
    userSchema
);
