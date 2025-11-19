import { Component, effect, inject } from '@angular/core';
import { MovieService } from '../../core/services/movies.service';
import { MovieModel } from '../../core/models/movie.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  private readonly movieService = inject(MovieService);
  private readonly router = inject(Router);

  movies: MovieModel[] = [];

  constructor() {
    effect(() => {
      this.movies = this.movieService.movies();
    });
  }

  ngOnInit() {
    this.movieService.loadMovies();
  }

  protected goToMovie(id: number): void {
    this.router.navigate(['/movie', id]);
  }
}
