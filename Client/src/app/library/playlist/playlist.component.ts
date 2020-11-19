import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PlaylistService } from 'src/app/_services/playlist.service';
import { TrackService } from 'src/app/_services/track.service';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss']
})
export class PlaylistComponent implements OnInit {
  tracks: any;
  playlist: any;
  constructor(public playlistService: PlaylistService, public trackService: TrackService, 
    private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.data.subscribe(response => {
      this.playlist = response.playlist;
      this.getTracksOfPlaylist();
    }, error => {
      console.log(error);
    });
    this.playlistService.tracksAddedToPlaylistUpdate.subscribe(() => {
      this.getTracksOfPlaylist();
    });
  }
  getTracksOfPlaylist() {
    this.playlistService.getTracksOfPlaylist(this.playlist.playlistId).subscribe(response => {
      this.tracks = response;
    }, error => {
      console.log(error);
    });
  }
  backToPlaylistsClick() {
    this.router.navigateByUrl('/library/playlists');
  }
}
