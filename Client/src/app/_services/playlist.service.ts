import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AlertifyService } from './alertify.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {
  private creationMode = false;
  baseUrl = environment.apiUrl;
  userPlaylistsUIupdate: EventEmitter<any> = new EventEmitter();
  tracksAddedToPlaylistUpdate: EventEmitter<any> = new EventEmitter();
  private detailedViewMode = false;
  currentPlaylist: any;
  private addTracksMode = false;
  constructor(private http: HttpClient, private authService: AuthService,
    public alertify: AlertifyService) {

    }

  isAddTracksModeEnabled() {
    return this.addTracksMode;
  }

  createPlaylist(model: any) {
    return this.http.post(this.baseUrl + 'playlists/add-playlist-for-user/' + this.authService.decodedToken.nameid, model);
  }
  getPlaylists() {
    return this.http.get(this.baseUrl + 'playlists/get-playlists-of-user/' + this.authService.decodedToken.nameid);
  }
  getPlaylist(playlistId: string) {
    return this.http.get(this.baseUrl + 'playlists/get-playlist/' + playlistId);
  }

  setCurrentPlaylist(playlist: any) {
    this.currentPlaylist = playlist;
  }

  getTracksOfPlaylist(playlistId: string) {
    return this.http.get(this.baseUrl + 'playlists/get-tracks-of-playlist/' + this.authService.decodedToken.nameid +
      '/' + playlistId);
  }

  addTrackToPlaylist(track_id: number, playlist_id: number) {
    const playlistTrack = {
      "trackId": track_id,
      "playlistId": playlist_id
    };
    console.log(playlistTrack);
    return this.http.post(this.baseUrl + 'playlists/add-track-to-playlist/' + this.authService.decodedToken.nameid, playlistTrack);
  }
  addTrackToCommonPlaylist(trackId: number, cpId: number) {
    return this.http.post(this.baseUrl + 'playlists/add-track-to-common-playlist/' + cpId, trackId);
  }

  deleteTrackFromPlaylist(track_id: number, playlist_id: number) {
    const playlistTrack = {
      "trackId": track_id,
      "playlistId": playlist_id
    }
    console.log(playlistTrack);
    return this.http.post(this.baseUrl + 'playlists/delete-track-from-playlist/' + this.authService.decodedToken.nameid, playlistTrack);
  }

  getCommonPlaylists() {
    return this.http.get(environment.apiUrl + 'playlists/get-common-playlists');
  }

  getCommonPlaylist(cpId: number) {
    return this.http.get(environment.apiUrl + 'playlists/get-common-playlist/' + cpId);
  }

  getCommonPlaylistTracks(cpId) {
    return this.http.get(environment.apiUrl + 'playlists/get-common-playlist-tracks/' + cpId);
  }

  createCommonPlaylist(cp) {
    return this.http.post(environment.apiUrl + 'playlists/create-common-playlist', cp);
  }

  deleteCommonPlaylist(cpId) {
    return this.http.delete(environment.apiUrl + 'playlists/delete-common-playlist/' + cpId);
  }

}
