import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PlaylistService } from 'src/app/_services/playlist.service';
import { TrackService } from 'src/app/_services/track.service';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss']
})
export class PlaylistComponent implements OnInit {
  tracks: any;
  playlist: any;
  faChevronLeft = faChevronLeft;
  private trackToDelete: any;
  private deleteConfirmationMode: boolean = false;
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
      // console.log(this.tracks);
    }, error => {
      console.log(error);
    });
  }
  backToPlaylistsClick() {
    this.router.navigateByUrl('/library/playlists');
  }

  deleteTrackFromPlaylist() {
    this.playlistService.deleteTrackFromPlaylist(this.trackToDelete.trackId, this.playlist.playlistId).subscribe(response => {
      // console.log(response);
      this.getTracksOfPlaylist();
      this.playlistService.alertify.success("Track removed from playlist");
    }, error => {
      // console.log(error);
      this.playlistService.alertify.error(error);
    });
    
  }

  enableDeleteConfirmationMode(track: any) {
    this.trackToDelete = track;
    this.deleteConfirmationMode = true;
  }
  cancelDeleteConfirmationMode() {
    this.deleteConfirmationMode = false;
  }
  isDeleteConfirmationModeEnabled() {
    return this.deleteConfirmationMode;
  }
}
