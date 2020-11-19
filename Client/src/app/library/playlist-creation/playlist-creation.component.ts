import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { PlaylistService } from 'src/app/_services/playlist.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-playlist-creation',
  templateUrl: './playlist-creation.component.html',
  styleUrls: ['./playlist-creation.component.scss']
})
export class PlaylistCreationComponent implements OnInit {
  faTimes = faTimes;
  model: any = {};
  constructor(public playlistService: PlaylistService, private router: Router, private location: Location) { }

  ngOnInit() {
  }
  
  createPlaylist() {
    this.playlistService.createPlaylist(this.model).subscribe(() => {
      console.log('creation success');
      this.playlistService.userPlaylistsUIupdate.emit();
      this.playlistService.getPlaylists();
    }, error => {
      console.log(error);
    });
  }
  close() {
    this.location.back();
  }
}
