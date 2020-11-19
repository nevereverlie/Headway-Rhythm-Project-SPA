import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faCompactDisc } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { routes } from '../app-routing.module';
import { AuthService } from '../_services/auth.service';
import { PlaylistService } from '../_services/playlist.service';

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
  constructor(public authService: AuthService, private router: Router,
      private playlistService: PlaylistService) { }

  ngOnInit() {
    this.playlistService.userPlaylistsUIupdate.subscribe(() => {
      this.getPlaylists();
    });
    if (this.authService.loggedIn()) {
      this.getPlaylists();
    }
  }
  getProfile() {
    this.userId = +this.authService.decodedToken.nameid;
    this.router.navigate([`/profile/${this.userId}`]);
  }

  getPlaylists() {
    this.playlistService.getPlaylists().subscribe(response => {
      this.playlists = response;
    }, error => {
      console.log(error);
    });
  }
}
