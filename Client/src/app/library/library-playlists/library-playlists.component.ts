import { Component, OnInit } from '@angular/core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/_services/auth.service';
import { PlaylistService } from 'src/app/_services/playlist.service';

@Component({
  selector: 'app-library-playlists',
  templateUrl: './library-playlists.component.html',
  styleUrls: ['./library-playlists.component.scss']
})
export class LibraryPlaylistsComponent implements OnInit {
  playlists: any;
  faPlus = faPlus;

  constructor(public playlistService: PlaylistService, private authService: AuthService) {
     }

  ngOnInit() {
    this.playlistService.userPlaylistsUIupdate.subscribe(() => {
      this.getPlaylists();
    });
    if (this.authService.loggedIn()) {
      this.getPlaylists();
    }
  }

  getPlaylists() {
    this.playlistService.getPlaylists().subscribe(response => {
      this.playlists = response;
    }, error => {
      console.log(error);
    });
  }
}