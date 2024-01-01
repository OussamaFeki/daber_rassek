import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/user';
  private tokenKey = 'oussama';
  constructor(private http: HttpClient) {}

  signUp(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/signup`, user);
  }

  signIn(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials);
  }
  setAuthToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }
  getAuthToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }
  removeAuthToken(): void {
    localStorage.removeItem(this.tokenKey);
  }
  logout(): void {
    // Call any additional cleanup or backend logout logic if needed
    // ...

    // Remove the token from local storage
    this.removeAuthToken();
  }
}
