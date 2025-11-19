import { Component, effect } from '@angular/core';
import { MovieService } from '../../core/services/movies.service';
import { MovieModel } from '../../core/models/movie.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  movies: MovieModel[] = [];

  constructor(private movieService: MovieService) {
    effect(() => {
      this.movies = this.movieService.movies();
    });
  }

  ngOnInit() {
    this.movieService.loadMovies();
  }
}
