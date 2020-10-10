import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  trendingMovies = [];
  imdb_ids = [];
  data;

  constructor(private http: HttpClient) {}

  fetchTrendingMovies() {
    return this.http.get(`/assets/data.json`).pipe(
      map((response) => {
        this.data = response;
        this.data.movie_results.forEach((movieResults) => {
          this.imdb_ids.push(movieResults.imdb_id);
        });

        this.imdb_ids.forEach((id) => {
          this.fetchTrendingMoviesDetails(id).subscribe((response) => {
            let trending_movies = response;
            this.trendingMovies.push(trending_movies);
          });
        });
        return this.trendingMovies;
      })
    );
  }

  fetchTrendingMoviesDetails(imdb_id) {
    return this.http.get(
      `https://www.omdbapi.com/?i=${imdb_id}&apikey=7fcde2d`
    );
  }
}
