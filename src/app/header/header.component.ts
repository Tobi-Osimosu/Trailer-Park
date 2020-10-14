import { DataService } from './../services/data.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @ViewChild('searchForm', { static: false }) form: NgForm;
  searchResult;

  public YT: any;
  public player3: any;
  public YTMovieTrailerID: string;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {}

  search() {
    this.searchResult = null;
    if (this.form.value.title !== null) {
      this.dataService
        .search(
          this.form.value.title,
          this.form.value.year,
          this.form.value.type
        )
        .subscribe((response) => {
          this.searchResult = response;
        });
    }
    this.form.reset();
  }

  playTrailer(movie_title) {
    let query: string = `${movie_title} Trailer`;
    this.dataService.fetchTrailerID(query).subscribe((res) => {
      this.YTMovieTrailerID = res;

      if (document.querySelector('header iframe')) {
        let YTUrl = `https://www.youtube.com/embed/${this.YTMovieTrailerID}?autoplay=1&modestbranding=1&controls=1&disablekb=1&rel=0&showinfo=0&fs=0&playsinline=1&enablejsapi=1&widgetid=1`;
        document.querySelector('header iframe').setAttribute('src', YTUrl);
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
    this.player3 = new window['YT'].Player('player3', {
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
    this.player3.stopVideo();
  }
}
