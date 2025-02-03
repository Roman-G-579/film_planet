import {model, Schema} from "mongoose";
import {AuthorDetails} from "./author-details.interface";

export interface UserReview {
    _id: Schema.Types.ObjectId;
    item_id: Schema.Types.ObjectId;
    author: string; // Author's name
    author_details: AuthorDetails;
    content: string;
    created_at: Date;
}

export const userReviewSchema = new Schema<UserReview>(
    {
        item_id: {
            type: Schema.Types.ObjectId,
            ref: 'LibraryItem',
            required: true
        },
        author: {
            type: String,
            required: true
        },
        author_details: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        content: {
            type: String
        },
        created_at: {
            type: Date,
            default: new Date()
        }
    },
    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }
);

export const UserReviewModel = model<UserReview>(
    'UserReview',
    userReviewSchema
)
