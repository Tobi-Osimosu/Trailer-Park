import { Movie } from './../movie.model';
import { DataService } from './../services/data.service';
import { AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { Swiper } from 'swiper';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-upcoming-movies',
  templateUrl: './upcoming-movies.component.html',
  styleUrls: ['./upcoming-movies.component.scss'],
})
export class UpcomingMoviesComponent implements OnInit, AfterViewInit {
  public config: SwiperConfigInterface = {};
  upcomingMovies = null;
  selected_movie: Movie;

  public YT: any;
  public player2: any;
  public YTMovieTrailerID: string;

  constructor(
    private elementRef: ElementRef,
    private dataService: DataService
  ) {
    this.dataService.fetchUpcomingMovies().subscribe();

    this.upcomingMovies = this.dataService.upcomingMovies;
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
      '#upcoming-movies .swiper-container'
    ).swiper;
    mySwiper.slidePrev();
  }

  slideNext() {
    let mySwiper = this.elementRef.nativeElement.querySelector(
      '#upcoming-movies .swiper-container'
    ).swiper;
    mySwiper.slideNext();
  }

  movie(index) {
    this.selected_movie = null;
    this.selected_movie = this.upcomingMovies[index];
  }

  reInitSwiper() {
    let mySwiper = this.elementRef.nativeElement.querySelector(
      '#upcoming-movies .swiper-container'
    ).swiper;

    setTimeout(() => {
      mySwiper.update();
    }, 500);
  }
  
  playTrailer(movie_title) {
    let query: string = `${movie_title} Trailer`;
    this.dataService.fetchTrailerID(query).subscribe((res) => {
      this.YTMovieTrailerID = res;

      if (document.querySelector('#upcoming-movies iframe')) {
        let YTUrl = `https://www.youtube.com/embed/${this.YTMovieTrailerID}?autoplay=1&modestbranding=1&controls=1&disablekb=1&rel=0&showinfo=0&fs=0&playsinline=1&enablejsapi=1&widgetid=1`;
        document.querySelector('iframe').setAttribute('src', YTUrl);
      } else {
        this.initYoutubePlayer();
      }
    });
  }

  initYoutubePlayer() {
    var tag = document.createElement('script');

    tag.src = 'https://www.youtube.com/iframe_api';
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    window['onYouTubeIframeAPIReady'] = () => this.startVideo();
  }

  startVideo() {
    this.player2 = new window['YT'].Player('player2', {
      // height: "460",
      // width: "100%",
      videoId: this.YTMovieTrailerID,
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
        console.log('' + this.YTMovieTrailerID);
        break;
      case 100:
        break;
      case 101 || 150:
        break;
    }
  }

  onModalClose() {
    this.player2.stopVideo();
  }
}
