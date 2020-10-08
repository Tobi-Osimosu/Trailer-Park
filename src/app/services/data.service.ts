import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  trendingMovies = [];
  data;

  constructor(private http: HttpClient) {}

  fetchTrendingMoviesIMDB_ID() {
    return this.http.get(`/assets/data.json`).pipe(
      map((response) => {
        this.data = response;
        this.data.movie_results.forEach((movieResults) => {
          this.trendingMovies.push(movieResults);
        });
        return this.trendingMovies;
      })
    );
  }

  fetchTrendingMoviesDetails(imdb_id) {
    return this.http.get(`http://www.omdbapi.com/?i=${imdb_id}&apikey=7fcde2d`);
  }
}
