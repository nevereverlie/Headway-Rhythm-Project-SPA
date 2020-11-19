import { EventEmitter } from '@angular/core';
import { Component, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faCompactDisc } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { routes } from '../app-routing.module';
import { AuthService } from '../_services/auth.service';
import { PlaylistService } from '../_services/playlist.service';
import { TrackService } from '../_services/track.service';

@Component({
  selector: 'app-leftBar',
  templateUrl: './leftBar.component.html',
  styleUrls: ['./leftBar.component.css']
})
export class LeftBarComponent implements OnInit {
  playlists: any;
  playlistTracks: any;
  userId: number;
  faHome = faHome;
  faEnvelope = faEnvelope;
  faCompactDisc = faCompactDisc;
  faUser = faUser;
  faPlus = faPlus;

  constructor(private authService: AuthService,
              private router: Router,
              private playlistService: PlaylistService,
              public trackService: TrackService) { }

  ngOnInit() {
    this.getCommonPlaylists();
  }


  getProfile() {
    this.userId = +this.authService.decodedToken.nameid;
    this.router.navigate([`/profile/${this.userId}`]);
  }

  getCommonPlaylists() {
    this.playlistService.getCommonPlaylists().subscribe((cp) => {
      this.playlists = cp;
      console.log(this.playlists);
    }, error => {
      console.log(error);
    });
  }

  getCommonPlaylistTracks(commonPlaylistId: number) {
    this.playlistService.getCommonPlaylistTracks(commonPlaylistId).subscribe(tracks => {
      this.playlistTracks = tracks;
    }, error => {
      console.log(error);
    });
  }

}
