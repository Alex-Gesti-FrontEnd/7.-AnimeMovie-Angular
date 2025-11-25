import { Component, effect, HostListener, inject, signal } from '@angular/core';
import { MovieService } from '../../core/services/movies.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  private readonly movieService = inject(MovieService);
  private readonly router = inject(Router);

  movies = this.movieService.movies;

  constructor() {
    effect(() => {
      if (this.movies().length === 0) {
        this.movieService.loadPage(1);
      }
    });
  }

  protected goToMovie(id: number): void {
    this.router.navigate(['/movie', id]);
  }

  @HostListener('window:scroll', [])
  onScroll(): void {
    if (this.movieService.currentPage() >= this.movieService.totalPages()) return;

    const scrollPosition = window.innerHeight + window.scrollY;
    const threshold = document.body.offsetHeight - 300;

    if (scrollPosition >= threshold) {
      this.movieService.loadMore();
    }
  }
}
