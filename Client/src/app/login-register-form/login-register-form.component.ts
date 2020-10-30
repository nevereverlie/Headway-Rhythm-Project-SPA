import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../_services/auth.service';
import { Location } from '@angular/common';

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
    private router: Router,  private location: Location) { }

  ngOnInit() {
  }


  login() {
    this.authService.login(this.model).subscribe(next => {
      console.log('logged successfully');
    }, error => {
     console.log('Failed to login');
    }, () => {
      this.router.navigate(['']);
    });
  }

  back() {
    this.location.back();
  }

  register() {
    this.authService.register(this.model).subscribe(() => {
      console.log('registration success');
      this.cancelRegistrationMode();
    }, error => {
      console.log(error);
    });
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
