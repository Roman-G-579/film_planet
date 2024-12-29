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
    id: 2,
    item_id: 16,
    author: 'Bob',
    content: 'Very good show, I have seen better though',
    rating: 8,
    created_at: new Date(2018,3,6),
  },
  {
    id: 3,
    item_id: 17,
    author: 'Alice',
    content: `A fascinating look at our nation's history`,
    rating: 9.5,
    created_at: new Date(2019,4,2),
  },
  {
    id: 4,
    item_id: 278,
    author: 'Tim',
    content: `Great movie, a true classic`,
    rating: 10,
    created_at: new Date(2024,11,2),
  }
];
