import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileService } from 'src/app/_services/profile.service';

@Component({
  selector: 'app-profileUpdate',
  templateUrl: './profileUpdate.component.html',
  styleUrls: ['./profileUpdate.component.scss', '../profileStyles.scss']
})
export class ProfileUpdateComponent implements OnInit {

  user: any = {};
  userToSend: any = {};
  file: File;
  constructor(public profileService: ProfileService, private router: Router) { }

  ngOnInit() {
    this.getUser();
  }

  getUser() {
    this.profileService.getUser().subscribe(response => {
      this.userToSend = response;
      //console.log(this.userToSend);
    }, error => {
      console.log(error);
    });
  }

  onFileSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.file = file;
    }
    console.log(this.file);
  }

  method(){
    //console.log(this.userToSend);
    console.log(this.file);
  }

  updateProfile(){
    let form = new FormData();
    form.append('UserId', this.userToSend.userId);
    form.append('Username', this.userToSend.username);
    form.append('Description', this.userToSend.description);
    form.append('File', this.file);
    this.profileService.updateProfile(form).subscribe(response => {
      console.log(response);
    }, error => {
     console.log('Failed');
    }, () => {
      this.router.navigate(['/profile']);
    });
  }

  cancelButtonClick(){
    this.router.navigate(['/profile']);
  }
}
