import { Component, inject, signal, effect, computed } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from '../../core/services/movies.service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-movie-detail',
  standalone: true,
  imports: [],
  templateUrl: './movie-detail.component.html',
  styleUrl: './movie-detail.component.scss',
})
export class MovieDetailComponent {
  private readonly movieService = inject(MovieService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  private readonly id = toSignal(this.route.paramMap, { initialValue: null });

  movie = signal<any>(null);
  cast = signal<any[]>([]);
  crew = signal<any[]>([]);

  directors = computed(() => this.crew().filter((m) => m.job === 'Director'));
  writers = computed(() =>
    this.crew().filter((m) => ['Writer', 'Screenplay', 'Story', 'Creator'].includes(m.job))
  );

  constructor() {
    effect(() => {
      const param = this.id();
      if (!param) return;

      const movieId = Number(param.get('id'));

      this.movieService.getMovieDetail(movieId).subscribe((m) => this.movie.set(m));
      this.movieService.getMovieCast(movieId).subscribe((c) => {
        this.cast.set(c.cast);
        this.crew.set(c.crew);
      });
    });
  }

  protected goToMenu(): void {
    this.router.navigate(['/']);
  }
}
