import {model, Schema} from "mongoose";

export interface UserRating {
    item_id: Schema.Types.ObjectId;
    rating: number;
}

export const userRatingSchema = new Schema<UserRating>(
    {
        item_id: {
            type: Schema.Types.ObjectId,
            ref: 'LibraryITem',
            required: true
        },
        rating: {
            type: Number,
            default: 0
        }
    },
    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }
);

export const UserRatingModel = model<UserRating>(
    'UserRating',
    userRatingSchema
);
