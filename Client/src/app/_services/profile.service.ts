import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient) { }

  getUser(userId: number) {
    return this.http.get('http://localhost:5001/api/user/' + userId);
  }

  updateProfile(userToSend: any){
    return this.http.post('http://localhost:5001/api/user/update', userToSend);
  }
}
