import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MovieModel } from '../models/movie.model';

@Injectable({ providedIn: 'root' })
export class MovieService {
  private apiUrl = 'https://api.themoviedb.org/3';
  private token =
    'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ODRlMDRlMjMxOGU4YmJhMGZjMjgxOTUwMTk0YzI4NiIsIm5iZiI6MTc2Mjk1MDMzOC45NjEsInN1YiI6IjY5MTQ3Y2MyNTc5YjMyNWFiNjNhM2QxZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Ug16KTvo50FvEAYXNae0KtWVT-lyr0gzBcetJRvQp18';

  movies = signal<MovieModel[]>([]);

  constructor(private http: HttpClient) {}

  loadMovies() {
    this.http
      .get<any>(`${this.apiUrl}/discover/movie?with_keywords=210024&language=en-EN`, {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      })
      .subscribe((res) => {
        this.movies.set(res.results);
      });
  }

  getMovieDetail(id: number) {
    return this.http.get<any>(`${this.apiUrl}/movie/${id}?language=en-EN`, {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    });
  }

  getMovieCast(id: number) {
    return this.http.get<any>(`${this.apiUrl}/movie/${id}/credits?language=en-EN`, {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    });
  }
}
