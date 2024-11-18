import {Injectable} from '@angular/core';
import {LibraryItem} from '../../core/interfaces/library-item.interface';
import {MediaType} from '../../core/enums/media-type.enum';

@Injectable({
  providedIn: 'root',
})
export class TopService {
  topFilms: LibraryItem[] = [
    {
      mediaType: MediaType.Film,
      title: "Pulp Fiction",
      year: 1994,
      genres: ["Drama"],
      starring: ["John Travolta", "Uma Thurman"],
      directors: ["Quentin Tarantino"],
      image: "assets/posters/1.jpg",
      rating: 9.2
    },
    {
      mediaType: MediaType.Film,
      title: "Prisoners",
      year: 2013,
      genres: ["Drama", "Psychological Thriller"],
      starring: ["Hugh Jackman", "Jake Gyllenhaal"],
      directors: ["Denis Villeneuve"],
      image: "assets/posters/2.jpg",
      rating: 9.1
    },
    {
      mediaType: MediaType.Film,
      title: "The Blues Brothers",
      year: 1980,
      genres: ["Comedy", "Musical"],
      starring: ["John Belushi", "Dan Aykroyd"],
      directors: ["John Landis"],
      image: "assets/posters/3.jpg",
      rating: 8.8
    },
    {
      mediaType: MediaType.Film,
      title: "Inception",
      year: 2010,
      genres: ["Action", "Adventure"],
      starring: ["Leonardo DiCaprio", "Joseph Gordon-Levitt"],
      directors: ["Christopher Nolan"],
      image: "assets/posters/4.jpg",
      rating: 9
    },
    {
      mediaType: MediaType.Film,
      title: "The Godfather",
      year: 1972,
      genres: ["Drama","Crime"],
      starring: ["Marlon Brando", "Al Pacino"],
      directors: ["Francis Ford Coppola"],
      image: "assets/posters/9.jpg",
      rating: 9.1

    },
    {
      mediaType: MediaType.Film,
      title: "The Matrix",
      year: 1999,
      genres: ["Action","Sci-Fi","Cyberpunk"],
      starring: ["Keanu Reeves", "Laurence Fishburne"],
      directors: ["Lana Wachowski","Lilly Wachowski"],
      image: "assets/posters/10.jpg",
      rating: 9.2
    },
    {
      mediaType: MediaType.Film,
      title: "Dune Part Two",
      year: 2024,
      genres: ["Action", "Sci-Fi"],
      starring: ["Timothée Chalamet", "Zendaya"],
      directors: ["Denis Villeneuve"],
      image: "assets/posters/11.jpg",
      rating: 9.1
    },
    {
      mediaType: MediaType.Film,
      title: "Alien",
      year: 1979,
      genres: ["Sci-Fi", "Horror"],
      starring: ["Sigourney Weaver", "gourney Weaver"],
      directors: ["Ridley Scott"],
      image: "assets/posters/12.jpg",
      rating: 8.8
    },
    {
      mediaType: MediaType.Film,
      title: "Memento",
      year: 2000,
      genres: ["Psychological Thriller"],
      starring: ["Guy Pearce", "Carrie-Anne Moss"],
      directors: ["Christopher Nolan"],
      image: "assets/posters/13.jpg",
      rating: 9.2
    },
    {
      mediaType: MediaType.Film,
      title: "Raiders of The Lost Ark",
      year: 1981,
      genres: ["Adventure"],
      starring: ["Harrison Ford", "Karen Allen"],
      directors: ["Steven Spielberg"],
      image: "assets/posters/14.jpg",
      rating: 9.1
    },
    {
      mediaType: MediaType.Film,
      title: "The Shining",
      year: 1980,
      genres: ["Comedy", "Musical"],
      starring: ["Jack Nicholson", "Shelley Duvall"],
      directors: ["Stanley Kubrick"],
      image: "assets/posters/15.jpg",
      rating: 8.8
    }
  ]

  getTopByYear(year: number) {
    const filteredItems = this.topFilms.filter((item) => {return item.year == year});
    return filteredItems.sort((a,b) => (b.rating ?? 0) - (a.rating ?? 0));
  }

  getTopOfAllTime(): LibraryItem[] {
    return this.topFilms.sort((a,b) => (b.rating ?? 0) - (a.rating ?? 0));
  }
}
