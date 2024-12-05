import {Review} from '../interfaces/review.interface';

export const REVIEWS: Review[] = [
  {
    id: 1,
    item_id: 16,
    author: 'John',
    content: '10/10 Would watch again',
    rating: 10,
    created_at: new Date(2024,2,1),
  },
  {
    id: 1,
    item_id: 16,
    author: 'Bob',
    content: 'Very good show, I have seen better though',
    rating: 8,
    created_at: new Date(2018,3,6),
  },
];
