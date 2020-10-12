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

  public YT: any;
  public video: any;
  public player: any;
  // public reframed: Boolean = false;

  constructor(
    private elementRef: ElementRef,
    private dataService: DataService
  ) {
    this.dataService.fetchTrendingMovies().subscribe();

    this.trendingMovies = this.dataService.trendingMovies;
  }

  ngOnInit() {}

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

  reInitSwiper() {
    let mySwiper = this.elementRef.nativeElement.querySelector(
      '#trending-movies .swiper-container'
    ).swiper;

    setTimeout(() => {
      mySwiper.update();
    }, 500);
  }

  playTrailer() {
    console.log('play Trailer Function Reached');

    this.video = 'hXN5SGUSpzw';
    this.initYoutubePlayer();
  }

  initYoutubePlayer() {
    var tag = document.createElement('script');

    tag.src = 'https://www.youtube.com/iframe_api';
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    window['onYouTubeIframeAPIReady'] = () => this.startVideo();
  }

  startVideo() {
    // this.reframed = false;
    this.player = new window['YT'].Player('player', {
      videoId: this.video,
      playerVars: {
        autoplay: 1,
        modestbranding: 1,
        controls: 1,
        disablekb: 1,
        rel: 0,
        showinfo: 0,
        fs: 0,
        playsinline: 1,
      },
      events: {
        onError: this.onPlayerError.bind(this),
        onReady: this.onPlayerReady.bind(this),
      },
    });
  }

  onPlayerReady(event) {
    event.target.playVideo();
  }

  onPlayerError(event) {
    switch (event.data) {
      case 2:
        console.log('' + this.video);
        break;
      case 100:
        break;
      case 101 || 150:
        break;
    }
  }
}
