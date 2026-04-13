import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({ providedIn: 'root' })
export class AuthService {
  private TOKEN_KEY = 'user_token';
  private API_URL = 'https://api.escuelajs.co/api/v1/auth/login';
  constructor(private http: HttpClient) {}

  login(data: { email: string; password: string }) {
    return this.http.post(this.API_URL, data);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  setToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
  }
}
