import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

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

  constructor(private http: HttpClient) {}

  fetchTrendingMovies() {
    return this.http.get(`/assets/trendingMovies.json`).pipe(
      map((response) => {
        this.trendingMoviesData = response;
        this.trendingMoviesData.movie_results.forEach((movieResults) => {
          this.trendingMovies_imdb_ids.push(movieResults.imdb_id);
        });

        this.trendingMovies_imdb_ids.forEach((id) => {
          this.fetchMoviesDetails(id).subscribe((response) => {
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

        this.upcomingMovies_imdb_ids.forEach((id) => {
          this.fetchMoviesDetails(id).subscribe((response) => {
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
}
