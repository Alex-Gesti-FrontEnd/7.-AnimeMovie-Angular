import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { MovieDetailComponent } from './features/movie-detail/movie-detail.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent,
  },
  { path: 'movie/:id', component: MovieDetailComponent },
];
