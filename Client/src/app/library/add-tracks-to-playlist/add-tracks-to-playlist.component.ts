import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  playlist: any;
  tracksOfPlaylist: any;
  constructor(public trackService: TrackService, public playlistService: PlaylistService, private router: Router,
    private location: Location, private alertify: AlertifyService, private route: ActivatedRoute) { }

  ngOnInit() {
    
    this.route.parent.data.subscribe(response => {
      this.playlist = response.playlist;
      // console.log(this.playlist);
      this.getTracksOfPlaylist();
      // console.log(this.tracksOfPlaylist);
      // this.getTracks();
    }, error => {
      console.log(error);
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
    this.playlistService.getTracksOfPlaylist(this.playlist.playlistId).subscribe(response => {
      this.tracksOfPlaylist = response;
      console.log(this.tracksOfPlaylist);
      this.getTracks();
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

  isTrackOnPlaylist(track: any){
    if(this.tracksOfPlaylist.some(t => t.trackId === track.trackId)){
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
    if(this.tracksOfPlaylist.some(t => t.trackId === track.trackId)){
      console.log(true);
      
    }
    else{
      console.log(false);
    }
  }
}
