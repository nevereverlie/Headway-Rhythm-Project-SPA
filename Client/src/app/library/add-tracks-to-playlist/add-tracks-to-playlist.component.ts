import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PlaylistService } from 'src/app/_services/playlist.service';
import { TrackService } from 'src/app/_services/track.service';
import { Location } from '@angular/common';
import { AlertifyService } from 'src/app/_services/alertify.service';

@Component({
  selector: 'app-add-tracks-to-playlist',
  templateUrl: './add-tracks-to-playlist.component.html',
  styleUrls: ['./add-tracks-to-playlist.component.scss']
})
export class AddTracksToPlaylistComponent implements OnInit {
  tracks: any;

  constructor(public trackService: TrackService, public playlistService: PlaylistService, private router: Router,
    private location: Location, private alertify: AlertifyService) { }

  ngOnInit() {
    this.getTracks();
  }

  getTracks() {
    this.trackService.getTracks().subscribe(response => {
      this.tracks = response;
    }, error => {
      console.log(error);
    });
  }

  addTrackToPlaylist(trackId: number, playlistId: number) {
    this.playlistService.addTrackToPlaylist(trackId, playlistId).subscribe(response => {
      console.log(response);
    }, error => {
      console.log(error);
      this.alertify.error(error);
    });
  }

  close() {
    this.playlistService.tracksAddedToPlaylistUpdate.emit();
    this.location.back();
  }
}
