import { DataService } from './../services/data.service';
import { AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { Swiper } from 'swiper';

@Component({
  selector: 'app-trending-movies',
  templateUrl: './trending-movies.component.html',
  styleUrls: ['./trending-movies.component.scss'],
})
export class TrendingMoviesComponent implements OnInit, AfterViewInit {
  config: SwiperConfigInterface;
  trendingMovies = [];
  imdb_ids = [];

  constructor(
    private elementRef: ElementRef,
    private dataService: DataService
  ) {}

  ngOnInit() {
    this.dataService.fetchTrendingMoviesIMDB_ID().subscribe((response) => {
      let data = response;
      data.forEach((el) => {
        this.imdb_ids.push(el.imdb_id);
      });

      console.log(this.imdb_ids);

      this.imdb_ids.forEach((id) => {
        this.dataService
          .fetchTrendingMoviesDetails(id)
          .subscribe((response) => {
            let trending_movies = response;
            this.trendingMovies.push(trending_movies);
          });
      });

      console.log(this.trendingMovies);
    });

    // let mySwiper = new Swiper('.swiper-container', {
    this.config = {
      direction: 'horizontal',
      loop: true,
      slidesPerView: 4,
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
}
