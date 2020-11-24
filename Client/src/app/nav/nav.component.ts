import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faChevronLeft, faChevronRight, faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import { AlertifyService } from '../_services/alertify.service';
import { AuthService } from '../_services/auth.service';
import { TrackService } from '../_services/track.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = localStorage.getItem('username');
  faChevronLeft = faChevronLeft;
  faChevronRight = faChevronRight;
  faSignInAlt = faSignInAlt;

  constructor(public trackService: TrackService,
              private router: Router,
              public authService: AuthService,
              private alertify: AlertifyService) { }

  ngOnInit() {
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['']);
    this.alertify.message('Logged Out');
  }

  loggedIn() {
    return this.authService.loggedIn();
  }

  searchInputKeyUpListener(event: any) {
    if (event.keyCode === 13){
      const input = event.target as HTMLInputElement;
      const inputString = input.value;
      //this.getTracksBySearchString(inputString);

      this.router.navigate(['/search/', inputString]);
    }
  }

  getTracksBySearchString(input: string) {
    this.trackService.getTracksBySearchString(input).subscribe(response => {
      console.log(response);
    }, error => {
      console.log(error);
    });
  }
}
