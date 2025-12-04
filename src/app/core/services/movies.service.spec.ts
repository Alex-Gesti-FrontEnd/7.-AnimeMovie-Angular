import { TestBed } from '@angular/core/testing';
import { MovieService } from './movies.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('MovieService', () => {
  let service: MovieService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MovieService],
    });

    service = TestBed.inject(MovieService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpMock.verify());

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('loadPage should update movies and pagination', () => {
    service.loadPage(1);

    const req = httpMock.expectOne(
      `https://api.themoviedb.org/3/discover/movie?with_keywords=210024&language=en-EN&page=1`
    );
    expect(req.request.method).toBe('GET');

    req.flush({
      results: [{ id: 1, title: 'Test Movie' }],
      total_pages: 5,
    });

    expect(service.movies().length).toBe(1);
    expect(service.currentPage()).toBe(1);
    expect(service.totalPages()).toBe(5);
  });

  it('getMovieDetail should call correct API', () => {
    service.getMovieDetail(10).subscribe();

    const req = httpMock.expectOne(`https://api.themoviedb.org/3/movie/10?language=en-EN`);
    expect(req.request.method).toBe('GET');
  });

  it('getMovieCast should call correct API', () => {
    service.getMovieCast(10).subscribe();

    const req = httpMock.expectOne(`https://api.themoviedb.org/3/movie/10/credits?language=en-EN`);
    expect(req.request.method).toBe('GET');
  });
});
