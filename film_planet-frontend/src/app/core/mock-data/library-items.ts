import {LibraryItem} from '../interfaces/library-item.interface';
import {MediaType} from '../enums/media-type.enum';
import {FilmGenres} from '../constants/film-genres.record';

export const LIBRARY_ITEMS: LibraryItem[] = [
  {
    mediaType: MediaType.Film,
    title: "Pulp Fiction",
    releaseDate: new Date(1994, 0, 1),
    genres: [80,18],
    starring: ["John Travolta", "Uma Thurman"],
    directors: ["Quentin Tarantino"],
    image: "assets/posters/1.jpg",
    rating: 9.2
  },
  {
    mediaType: MediaType.Film,
    title: "Prisoners",
    releaseDate: 2013,
    genres: [18,53],
    starring: ["Hugh Jackman", "Jake Gyllenhaal"],
    directors: ["Denis Villeneuve"],
    image: "assets/posters/2.jpg",
    rating: 9.1
  },
  {
    mediaType: MediaType.Film,
    title: "The Blues Brothers",
    releaseDate: 1980,
    genres: [35,10402],
    starring: ["John Belushi", "Dan Aykroyd"],
    directors: ["John Landis"],
    image: "assets/posters/3.jpg",
    rating: 8.8
  },
  {
    mediaType: MediaType.Film,
    title: "Inception",
    releaseDate: 2010,
    genres: [28,12],
    starring: ["Leonardo DiCaprio", "Joseph Gordon-Levitt"],
    directors: ["Christopher Nolan"],
    image: "assets/posters/4.jpg",
    rating: 9
  },
  {
    mediaType: MediaType.Film,
    title: "The Godfather",
    releaseDate: 1972,
    genres: [80,18],
    starring: ["Marlon Brando", "Al Pacino"],
    directors: ["Francis Ford Coppola"],
    image: "assets/posters/9.jpg",
    rating: 9.1

  },
  {
    mediaType: MediaType.Film,
    title: "The Matrix",
    releaseDate: 1999,
    genres: [28,878],
    starring: ["Keanu Reeves", "Laurence Fishburne"],
    directors: ["Lana Wachowski","Lilly Wachowski"],
    image: "assets/posters/10.jpg",
    rating: 9.2
  },
  {
    mediaType: MediaType.Film,
    title: "Dune Part Two",
    releaseDate: 2024,
    genres: [28,878],
    starring: ["Timothée Chalamet", "Zendaya"],
    directors: ["Denis Villeneuve"],
    image: "assets/posters/11.jpg",
    rating: 9.1
  },
  {
    mediaType: MediaType.Film,
    title: "Alien",
    releaseDate: 1979,
    genres: [878, 27],
    starring: ["Sigourney Weaver", "gourney Weaver"],
    directors: ["Ridley Scott"],
    image: "assets/posters/12.jpg",
    rating: 8.8
  },
  {
    mediaType: MediaType.Film,
    title: "Memento",
    releaseDate: 2000,
    genres: [53],
    starring: ["Guy Pearce", "Carrie-Anne Moss"],
    directors: ["Christopher Nolan"],
    image: "assets/posters/13.jpg",
    rating: 9.2
  },
  {
    mediaType: MediaType.Film,
    title: "Raiders of The Lost Ark",
    releaseDate: 1981,
    genres: [12],
    starring: ["Harrison Ford", "Karen Allen"],
    directors: ["Steven Spielberg"],
    image: "assets/posters/14.jpg",
    rating: 9.1
  },
  {
    mediaType: MediaType.Film,
    title: "The Shining",
    releaseDate: 1980,
    genres: [27],
    starring: ["Jack Nicholson", "Shelley Duvall"],
    directors: ["Stanley Kubrick"],
    image: "assets/posters/15.jpg",
    rating: 8.8
  },
  {
    mediaType: MediaType.TV,
    title: "The Expanse",
    releaseDate: 2015,
    genres: [10765, 18],
    starring: ["John Travolta", "Uma Thurman"],
    creators: ["Daniel Abraham", "Mark Fergus", "Ty Franck"],
    image: "assets/posters/5.jpg",
    rating: 8.7
  },
  {
    mediaType: MediaType.TV,
    title: "South Park",
    releaseDate: 1998,
    genres: [35],
    starring: ["Trey Parker ","Matt Stone", "Isaac Hayes"],
    creators: ["Trey Parker ","Matt Stone"],
    image: "assets/posters/6.jpg",
    rating: 8.5
  },
  {
    mediaType: MediaType.TV,
    title: "Severance",
    releaseDate: 2022,
    genres: [10765, 9648],
    starring: ["Adam Scott", "Zach Cherry", "Britt Lower"],
    creators: ["Dan Erickson"],
    image: "assets/posters/7.jpg",
    rating: 9
  },
  {
    mediaType: MediaType.TV,
    title: "The Wire",
    releaseDate: 2002,
    genres: [80, 18],
    starring: ["Dominic West", "Lance Reddick", "Sonja Sohn"],
    creators: ["David Simon"],
    image: "assets/posters/8.jpg",
    rating: 9.6
  },
  {
    mediaType: MediaType.TV,
    title: "John Adams",
    releaseDate: 2008,
    genres: [18, 10768],
    starring: ["Paul Giamatti", "Laura Linney", "John Dossett"],
    creators: ["Tom Hooper"],
    image: "assets/posters/16.jpg",
    rating: 9
  },
  {
    mediaType: MediaType.TV,
    title: "Better Call Saul",
    releaseDate: 2015,
    genres: [80, 18],
    starring: ["Bob Odenkirk", "Rhea Seehorn", "Jonathan Banks"],
    creators: ["Vince Gilligan","Peter Gould"],
    image: "assets/posters/17.jpg",
    rating: 9
  },
  {
    mediaType: MediaType.TV,
    title: "Breaking Bad",
    releaseDate: 2008,
    genres: [80, 18],
    starring: ["Bryan Cranston", "Aaron Paul", "Anna Gunn"],
    creators: ["Vince Gilligan"],
    image: "assets/posters/18.jpg",
    rating: 9.2
  },
];
