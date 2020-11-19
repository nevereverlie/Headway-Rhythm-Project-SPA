import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {

constructor(private http: HttpClient) { }

  getCommonPlaylists() {
    return this.http.get(environment.apiUrl + 'playlists/get-common-playlists');
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
