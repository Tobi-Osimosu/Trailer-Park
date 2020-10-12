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
  public config: SwiperConfigInterface = {};
  trendingMovies = null;
  selected_movie: Movie;

  constructor(
    private elementRef: ElementRef,
    private dataService: DataService
  ) {
    this.dataService.fetchTrendingMovies().subscribe();

    this.trendingMovies = this.dataService.trendingMovies;

    // this.manageSlide();
  }

  ngOnInit() {
    // this.manageSlide();
  }

  ngAfterViewInit() {
    // let mySwiper = new Swiper('.swiper-container', {
    this.config = {
      direction: 'horizontal',
      // loop: true,
      slidesPerView: 1,
      spaceBetween: 20,
      keyboard: true,
      navigation: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
      followFinger: true,
      breakpoints: {
        992: {
          slidesPerView: 4,
        },
        768: {
          slidesPerView: 2,
        },
      },
    };
  }

  slidePrev() {
    let mySwiper = this.elementRef.nativeElement.querySelector(
      '#trending-movies .swiper-container'
    ).swiper;
    mySwiper.slidePrev();
  }

  slideNext() {
    let mySwiper = this.elementRef.nativeElement.querySelector(
      '#trending-movies .swiper-container'
    ).swiper;
    mySwiper.slideNext();
  }

  movie(index) {
    this.selected_movie = null;
    this.selected_movie = this.trendingMovies[index];
  }

  // manageSlide() {
  //   console.log('Trending Movies Reached');
  //   if (matchMedia('(max-width: 767.98px)').matches) {
  //     this.config.slidesPerView = 1;
  //   } else if (matchMedia('(max-width: 991.98px)').matches) {
  //     this.config.slidesPerView = 2;
  //   } else if (matchMedia('(min-width: 992px)').matches) {
  //     this.config.slidesPerView = 4;
  //   }
  // }

  reInitSwiper() {
    let mySwiper = this.elementRef.nativeElement.querySelector(
      '#trending-movies .swiper-container'
    ).swiper;

    setTimeout(() => {
      mySwiper.update();
    }, 500);
  }
}
