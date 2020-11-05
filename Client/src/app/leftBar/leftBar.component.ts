import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faCompactDisc } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { routes } from '../app-routing.module';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-leftBar',
  templateUrl: './leftBar.component.html',
  styleUrls: ['./leftBar.component.css']
})
export class LeftBarComponent implements OnInit {
  playlists: any;
  userId: number;
  faHome = faHome;
  faEnvelope = faEnvelope;
  faCompactDisc = faCompactDisc;
  faUser = faUser;
  faPlus = faPlus;
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }
  getProfile() {
    this.userId = +this.authService.decodedToken.nameid;
    this.router.navigate([`/profile/${this.userId}`]);
  }

}
