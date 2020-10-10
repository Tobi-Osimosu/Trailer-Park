import { Movie } from './../movie.model';
import { DataService } from './../services/data.service';
import { AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { Swiper } from 'swiper';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-trending-movies',
  templateUrl: './trending-movies.component.html',
  styleUrls: ['./trending-movies.component.scss'],
})
export class TrendingMoviesComponent implements OnInit, AfterViewInit {
  config: SwiperConfigInterface;
  trendingMovies: Observable<any>;
  trending_movies;
  selected_movie: Movie;

  constructor(
    private elementRef: ElementRef,
    private dataService: DataService
  ) {
    this.trendingMovies = this.dataService.fetchTrendingMovies();

    this.trendingMovies.subscribe((response) => {
      this.trending_movies = response;
    });

    // let mySwiper = new Swiper('.swiper-container', {
    this.config = {
      direction: 'horizontal',
      loop: true,
      // slidesPerView: 4,
      spaceBetween: 20,
      keyboard: true,
      allowSlideNext: true,
      allowSlidePrev: true,
      navigation: true,
      autoplay: {
        delay: 5000,
      },
      followFinger: true,
    };
  }

  ngOnInit() {}

  ngAfterViewInit() {}

  slidePrev() {
    let mySwiper = this.elementRef.nativeElement.querySelector(
      '.swiper-container'
    ).swiper;
    mySwiper.slidePrev();
  }

  slideNext() {
    let mySwiper = this.elementRef.nativeElement.querySelector(
      '.swiper-container'
    ).swiper;
    mySwiper.slideNext();
  }

  movie(index) {
    this.selected_movie = this.trending_movies[index];
  }

  manageSlide() {
    if (matchMedia('(max-width: 767.98px)').matches) {
      this.config.slidesPerView = 1;
    } else if (matchMedia('(max-width: 991.98px)').matches) {
      this.config.slidesPerView = 2;
    } else if (matchMedia('(min-width: 992px)').matches) {
      this.config.slidesPerView = 4;
    }
  }
}
