import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../_services/auth.service';
import { Location } from '@angular/common';
import { AlertifyService } from '../_services/alertify.service';

@Component({
  selector: 'app-login-register-form',
  templateUrl: './login-register-form.component.html',
  styleUrls: ['./login-register-form.component.scss']
})
export class LoginRegisterFormComponent implements OnInit {

  faTimes = faTimes;

  model: any = {};
  registerMode: boolean = false;
  constructor(private authService: AuthService,
              private router: Router,
              private location: Location,
              private alertify: AlertifyService) { }

  ngOnInit() {
  }


  login() {
    this.authService.login(this.model).subscribe(next => {
      this.alertify.success('Logged In');
    }, error => {
      this.alertify.error('Failed to login: ' + error);
    }, () => {
      this.router.navigate(['']);
    });
  }

  back() {
    this.location.back();
  }

  register() {
    this.authService.register(this.model).subscribe(() => {
      this.alertify.success('Registration success');
      this.cancelRegistrationMode();
    }, error => {
      this.alertify.error(error);
    });
  }

  async signInWithGoogle() {
    await this.authService.signinWithGoogle();
    this.back();
  }

  enableRegisterMode() {
    this.registerMode = true;
    console.log('enabled');
  }

  cancelRegistrationMode() {
    this.registerMode = false;
    console.log('cancelled');
  }

}
