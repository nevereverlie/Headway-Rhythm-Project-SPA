import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';
import { ProfileService } from 'src/app/_services/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss', '../profileStyles.scss']
})
export class ProfileComponent implements OnInit {
  user: any;
  userId: number;

  constructor(private route: ActivatedRoute, public profileService: ProfileService, private authService: AuthService) { }

  ngOnInit() {
    this.userId = +this.authService.decodedToken.nameid;
    this.route.data.subscribe(data => {
      this.user = data.profile;
    }, error => {
      console.log(error);
    });
  }

  getUser() {
    console.log(this.userId);
    this.profileService.getUser(this.userId).subscribe(response => {
      this.user = response;
      console.log(this.user);
    }, error => {
      console.log(error);
    });
  }
}
