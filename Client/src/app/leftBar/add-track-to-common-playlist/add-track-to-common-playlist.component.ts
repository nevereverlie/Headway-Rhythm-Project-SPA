import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { PlaylistService } from 'src/app/_services/playlist.service';
import { TrackService } from 'src/app/_services/track.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-add-track-to-common-playlist',
  templateUrl: './add-track-to-common-playlist.component.html',
  styleUrls: ['./add-track-to-common-playlist.component.scss']
})
export class AddTrackToCommonPlaylistComponent implements OnInit {
  tracks: any;
  commonPlaylist: any;
  pid: number;
  playlistTracks: any;
  constructor(public trackService: TrackService, public playlistService: PlaylistService,
              private location: Location, private alertify: AlertifyService, private route: ActivatedRoute) { }

  ngOnInit() {
      this.getCurrentPlaylist();
      this.getTracksOfPlaylist();
  }

  getCurrentPlaylist(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.pid = this.route.snapshot.params['cpId'];
      this.playlistService.getCommonPlaylist(this.pid).subscribe((cp) => {
        resolve(this.commonPlaylist = cp);
        console.log(this.commonPlaylist);
      }, error => {
        reject(this.alertify.error(error));
      });
    });
  }

  getTracks() {
    this.trackService.getTracks().subscribe(response => {
      this.tracks = response;
    }, error => {
      console.log(error);
    });
  }

  getTracksOfPlaylist() {
    this.playlistService.getCommonPlaylistTracks(this.pid).subscribe(response => {
      this.playlistTracks = response;
      this.getTracks();
    }, error => {
      console.log(error);
    });
  }

  addTrackToPlaylist(trackId: number, playlistId: number) {
    this.playlistService.addTrackToCommonPlaylist(trackId, playlistId).subscribe(response => {
      this.getTracksOfPlaylist();
      this.alertify.success('Track added to common playlists');
    }, error => {
      this.alertify.error(error);
    });
  }

  isTrackOnPlaylist(track: any){
    if (this.playlistTracks.some(t => t.trackId === track.trackId)) {
      return true;
    }

    return false;
  }

  close() {
    this.playlistService.tracksAddedToPlaylistUpdate.emit();
    this.location.back();
  }

  clickS(track: any){
    console.log(track);
    if(this.playlistTracks.some(t => t.trackId === track.trackId)){
      console.log(true);

    }
    else{
      console.log(false);
    }
  }
}
