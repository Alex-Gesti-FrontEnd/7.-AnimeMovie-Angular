import { Injectable, signal } from '@angular/core';
import {
  Auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from '@angular/fire/auth';

@Injectable({ providedIn: 'root' })
export class AuthService {
  user = signal<any | null>(null);

  constructor(private auth: Auth) {
    onAuthStateChanged(this.auth, (firebaseUser) => {
      this.user.set(firebaseUser);
    });
  }

  login(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  register(email: string, password: string) {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  logout() {
    return signOut(this.auth);
  }

  isLoggedIn() {
    return this.user() !== null;
  }

  getUserName() {
    return (this.user()?.email ?? '').split('@')[0];
  }
}
