import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TrackService } from '../_services/track.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(public trackService: TrackService, private router: Router) { }

  ngOnInit() {
  }

  searchInputKeyUpListener(event: any) {
    if (event.keyCode === 13){
      const input = event.target as HTMLInputElement;
      const inputString = input.value;
      //this.getTracksBySearchString(inputString);

      this.router.navigate(['/search/', inputString]);
    }
  }

  getTracksBySearchString(input: string) {
    this.trackService.getTracksBySearchString(input).subscribe(response => {
      console.log(response);
    }, error => {
      console.log(error);
    });
  }
}
