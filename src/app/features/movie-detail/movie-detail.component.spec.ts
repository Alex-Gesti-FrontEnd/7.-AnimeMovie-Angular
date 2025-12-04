import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MovieDetailComponent } from './movie-detail.component';
import { MovieService } from '../../core/services/movies.service';
import { ActivatedRoute, Router } from '@angular/router';
import { signal } from '@angular/core';
import { of } from 'rxjs';

describe('MovieDetailComponent', () => {
  let component: MovieDetailComponent;
  let fixture: ComponentFixture<MovieDetailComponent>;

  const mockMovieResponse = {
    id: 10,
    title: 'Test Movie',
    poster_path: '',
    release_date: '2020-01-01',
    overview: '',
    vote_average: 9.2,
    genres: [],
  };

  const mockCreditsResponse = {
    cast: [
      { id: 1, name: 'Actor 1', character: 'Hero', profile_path: '' },
      { id: 2, name: 'Actor 2', character: 'Villain', profile_path: '' },
    ],
    crew: [
      { id: 1, name: 'Director A', job: 'Director' },
      { id: 2, name: 'Writer B', job: 'Writer' },
      { id: 3, name: 'Someone C', job: 'Producer' },
    ],
  };

  const mockMovieService = {
    getMovieDetail: jasmine.createSpy().and.returnValue(of(mockMovieResponse)),
    getMovieCast: jasmine.createSpy().and.returnValue(of(mockCreditsResponse)),
  };

  const mockActivatedRoute = {
    paramMap: of({
      get: () => '10',
    }),
  };

  const mockRouter = {
    navigate: jasmine.createSpy('navigate'),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MovieDetailComponent],
      providers: [
        { provide: MovieService, useValue: mockMovieService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: Router, useValue: mockRouter },
      ],
    });

    fixture = TestBed.createComponent(MovieDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should call MovieService.getMovieDetail with correct ID', () => {
    expect(mockMovieService.getMovieDetail).toHaveBeenCalledWith(10);
  });

  it('should call MovieService.getMovieCast with correct ID', () => {
    expect(mockMovieService.getMovieCast).toHaveBeenCalledWith(10);
  });

  it('should set movie signal after API response', () => {
    expect(component.movie()).toEqual(mockMovieResponse);
  });

  it('should set cast and crew signals after API response', () => {
    expect(component.cast()).toEqual(mockCreditsResponse.cast);
    expect(component.crew()).toEqual(mockCreditsResponse.crew);
  });

  it('directors computed should return only crew with job=Director', () => {
    expect(component.directors().length).toBe(1);
    expect(component.directors()[0].name).toBe('Director A');
  });

  it('writers computed should return jobs Writer, Screenplay, Story, Creator', () => {
    expect(component.writers().length).toBe(1);
    expect(component.writers()[0].name).toBe('Writer B');
  });

  it('goToMenu should navigate to root', () => {
    component['goToMenu']();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/']);
  });

  describe('MovieDetailComponent HTML logic', () => {
    it('should display movie title', () => {
      component.movie.set({
        title: 'Test Movie',
        poster_path: '',
        release_date: '2020-01-01',
        overview: '',
        vote_average: 7.55,
        genres: [],
      });
      fixture.detectChanges();

      const title = fixture.nativeElement.querySelector('h1.fw-bold');
      expect(title.textContent).toContain('Test Movie');
    });

    it('should render genres when available', () => {
      component.movie.set({
        title: 'Test',
        poster_path: '',
        release_date: '',
        overview: '',
        vote_average: 5,
        genres: [{ id: 1, name: 'Action' }],
      });
      fixture.detectChanges();

      const badges = fixture.nativeElement.querySelectorAll('.badge');
      expect(badges.length).toBe(1);
      expect(badges[0].textContent.trim()).toBe('Action');
    });

    it('should render cast list', () => {
      component.cast.set([{ id: 1, name: 'Actor1', character: 'Hero', profile_path: '' }]);
      fixture.detectChanges();

      const castItems = fixture.nativeElement.querySelectorAll('.img-actor');
      expect(castItems.length).toBe(1);
    });

    it('should show directors and writers if available', () => {
      component.crew.set([
        { id: 1, name: 'Director1', job: 'Director' },
        { id: 2, name: 'Writer1', job: 'Writer' },
      ]);

      fixture.detectChanges();

      const creators = fixture.nativeElement.querySelectorAll('.mt-4 p');
      expect(creators.length).toBe(2);
    });
  });
});
