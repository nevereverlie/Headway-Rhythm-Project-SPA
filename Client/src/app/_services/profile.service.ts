import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  getUsers() {
    return this.http.get(this.baseUrl + 'user');
  }

  getUser(userId: number) {
    return this.http.get(this.baseUrl + 'user/' + userId);
  }

  updateProfile(userToSend: any) {
    return this.http.put(this.baseUrl + 'user/update', userToSend);
  }

  deleteUser(userId: number) {
    return this.http.delete(this.baseUrl + 'user/delete/' + userId);
  }
}
