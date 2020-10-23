import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProfileService } from 'src/app/_services/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss', '../profileStyles.scss']
})
export class ProfileComponent implements OnInit {
  user: any;

  constructor(private route: ActivatedRoute, public profileService: ProfileService) { }

  ngOnInit() {
    //this.getUser();
    this.route.data.subscribe(response => {
      this.user = response.data;
    }, error => {
      console.log(error);
    });
  }

  getUser() {
    this.profileService.getUser().subscribe(response => {
      this.user = response;
      console.log(this.user);
    }, error => {
      console.log(error);
    });
  }
}
