import { Injectable, inject, signal } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MovieModel } from '../models/movie.model';

@Injectable({ providedIn: 'root' })
export class MovieService {
  private readonly http = inject(HttpClient);

  private readonly apiUrl = 'https://api.themoviedb.org/3';
  private readonly token =
    'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ODRlMDRlMjMxOGU4YmJhMGZjMjgxOTUwMTk0YzI4NiIsIm5iZiI6MTc2Mjk1MDMzOC45NjEsInN1YiI6IjY5MTQ3Y2MyNTc5YjMyNWFiNjNhM2QxZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Ug16KTvo50FvEAYXNae0KtWVT-lyr0gzBcetJRvQp18';

  private readonly headers = new HttpHeaders({
    Authorization: `Bearer ${this.token}`,
  });

  movies = signal<MovieModel[]>([]);
  currentPage = signal(1);
  totalPages = signal<number>(1);
  viewMode = signal<'infinite' | 'paginated'>('infinite');

  setViewMode(mode: 'infinite' | 'paginated') {
    this.viewMode.set(mode);
    this.movies.set([]);
    this.currentPage.set(1);
    this.loadPage(1);
  }

  loadPage(page: number) {
    this.http
      .get<any>(`${this.apiUrl}/discover/movie?with_keywords=210024&language=en-EN&page=${page}`, {
        headers: this.headers,
      })
      .subscribe((res) => {
        if (this.viewMode() === 'paginated') this.movies.set(res.results);
        else this.movies.update((old) => [...old, ...res.results]);
        this.currentPage.set(page);
        this.totalPages.set(res.total_pages);
      });
  }

  loadMore() {
    const next = this.currentPage() + 1;
    if (next <= this.totalPages()) {
      this.loadPage(next);
    }
  }

  getMovieDetail(id: number) {
    return this.http.get<any>(`${this.apiUrl}/movie/${id}?language=en-EN`, {
      headers: this.headers,
    });
  }

  getMovieCast(id: number) {
    return this.http.get<any>(`${this.apiUrl}/movie/${id}/credits?language=en-EN`, {
      headers: this.headers,
    });
  }
}
