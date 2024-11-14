import { ChangeDetectionStrategy, Component } from '@angular/core';
import {CarouselModule, CarouselResponsiveOptions} from 'primeng/carousel';
import {ButtonModule} from 'primeng/button';
import {DataViewModule} from 'primeng/dataview';
import {SkeletonModule} from 'primeng/skeleton';

@Component({
  selector: 'app-films-recent',
  standalone: true,
  imports: [
    CarouselModule,
    ButtonModule,
    DataViewModule,
    SkeletonModule
  ],
  templateUrl: './films-recent.component.html',
  styleUrl: './films-recent.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilmsRecentComponent {

  responsiveOptions: CarouselResponsiveOptions[] = [
    {
      breakpoint: '1400px',
      numVisible: 4,
      numScroll: 1,
    },
    {
      breakpoint: '1199px',
      numVisible: 3,
      numScroll: 1,
    },
    {
      breakpoint: '767px',
      numVisible: 2,
      numScroll: 1,
    },
    {
      breakpoint: '575px',
      numVisible: 1,
      numScroll: 1,
    },
  ];

  carouselItems = [
    {
      title: "Pulp Fiction",
      year: "1994",
      genres: ["Drama"],
      starring: ["John Travolta", "Uma Thurman"],
      director: "Quentin Tarantino",
      image: "assets/posters/1.jpg",
      rating: 9.2
    },
    {
      title: "Prisoners",
      year: "2013",
      genres: ["Drama", "Psychological Thriller"],
      starring: ["Hugh Jackman", "Jake Gyllenhaal"],
      director: "Denis Villeneuve",
      image: "assets/posters/2.jpg",
      rating: 9.1
    },
    {
      title: "The Blues Brothers",
      year: "1980",
      genres: ["Comedy", "Musical"],
      starring: ["John Belushi", "Dan Aykroyd"],
      director: "John Landis",
      image: "assets/posters/3.jpg",
      rating: 8.8
    },
    {
      title: "Inception",
      year: "2010",
      genres: ["Action", "Adventure"],
      starring: ["Leonardo DiCaprio", "Joseph Gordon-Levitt"],
      director: "Christopher Nolan",
      image: "assets/posters/4.jpg",
      rating: 9
    },
    {
      title: "The Godfather",
      year: "1972",
      genres: ["Drama","Crime"],
      starring: ["Marlon Brando", "Al Pacino"],
      director: "Francis Ford Coppola",
      image: "assets/posters/9.jpg",
      rating: 9.1

    }
  ];

  tableItems = [
    {
      title: "The Matrix",
      year: "1999",
      genres: ["Action","Sci-Fi","Cyberpunk"],
      starring: ["Keanu Reeves", "Laurence Fishburne"],
      director: ["Lana Wachowski","Lilly Wachowski"],
      image: "assets/posters/10.jpg",
      rating: 9.2
    },
    {
      title: "Dune Part Two",
      year: "2024",
      genres: ["Action", "Sci-Fi"],
      starring: ["Timothée Chalamet", "Zendaya"],
      director: "Denis Villeneuve",
      image: "assets/posters/11.jpg",
      rating: 9.1
    },
    {
      title: "Alien",
      year: "1979",
      genres: ["Sci-Fi", "Horror"],
      starring: ["Sigourney Weaver", "gourney Weaver"],
      director: "Ridley Scott",
      image: "assets/posters/12.jpg",
      rating: 8.8
    },
    {
      title: "Memento",
      year: "2000",
      genres: ["Psychological Thriller"],
      starring: ["Guy Pearce", "Carrie-Anne Moss"],
      director: "Christopher Nolan",
      image: "assets/posters/13.jpg",
      rating: 9.2
    },
    {
      title: "Raiders of The Lost Ark",
      year: "1981",
      genres: ["Adventure"],
      starring: ["Harrison Ford", "Karen Allen"],
      director: "Steven Spielberg",
      image: "assets/posters/14.jpg",
      rating: 9.1
    },
    {
      title: "The Shining",
      year: "1980",
      genres: ["Comedy", "Musical"],
      starring: ["Jack Nicholson", "Shelley Duvall"],
      director: "Stanley Kubrick",
      image: "assets/posters/15.jpg",
      rating: 8.8
    }
  ];

  counterArray(n: number): any[] {
    return Array(n);
  }
}
