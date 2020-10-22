import { Component, OnInit } from '@angular/core';
import { rejects } from 'assert';
import { GenreService } from '../_services/genre.service';
import { TrackService } from '../_services/track.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  tracks: any;
  genres: any;
  selectedGenre: any;
  firstDate: number;
  secondDate: number;

  constructor(
    public trackService: TrackService,
    public genreService: GenreService
  ) {}

  ngOnInit() {
    this.getTracks();
    this.getGenres();
  }

  getTracks(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.trackService.getTracks().subscribe(
        (response) => {
          resolve((this.tracks = response));
        },
        (error) => {
          reject(console.log(error));
        }
      );
    });
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

  applyFilters(): void {
    console.log(
      this.firstDate + ' ' + this.secondDate + ' ' + this.selectedGenre
    );
    this.getTracks().then(() => {
      const filteredTracks = [];
      this.tracks.forEach((track) => {
        if (
          this.firstDate !== undefined &&
          this.secondDate !== undefined &&
          this.selectedGenre !== undefined
        ) {
            this.filterByGenreAndYear(track, filteredTracks);
        } else if (this.selectedGenre !== undefined) {
          this.filterByGenre(track, filteredTracks);
        } else if (
          this.firstDate !== undefined &&
          this.secondDate !== undefined
        ) {
          this.filterByYear(track, filteredTracks);
        }
      });
    });
  }

  private filterByGenreAndYear(track: any, filteredTracks: any[]): void {
    const genres = this.unpackGenres(track);
    if (
      genres.genre.genreName === this.selectedGenre &&
      track.trackYear >= this.firstDate &&
      track.trackYear <= this.secondDate
    ) {
      filteredTracks.push(track);
    }
    this.tracks = filteredTracks;
  }

  private filterByYear(track: any, filteredTracks: any[]): void {
    if (
      track.trackYear >= this.firstDate &&
      track.trackYear <= this.secondDate
    ) {
      filteredTracks.push(track);
    }
    this.tracks = filteredTracks;
  }

  private filterByGenre(track: any, filteredTracks: any[]): void {
    const genres = this.unpackGenres(track);
    if (genres.genre.genreName === this.selectedGenre) {
      filteredTracks.push(track);
    }
    this.tracks = filteredTracks;
  }

  private unpackGenres(track: any): any {
    for (const [key, trackGenres] of Object.entries(track)) {
      if (key === 'trackGenres') {
        const trackGenre = trackGenres;
        if (typeof trackGenre === 'object') {
          for (const key in trackGenre) {
            if (Object.prototype.hasOwnProperty.call(trackGenre, key)) {
              const genres = trackGenre[key];
              return genres;
            }
          }
        }
      }
    }
  }
}
