import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  private readonly router = inject(Router);

  loginEmail = '';
  loginPassword = '';

  registerEmail = '';
  registerPassword = '';

  constructor() {}

  protected onLogin(event: Event): void {
    event.preventDefault();
    console.log('Logging in with', this.loginEmail, this.loginPassword);
  }

  protected onRegister(event: Event): void {
    event.preventDefault();
    console.log('Registering with', this.registerEmail, this.registerPassword);
  }
}
