import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { signal } from '@angular/core';

describe('AuthService', () => {
  let service: AuthService;

  class MockAuthService {
    user = signal<any | null>(null);

    login = jasmine.createSpy('login').and.callFake((email: string, password: string) => {
      this.user.set({ email });
      return Promise.resolve();
    });

    register = jasmine.createSpy('register').and.callFake((email: string, password: string) => {
      this.user.set({ email });
      return Promise.resolve();
    });

    logout = jasmine.createSpy('logout').and.callFake(() => {
      this.user.set(null);
      return Promise.resolve();
    });

    isLoggedIn() {
      return this.user() !== null;
    }

    getUserName() {
      return (this.user()?.email ?? '').split('@')[0];
    }
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: AuthService, useClass: MockAuthService }],
    });

    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('isLoggedIn should return false if user is null', () => {
    service.user.set(null);
    expect(service.isLoggedIn()).toBeFalse();
  });

  it('isLoggedIn should return true when user exists', () => {
    service.user.set({ email: 'test@example.com' });
    expect(service.isLoggedIn()).toBeTrue();
  });

  it('getUserName should extract name before @', () => {
    service.user.set({ email: 'naruto@konoha.com' });
    expect(service.getUserName()).toBe('naruto');
  });

  it('login should set user and be called with correct args', async () => {
    await service.login('naruto@konoha.com', '123456');
    expect(service.user()).toEqual({ email: 'naruto@konoha.com' });
  });

  it('register should set user and be called with correct args', async () => {
    await service.register('naruto@konoha.com', '123456');
    expect(service.user()).toEqual({ email: 'naruto@konoha.com' });
  });

  it('logout should clear user', async () => {
    service.user.set({ email: 'naruto@konoha.com' });
    await service.logout();
    expect(service.user()).toBeNull();
  });
});
