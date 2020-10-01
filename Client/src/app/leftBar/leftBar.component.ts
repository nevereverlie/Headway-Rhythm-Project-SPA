import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-leftBar',
  templateUrl: './leftBar.component.html',
  styleUrls: ['./leftBar.component.css']
})
export class LeftBarComponent implements OnInit {
  playlists: any;
  constructor() { }

  ngOnInit() {

  }

}
