import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from '@angular/fire/auth';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  private readonly router = inject(Router);
  private readonly auth: Auth = inject(Auth);

  loginEmail = '';
  loginPassword = '';

  registerEmail = '';
  registerPassword = '';

  constructor() {}

  protected async onLogin(event: Event): Promise<void> {
    event.preventDefault();
    console.log('Logging in with', this.loginEmail, this.loginPassword);

    try {
      const userCredential = await signInWithEmailAndPassword(
        this.auth,
        this.loginEmail,
        this.loginPassword
      );
      console.log('Login successful:', userCredential);
      this.router.navigate(['/']);
    } catch (error: any) {
      console.error('Login failed:', error);
      alert(`Login failed: ${error.message}`);
    }
  }

  protected async onRegister(event: Event): Promise<void> {
    event.preventDefault();
    console.log('Registering with', this.registerEmail, this.registerPassword);

    try {
      const userCredential = await createUserWithEmailAndPassword(
        this.auth,
        this.registerEmail,
        this.registerPassword
      );
      console.log('Registration successful:', userCredential);
      this.router.navigate(['/']);
    } catch (error: any) {
      console.error('Registration failed:', error);
      alert(`Registration failed: ${error.message}`);
    }
  }
}
