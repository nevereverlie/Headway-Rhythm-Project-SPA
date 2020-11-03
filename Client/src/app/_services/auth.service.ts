import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { map } from 'rxjs/operators';
import { SocialAuthService, GoogleLoginProvider } from 'angularx-social-login';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = 'http://localhost:5001/api/auth/';
  loginMode: boolean = false;
  jwtHelper = new JwtHelperService();
  decodedToken: any;

  constructor(private http: HttpClient, private authService: SocialAuthService) { }

  login(model: any){
    return this.http.post(this.baseUrl + 'login', model)
      .pipe(
        map((response: any) => {
          const user = response;
          if (user) {
            localStorage.setItem('token', user.token);
            console.log(user);
            this.decodedToken = this.jwtHelper.decodeToken(user.token);
            console.log(this.decodedToken);
          }
        })
      );
  }

  loggedIn() {
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }

  logout() {
    localStorage.removeItem('token');
    console.log('logged out');
  }

  register(model: any) {
    return this.http.post(this.baseUrl + 'register', model);
  }

  signinWithGoogle () {
    const socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;

    this.authService.signIn(socialPlatformProvider)
    .then((userData) => {
      if (userData) {
        this.decodedToken = this.jwtHelper.decodeToken(userData.idToken);
        const googleUser = {firstName: this.decodedToken.given_name,
          lastName: this.decodedToken.family_name,
          email: this.decodedToken.email};
        console.log(googleUser);
        this.sendData(googleUser).subscribe(() => {
          console.log('Successfully logged in via Google');
        });
      }
    }, error => {
      console.log(error);
    });
  }

  sendData(googleUser: any){
    return this.http.post(this.baseUrl + 'loginGoogleUser', googleUser)
    .pipe(
      map((response: any) => {
        const user = response;
        if (user) {
          localStorage.setItem('token', user.token);
          this.decodedToken = this.jwtHelper.decodeToken(user.token);
          console.log(this.decodedToken);
        }
      })
    );
  }

}
