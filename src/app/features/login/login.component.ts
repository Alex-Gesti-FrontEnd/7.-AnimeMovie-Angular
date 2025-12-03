import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);

  loginEmail = '';
  loginPassword = '';

  registerEmail = '';
  registerPassword = '';

  constructor() {}

  async onLogin(event: Event) {
    event.preventDefault();
    try {
      await this.authService.login(this.loginEmail, this.loginPassword);
      this.router.navigate(['/']);
    } catch (error: any) {
      alert(`Login failed: ${error.message}`);
    }
  }

  async onRegister(event: Event) {
    event.preventDefault();
    try {
      await this.authService.register(this.registerEmail, this.registerPassword);
      this.router.navigate(['/']);
    } catch (error: any) {
      alert(`Registration failed: ${error.message}`);
    }
  }
}
