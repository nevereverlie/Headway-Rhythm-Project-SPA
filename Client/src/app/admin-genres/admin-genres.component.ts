import { Component, OnInit } from '@angular/core';
import { GenreService } from '../_services/genre.service';

@Component({
  selector: 'app-admin-genres',
  templateUrl: './admin-genres.component.html',
  styleUrls: ['./admin-genres.component.css']
})
export class AdminGenresComponent implements OnInit {
  genres: any;

  constructor(private genreService: GenreService) { }

  ngOnInit() {
    this.getGenres();
  }

  getGenres() {
    this.genreService.getGenres().subscribe(responseGenres => {
      this.genres = responseGenres;
    });
  }
}
