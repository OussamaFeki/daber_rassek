import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  //for manage the account
  private apiUrl = 'http://localhost:3000/user';
  private tokenKey = 'oussama';
  //for searsh 
  private searshurl= 'http://localhost:3000/search'
  //for review
  private reviewurl= 'http://localhost:3000/review'
  constructor(private http: HttpClient,private auth:AuthService) {

  }
  // "for manage the account"
  // for get profile (the two card)
  getProfile() : Observable<any> {
    const token =localStorage.getItem(this.tokenKey)
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    return this.http.get(`${this.apiUrl}/profile`,{headers})
  }
  //service for the add fraalncer card
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
    formData.append('from', user.from);
    formData.append('to',user.to)
    formData.append('phone', user.phone);
    formData.append('city', user.city);
    if (picture) {
      formData.append('picture', picture, picture.name);
    }

    return this.http.put(`${this.apiUrl}/addfreelancercard`, formData,{headers});
  }
  //for add or Modifie the Client Card 
  addClientCard(user: any,needsFormArray: any, picture: File | null): Observable<any> {
    const token =localStorage.getItem(this.tokenKey)
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    const needsArray = needsFormArray.value;
    console.log(needsArray)
    const formData = new FormData();
    needsArray.forEach((need: string) => {
      formData.append('needs', need);
    });
    formData.append('name', user.name);
    formData.append('firstname', user.firstname);
    formData.append('birthday', user.birthday);
    formData.append('gender', user.gender);
    formData.append('from', user.from);
    formData.append('to',user.to)
    formData.append('phone', user.phone);
    formData.append('city', user.city);
    console.log('the form will send',formData.get('needs'))
    if (picture) {
      formData.append('picture', picture, picture.name);
    }
    return this.http.put(`${this.apiUrl}/addclientcard`,formData,{headers});
  }
  // For get the Freelancer Card 
  getFreelancerCard(): Observable<any> {
    const token =localStorage.getItem(this.tokenKey)
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get<any>(`${this.apiUrl}/getfreelancerCard`, { headers });
  }
  //For get the clent card 
  getClientCard(): Observable<any> {
    const token =localStorage.getItem(this.tokenKey)
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get<any>(`${this.apiUrl}/getclientCard`, { headers });
  }
   // "for search "
   searchUsers(query: string, field: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.searshurl}/users?query=${query}&field=${field}`);
  }
  //"for review"
  //add a rate from client to employee
  addrate(clientId:string,employeeId:string,rating:any): Observable<any> {
    const reviewData = { clientId, employeeId, rating };
    return this.http.post(`${this.reviewurl}/add`,reviewData);
  }
}
