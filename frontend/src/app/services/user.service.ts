import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:3000/user';

  constructor(private http: HttpClient) {}

  updateProfile(user: any, picture: File | null): Observable<any> {
    const formData = new FormData();
    formData.append('name', user.name);
    formData.append('firstname', user.firstname);
    formData.append('birthday', user.birthday);
    formData.append('gender', user.gender);
    formData.append('role', user.role);
    formData.append('time', user.time);
    formData.append('needs', user.needs);
    formData.append('availability', user.availability);

    if (picture) {
      formData.append('picture', picture, picture.name);
    }

    return this.http.put(`${this.apiUrl}/addfreelancercard`, formData);
  }
}
