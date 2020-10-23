import { Component, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { GenreService } from '../_services/genre.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {Genre} from '../models/Genre';

@Component({
  selector: 'app-admin-genres',
  templateUrl: './admin-genres.component.html',
  styleUrls: ['./admin-genres.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class AdminGenresComponent implements OnInit {
  genres: Genre[];
  closeResult: any;
  updateMode: boolean = false;
  @Input() genreForCreation: Genre = {
    genreId: 0,
    genreName: "New Genre"
  };
  genresForUpdate: Genre[];

  constructor(private genreService: GenreService, private modalService: NgbModal) { }

  ngOnInit() {
    this.getGenres();
    this.getGenresForUpdate();
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

  createGenre(genre) {
    console.log(genre);
    this.genreService.createGenre(genre).subscribe(response => {
      if (response) {
        this.getGenres();
        alert('Genre \'' + genre.genreName + '\' created successfully!');
      }
    }, error => {
      console.log(error);
    });
  }

  changeUpdateMode() {
    this.updateMode = !this.updateMode;
  }

  getGenres() {
    this.genreService.getGenres().subscribe(responseGenres => {
      this.genres = responseGenres;
    });
  }
  getGenresForUpdate() {
    this.genreService.getGenres().subscribe(responseGenres => {
      this.genresForUpdate = responseGenres;
    });
  }

  updateGenres() {
    let isChanging = Boolean(false);
    const inputs = document.getElementsByTagName('input');

    for (let index = 0; index < inputs.length - 1; index++) {
      if (inputs[index + 1].value.toString() !== "") {
        isChanging = true;
        this.genresForUpdate[index].genreName = inputs[index + 1].value.toString();
      }
    }

    if (isChanging) {
      for (let i = 0; i < this.genres.length; i++) {
        if (this.genres[i].genreName !== this.genresForUpdate[i].genreName) {
          const newGenre = this.genresForUpdate[i];
          this.genreService.updateGenre(newGenre).subscribe(() => { }, error => {
            console.log(error);
          });
        }
      }
      alert('Update successfull');
      this.getGenres();
    }
  }

  deleteGenre(genreToDelete) {
    this.genreService.deleteGenre(genreToDelete).subscribe(deletedGenre => {
      this.getGenres();
      alert('Genre deleted from the database');
    });
  }
}
