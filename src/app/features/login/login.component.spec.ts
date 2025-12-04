import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  const mockAuth = {
    login: jasmine.createSpy('login').and.returnValue(Promise.resolve()),
    register: jasmine.createSpy('register').and.returnValue(Promise.resolve()),
  };

  const mockRouter = {
    navigate: jasmine.createSpy('navigate'),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [LoginComponent],
      providers: [
        { provide: AuthService, useValue: mockAuth },
        { provide: Router, useValue: mockRouter },
      ],
    });

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('onLogin should call authService.login and navigate', async () => {
    component.loginEmail = 'test@test.com';
    component.loginPassword = '123456';

    await component.onLogin(new Event('submit'));

    expect(mockAuth.login).toHaveBeenCalledWith('test@test.com', '123456');
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/']);
  });

  it('onRegister should call authService.register and navigate', async () => {
    component.registerEmail = 'test@test.com';
    component.registerPassword = '123456';

    await component.onRegister(new Event('submit'));

    expect(mockAuth.register).toHaveBeenCalledWith('test@test.com', '123456');
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/']);
  });

  describe('LoginComponent HTML logic', () => {
    it('should have a Login form with email and password fields', () => {
      const inputs = fixture.nativeElement.querySelectorAll('.auth-card:first-of-type input');
      expect(inputs.length).toBe(2);
      expect(inputs[0].type).toBe('email');
      expect(inputs[1].type).toBe('password');
    });

    it('should have a Register form with email and password fields', () => {
      const cards = fixture.nativeElement.querySelectorAll('.auth-card');
      const registerCard = cards[1];

      const inputs = registerCard.querySelectorAll('input');
      expect(inputs.length).toBe(2);
      expect(inputs[0].type).toBe('email');
      expect(inputs[1].type).toBe('password');
    });

    it('should call onLogin() when Login form is submitted', () => {
      const spyLogin = spyOn(component, 'onLogin');
      const form = fixture.nativeElement.querySelector('.auth-card:first-of-type form');

      form.dispatchEvent(new Event('submit'));
      expect(spyLogin).toHaveBeenCalled();
    });

    it('should call onRegister() when Register form is submitted', () => {
      const spyRegister = spyOn(component, 'onRegister');
      const registerForm = fixture.nativeElement
        .querySelectorAll('.auth-card')[1]
        .querySelector('form');

      registerForm.dispatchEvent(new Event('submit'));
      expect(spyRegister).toHaveBeenCalled();
    });
  });
});
