import { Component, OnInit } from '@angular/core';
import { GenreService } from 'src/app/_services/genre.service';

@Component({
  selector: 'app-admin-genre-of-the-day',
  templateUrl: './admin-genre-of-the-day.component.html',
  styleUrls: ['./admin-genre-of-the-day.component.scss']
})
export class AdminGenreOfTheDayComponent implements OnInit {
  genres: any;
  selectedGenre: any;
  constructor(public genreService: GenreService) { }

  ngOnInit() {
    this.getGenres();
  }

  getGenres() {
    this.genreService.getGenres().subscribe(
      (genres) => {
        this.genres = genres;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  updateButtonClick(){
    // console.log(this.selectedGenre);
    if(this.selectedGenre != undefined){
      this.genreService.updateGenreOfTheDay(this.selectedGenre)
        .subscribe(response => {
          console.log(response);
          this.genreService.genreOfTheDayUpdate.emit();
        }, error => {
          console.log(error);
        });
    }
  }
}
