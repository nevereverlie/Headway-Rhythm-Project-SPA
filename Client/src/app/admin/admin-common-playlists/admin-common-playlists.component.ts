import { Component, OnInit, Output } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PlaylistService } from 'src/app/_services/playlist.service';

export interface CommonPlaylist {
  commonPlaylistId: number;
  commonPlaylistName: string;
}

@Component({
  selector: 'app-admin-common-playlists',
  templateUrl: './admin-common-playlists.component.html',
  styleUrls: ['./admin-common-playlists.component.css']
})
export class AdminCommonPlaylistsComponent implements OnInit {
  closeResult: any;
  updateMode: boolean = false;

  constructor(private modalService: NgbModal, public playlistService: PlaylistService) { }
  commonPlaylists: any;
  @Output() commonPlaylistForCreation: CommonPlaylist = {
    commonPlaylistId: 0,
    commonPlaylistName: 'New CP'
  };

  ngOnInit() {
    this.getCommonPlaylists();
  }

  getCommonPlaylists() {
    this.playlistService.getCommonPlaylists().subscribe(cp => {
      this.commonPlaylists = cp;
    }, error => {
      console.log(error);
    });
  }

  createCommonPlaylist(cp) {
    console.log(cp);
    this.playlistService.createCommonPlaylist(cp).subscribe(response => {
      if (response) {
        this.getCommonPlaylists();
        alert('Common playlist \'' + cp.commonPlaylistName + '\' created successfully!');
      }
    }, error => {
      console.log(error);
    });
  }


  
  deleteCommonPlaylist(cpId: number) {
    if (confirm('This playlist will be deleted, continue?')) {
      this.playlistService.deleteCommonPlaylist(cpId).subscribe(() => {
        this.getCommonPlaylists();
        alert('Common playlist with ID: ' + cpId + ' deleted!');
      }, error => {
        console.log(error);
      });
    }
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

}
