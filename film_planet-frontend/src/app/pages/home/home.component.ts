import { AfterViewInit, ChangeDetectionStrategy, Component } from '@angular/core';
import { ImageModule } from 'primeng/image';
import {gsap} from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    ImageModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class HomeComponent implements AfterViewInit {

  filmPanels = [
    {
      title: "Pulp Fiction",
      year: "1994",
      genres: ["Drama"],
      starring: ["John Travolta", "Uma Thurman"],
      director: "Quentin Tarantino",
      image: "assets/posters/1.jpg"
    },
    {
      title: "Prisoners",
      year: "2013",
      genres: ["Drama", "Psychological Thriller"],
      starring: ["Hugh Jackman", "Jake Gyllenhaal"],
      director: "Denis Villeneuve",
      image: "assets/posters/2.jpg"
    },
    {
      title: "The Blues Brothers",
      year: "1980",
      genres: ["Comedy", "Musical"],
      starring: ["John Belushi", "Dan Aykroyd"],
      director: "John Landis",
      image: "assets/posters/3.jpg"
    },
    {
      title: "Inception",
      year: "2010",
      genres: ["Action", "Adventure"],
      starring: ["Leonardo DiCaprio", "Joseph Gordon-Levitt"],
      director: "Christopher Nolan",
      image: "assets/posters/4.jpg"
    },

  ]

  tvPanels = [
    {
      title: "The Expanse",
      year: "2015",
      genres: ["Sci-Fi", "Drama"],
      starring: ["John Travolta", "Uma Thurman"],
      creators: ["Daniel Abraham", "Mark Fergus", "Ty Franck"],
      image: "assets/posters/5.jpg"
    },
    {
      title: "South Park",
      year: "1998",
      genres: ["Comedy"],
      starring: ["Trey Parker ","Matt Stone", "Isaac Hayes"],
      creators: ["Trey Parker ","Matt Stone"],
      image: "assets/posters/6.jpg"
    },
    {
      title: "Severance",
      year: "2022",
      genres: ["Dystopian Sci-Fi", "Psychological Thriller"],
      starring: ["Adam Scott", "Zach Cherry", "Britt Lower"],
      creators: ["Dan Erickson"],
      image: "assets/posters/7.jpg"
    },
    {
      title: "The Wire",
      year: "2002",
      genres: ["Drama"],
      starring: ["Dominic West", "Lance Reddick", "Sonja Sohn"],
      creators: ["David Simon"],
      image: "assets/posters/8.jpg"
    },

  ]

  ngAfterViewInit() {
    gsap.registerPlugin(ScrollTrigger);

    //Top heading animations
    gsap.from(".text-heading", { opacity: 0, y: -200, duration: 1.5 });
    gsap.from(".text-subheading", { opacity: 0, x: 200, duration: 1.5 });

    // gsap.from('.text-subheading', {
    //   keyframes: [
    //     {y: -530, duration: 1.3, ease: "power2.out"},
    //     {x: "-30.5%", duration: 2, ease: "power2.inOut", delay: -0.2 },
    //   ]
    // });

    // Film poster animations
    let tl_films_enter = gsap.timeline({
      scrollTrigger: {
        trigger: '.film-posters',
        start: 'top 150%',
        end: 'bottom 90%',
        scrub: 1,
        markers: false,
        toggleActions: 'play pause reverse pause'
      }
    });

    let tl_films_leave = gsap.timeline({
      scrollTrigger: {
        trigger: '.film-posters',
        start: 'bottom 60%',
        end: 'bottom center',

        markers: false,
        toggleActions: 'play none reverse none'
      }
    });

    let tl_tv_enter = gsap.timeline({
      scrollTrigger: {
        trigger: '.tv-posters',
        start: 'top 150%',
        end: 'bottom 90%',
        scrub: 1,
        markers: false,
        toggleActions: 'play reverse play reset'
      }
    });

    tl_films_enter.from('.film-wrapper', {
      x: -2000,
      duration: 1.5,
      stagger: 0.2,
      ease: "power2.inOut",
      overwrite: true,
    });

    tl_tv_enter.from('.tv-wrapper', {
      x: 2000,
      duration: 1.5,
      stagger: 0.2,
      ease: "power2.inOut",
      overwrite: true,
    });

    //Section 3 animations
    let tl_section_3 = gsap.timeline({
      scrollTrigger: {
        trigger: '.section-3',
        start: 'top 50%',
        end: 'bottom 80%',
        scrub: false,
        markers: false,
        toggleActions: 'play reverse play reverse'
      }
    });

    tl_section_3.from(".section-3-heading", { opacity: 0, x: -800, duration: 1 });
    tl_section_3.from(".section-3-subheading", { opacity: 0, x: 800, duration: 1 });
  }
}
