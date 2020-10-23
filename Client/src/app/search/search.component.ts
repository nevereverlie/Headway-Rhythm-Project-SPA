import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TrackService } from '../_services/track.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  tracks: any = {};
  searchString: any;
  constructor(private route: ActivatedRoute, public trackService: TrackService) { }

  ngOnInit() {
    this.route.data.subscribe(response => {
      this.tracks = response.data;
    }, error => {
      console.log(error);
    });
    this.searchString = this.route.snapshot.paramMap.get('inputString');
  }

}
