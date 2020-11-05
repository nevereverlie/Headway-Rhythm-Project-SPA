import { Component, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/_services/auth.service';
import { ProfileService } from 'src/app/_services/profile.service';

@Component({
  selector: 'app-admin-profiles',
  templateUrl: './admin-profiles.component.html',
  styleUrls: ['./admin-profiles.component.css']
})
export class AdminProfilesComponent implements OnInit {
  updateMode: boolean = false;
  closeResult: any;
  users: any;
  usersForUpdate: any;

  constructor(private modalService: NgbModal, public usersService: ProfileService) { }

  ngOnInit() {
    this.getUsers();
    this.getUsersForUpdate();
  }

  changeUpdateMode() {
    this.updateMode = !this.updateMode;
  }

  open(content) {
    const modalRef = this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  openVerticallyCentered(content) {
    this.modalService.open(content, { centered: true , windowClass: 'dark-modal'});
  }

  getUsers() {
    this.usersService.getUsers().subscribe(response => {
      this.users = response;
    });
  }
  getUsersForUpdate() {
    this.usersService.getUsers().subscribe(r => {
      this.usersForUpdate = r;
    });
  }

  updateProfiles() {
    let isChanging = Boolean(false);
    try {
      const div = document.getElementById('form');
      const inputs = div.getElementsByTagName('input');
      console.log(inputs);

      for (let index = 0; index < inputs.length; index++) {
        if (inputs[index].value.toString() !== "") {
          isChanging = true;
          this.usersForUpdate[index].username = inputs[index].value.toString();
          console.log(this.usersForUpdate);
        }
      }

      if (isChanging) {
        for (let i = 0; i < this.users.length; i++) {
          if (this.users[i].genreName !== this.usersForUpdate[i].username) {
            const newUser = this.usersForUpdate[i];
            console.log(newUser);
            const form = new FormData();
            form.append('UserId', newUser.userId);
            form.append('Username', newUser.username.toLowerCase());
            this.usersService.updateProfile(form).subscribe(() => { }, error => {
              console.log(error);
            });
          }
        }
        alert('Update successfull');
        this.getUsers();
      }
    } catch (e) {
      console.log(e);
    }
  }

  deleteUser(userId: number) {
    return this.usersService.deleteUser(userId).subscribe(() => {
      this.getUsers();
      alert('User with ID: ' + userId + ' deleted!');
    });
  }

}
