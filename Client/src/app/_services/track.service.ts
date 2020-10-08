import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TrackService {
  activeTrack: any;
  activeTrackUpdated: EventEmitter<any> = new EventEmitter();
  pauseTrack: EventEmitter<any> = new EventEmitter();
  resumeTrack: EventEmitter<any> = new EventEmitter();
  activeTrackColor = 'rgb(70, 0, 100)';
  userTracksUIupdate: EventEmitter<any> = new EventEmitter();

  constructor(private http: HttpClient) { }

  getTracks() {
    return this.http.get('http://localhost:5001/api/tracks');
  }


  setActiveTrack(track: any) {
    if (this.activeTrack === track){
      this.resumeTrack.emit();
    } else {
      this.activeTrack = track;
      this.activeTrackUpdated.emit(this.activeTrack);
    }
  }
  pauseActiveTrack() {
    this.pauseTrack.emit();
  }

  isTrackActive(track: any) {
    if (track === this.activeTrack) {
      return true;
    } else {
      return false;
    }
  }

  downloadIconMouseOver(e: Event) {
    e.stopPropagation();
  }

  modifyHref(url: string, e: Event, pName: string, tName: string) {
    e.stopPropagation();
    const link = e.currentTarget as HTMLLinkElement;
    const index = url.indexOf('upload/');
    const newLink = url.substring(0, index + 7) + 'fl_attachment:' + pName + ' - '
      + tName + '/' + url.substring(index + 7, url.length);
    // console.log('found' + newLink);
    link.href = newLink;
  }

}
