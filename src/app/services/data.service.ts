import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Youtube } from '../youtube.model';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  trendingMovies = [];
  upcomingMovies = [];
  trendingMovies_imdb_ids = [];
  upcomingMovies_imdb_ids = [];
  trendingMoviesData;
  upcomingMoviesData;
  player;
  player2;
  player3;

  constructor(private http: HttpClient) {}

  fetchTrendingMovies() {
    return this.http.get(`/assets/trendingMovies.json`).pipe(
      map((response) => {
        this.trendingMoviesData = response;
        this.trendingMoviesData.movie_results.forEach((movieResults) => {
          this.trendingMovies_imdb_ids.push(movieResults.imdb_id);
        });
      }),
      map(() => {
        this.trendingMovies_imdb_ids.forEach((imdb_id) => {
          this.fetchMoviesDetails(imdb_id).subscribe((response) => {
            // let trending_movies = response;
            this.trendingMovies.push(response);
          });
        });
        return this.trendingMovies;
      })
    );
  }

  fetchUpcomingMovies() {
    return this.http.get(`/assets/upcomingMovies.json`).pipe(
      map((response) => {
        this.upcomingMoviesData = response;
        this.upcomingMoviesData.movie_results.forEach((movieResults) => {
          this.upcomingMovies_imdb_ids.push(movieResults.imdb_id);
        });
      }),
      map(() => {
        this.upcomingMovies_imdb_ids.forEach((imdb_id) => {
          this.fetchMoviesDetails(imdb_id).subscribe((response) => {
            // let upcoming_movies = response;
            this.upcomingMovies.push(response);
          });
        });
        return this.upcomingMovies;
      })
    );
  }

  fetchMoviesDetails(imdb_id) {
    return this.http.get(
      `https://www.omdbapi.com/?i=${imdb_id}&apikey=7fcde2d`
    );
  }

  search(title, year, type) {
    return this.http.get(
      `https://www.omdbapi.com/?t=${title}&y=${year}&type=${type}&apikey=7fcde2d`
    );
  }

  fetchTrailerID(query) {
    return this.http.get<Youtube>(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=${query}&key=AIzaSyD8MgwHFcZm2n24zSKi0j23oiog-mLVtH0`
    ).pipe(
      map((result) => {
        return result.items[0].id.videoId;
      })
    );
  }

  initYoutubePlayer(YTMovieTrailerID) {
    var tag = document.createElement('script');

    tag.src = 'https://www.youtube.com/iframe_api';
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    window['onYouTubeIframeAPIReady'] = () => this.startVideo(YTMovieTrailerID);
  }

  startVideo(YTMovieTrailerID) {
    this.player = new window['YT'].Player('player', {
      // height: "460",
      // width: "100%",
      videoId: YTMovieTrailerID,
      playerVars: {
        // autoplay: 0,
        modestbranding: 1,
        controls: 1,
        disablekb: 1,
        rel: 0,
        showinfo: 0,
        fs: 0,
        playsinline: 1,
      },
      events: {
        // onError: this.onPlayerError.bind(this),
        // onReady: this.onPlayerReady.bind(this),
      },
    });

    this.player2 = new window['YT'].Player('player2', {
      // height: "460",
      // width: "100%",
      videoId: YTMovieTrailerID,
      playerVars: {
        // autoplay: 0,
        modestbranding: 1,
        controls: 1,
        disablekb: 1,
        rel: 0,
        showinfo: 0,
        fs: 0,
        playsinline: 1,
      },
      events: {
        // onError: this.onPlayerError.bind(this),
        // onReady: this.onPlayer2Ready.bind(this),
      },
    });

    this.player3 = new window['YT'].Player('player3', {
      // height: "460",
      // width: "100%",
      videoId: YTMovieTrailerID,
      playerVars: {
        // autoplay: 0,
        modestbranding: 1,
        controls: 1,
        disablekb: 1,
        rel: 0,
        showinfo: 0,
        fs: 0,
        playsinline: 1,
      },
      events: {
        // onError: this.onPlayerError.bind(this),
        // onReady: this.onPlayer3Ready.bind(this),
      },
    });
  }

  // onPlayerReady(event) {
  //   event.target.playVideo();
  // }

  // onPlayer2Ready(event) {
  //   event.target.playVideo();
  // }

  // onPlayer3Ready(event) {
  //   event.target.playVideo();
  // }

  // onPlayerError(event) {
  //   switch (event.data) {
  //     case 2:
  //       console.log('' + this.YTMovieTrailerID);
  //       break;
  //     case 100:
  //       break;
  //     case 101 || 150:
  //       break;
  //   }
  // }

}