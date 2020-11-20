import { Component, OnInit } from '@angular/core';
import { GenreService } from '../_services/genre.service';

@Component({
  selector: 'app-rightBar',
  templateUrl: './rightBar.component.html',
  styleUrls: ['./rightBar.component.css']
})
export class RightBarComponent implements OnInit {
  genres: any;
  genreOfTheDay: any;
  constructor(public genreService: GenreService) { }

  ngOnInit() {
    this.getGenres();
    console.log(this.genres);
    this.getGenreOfTheDay();
    this.genreService.genreOfTheDayUpdate.subscribe(() => {
      this.getGenreOfTheDay();
    });
  }

  getGenres(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.genreService.getGenres().subscribe(
        (genres) => {
          resolve(this.genres = genres);
        },
        (error) => {
          reject(console.log(error));
        }
      );
    });
  }

  getGenreOfTheDay(){
    this.genreService.getGenreOfTheDay().subscribe(response => {
      // console.log(response);
      this.genreOfTheDay = response;
    }, error => {
      console.log(error);
    });
  }
}
