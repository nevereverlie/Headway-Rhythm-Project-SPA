import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { faArrowCircleDown } from '@fortawesome/free-solid-svg-icons';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { faPause } from '@fortawesome/free-solid-svg-icons';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TrackService {
  baseUrl = environment.apiUrl;
  activeTrack: any;
  activeTrackUpdated: EventEmitter<any> = new EventEmitter();
  pauseTrack: EventEmitter<any> = new EventEmitter();
  resumeTrack: EventEmitter<any> = new EventEmitter();
  activeTrackColor = 'rgb(70, 0, 100)';
  userTracksUIupdate: EventEmitter<any> = new EventEmitter();
  faArrowAltCircleDown = faArrowCircleDown;
  faPlay = faPlay;
  faPause = faPause;
  faTimes = faTimes;
  faSearch = faSearch;
  faPlus = faPlus;
  faEllipsisV = faEllipsisV;

  constructor(private http: HttpClient) { }

  getTracks() {
    return this.http.get(this.baseUrl + 'tracks');
  }

  getTracksBySearchString(input: string) {
    return this.http.get(this.baseUrl + 'tracks/search/' + input);
  }

  updateTrack(trackForUpdate: any) {
    return this.http.put(this.baseUrl + 'tracks/update', trackForUpdate);
  }

  deleteTrack(trackId: number) {
    return this.http.delete(this.baseUrl + 'tracks/delete/' + trackId);
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

  trackDivClick(id: string) {
    const trackDiv = document.getElementById(id);
    const trackDivs = document.getElementsByClassName('trackDiv');
    for (let i = 0; i < trackDivs.length; i++) {
      const current = trackDivs[i] as HTMLElement;
      current.style.backgroundColor = 'inherit';
      current.style.borderBottom = '1px solid rgb(45,45,45)';
    }
    trackDiv.style.backgroundColor = this.activeTrackColor;
    trackDiv.style.borderBottom = '1px solid rgb(180, 0, 255)';
  }

  trackDivMouseOver(id: string) {
    const trackDiv = document.getElementById(id);
    if (trackDiv.style.backgroundColor !== this.activeTrackColor) {
      trackDiv.style.backgroundColor = 'rgb(40,40,40)';
    }
  }

  trackDivMouseOut(id: string) {
    const trackDiv = document.getElementById(id);
    if (trackDiv.style.backgroundColor !== this.activeTrackColor) {
      trackDiv.style.backgroundColor = 'inherit';
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
