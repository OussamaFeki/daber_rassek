import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:3000/user';
  private tokenKey = 'oussama';
  
  constructor(private http: HttpClient,private auth:AuthService) {

  }

  updateProfile(user: any, picture: File | null): Observable<any> {
    const token =localStorage.getItem(this.tokenKey)
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    const formData = new FormData();
    formData.append('name', user.name);
    formData.append('firstname', user.firstname);
    formData.append('birthday', user.birthday);
    formData.append('gender', user.gender);
    formData.append('role', user.role);
    formData.append('needs', user.needs);
    formData.append('availability', user.availability);
    formData.append('phone', user.phone);
    formData.append('city', user.city);
    if (picture) {
      formData.append('picture', picture, picture.name);
    }

    return this.http.put(`${this.apiUrl}/addfreelancercard`, formData,{headers});
  }
  getFreelancerCard(): Observable<any> {
    const token =localStorage.getItem(this.tokenKey)
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get<any>(`${this.apiUrl}/getfreelancerCard`, { headers });
  }
}
