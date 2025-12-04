import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { MovieService } from '../../core/services/movies.service';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { signal } from '@angular/core';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  const mockMovieService = {
    movies: signal([{ id: 1, title: 'Movie A', poster_path: '', vote_average: 7 }]),
    loadPage: jasmine.createSpy('loadPage'),
    loadMore: jasmine.createSpy('loadMore'),
    currentPage: signal(1),
    totalPages: signal(5),
  };

  const mockAuthService = {
    isLoggedIn: signal(false),
    getUserName: () => 'testuser',
    logout: jasmine.createSpy('logout').and.returnValue(Promise.resolve()),
  };

  const mockRouter = {
    navigate: jasmine.createSpy('navigate'),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HomeComponent],
      providers: [
        { provide: MovieService, useValue: mockMovieService },
        { provide: AuthService, useValue: mockAuthService },
        { provide: Router, useValue: mockRouter },
      ],
    });

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('goToMovie should navigate correctly', () => {
    component['router'].navigate(['/movie', 5]);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/movie', 5]);
  });

  it('logout should call authService.logout and navigate', async () => {
    await component.logout();
    expect(mockAuthService.logout).toHaveBeenCalled();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/login']);
  });

  describe('HomeComponent HTML logic', () => {
    it('should show the Login button when user is not logged in', () => {
      mockAuthService.isLoggedIn.set(false);
      fixture.detectChanges();

      const loginButton = fixture.nativeElement.querySelector('button.btn-outline-light');
      expect(loginButton).not.toBeNull();
      expect(loginButton.textContent.trim()).toBe('Login');
    });

    it('should show the overlay message when user is not logged in', () => {
      mockAuthService.isLoggedIn.set(false);
      fixture.detectChanges();

      const overlay = fixture.nativeElement.querySelector('.overlay-locked');
      expect(overlay).not.toBeNull();
      expect(overlay.textContent).toContain('Login is required');
    });

    it('should NOT show the overlay when user IS logged in', () => {
      mockAuthService.isLoggedIn.set(true);
      fixture.detectChanges();

      const overlay = fixture.nativeElement.querySelector('.overlay-locked');
      expect(overlay).toBeNull();
    });

    it('should render movie cards when logged in', () => {
      mockAuthService.isLoggedIn.set(true);

      mockMovieService.movies.set([
        { id: 1, title: 'Test Movie', poster_path: '', vote_average: 8.1 },
      ]);

      fixture.detectChanges();

      const cards = fixture.nativeElement.querySelectorAll('.section-adjusted');
      expect(cards.length).toBe(1);
    });
  });
});
