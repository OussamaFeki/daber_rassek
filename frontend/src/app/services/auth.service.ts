import { Injectable,TemplateRef } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/user';
  private tokenKey = 'oussama';
  toasts: any[] = [];
  jwtHelper = new JwtHelperService();
  constructor(private http: HttpClient ) {}

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
  isAuthenticated(): boolean {
    // For simplicity, you can check if the user has a token or any other authentication mechanism
    // You can modify this method based on your authentication requirements
    return localStorage.getItem(this.tokenKey) !== null;
  }
  removeAuthToken(): void {
    localStorage.removeItem(this.tokenKey);
  }
  //change un password
  changePassword(currentPassword: string, newPassword: string): Observable<any> {
    const token =localStorage.getItem(this.tokenKey)
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    const body = { currentPassword, newPassword };
    return this.http.put(`${this.apiUrl}/setting`,body,{ headers });
    // Replace '/change-password' with your actual API endpoint for changing passwords
  }
  logout(): void {
    // Call any additional cleanup or backend logout logic if needed
    // ...

    // Remove the token from local storage
    this.removeAuthToken();
  }
  decodeToken(token: string): any {
    try {
      return this.jwtHelper.decodeToken(token);
    } catch (error) {
      console.error('Token decoding failed', error);
      return null;
    }
 }
}
