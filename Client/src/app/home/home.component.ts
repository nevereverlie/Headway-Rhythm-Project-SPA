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

  constructor(
    public trackService: TrackService,
    public genreService: GenreService
  ) {}

  ngOnInit() {
    this.getTracks();
    this.getGenres();
  }

  getTracks() {
    return new Promise((resolve, reject) => {
      this.trackService.getTracks().subscribe(
        (response) => {
          console.log(response);
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

  applyFilters() {
    if (this.selectedGenre !== undefined) {
      this.getTracks().then(() => {
        const filteredTracks = [];
        this.tracks.forEach((track) => {
          for (const [key, trackGenres] of Object.entries(track)) {
            if (key === 'trackGenres') {
              const trackGenre = trackGenres;
              if (typeof trackGenre === 'object') {
                for (const key in trackGenre) {
                  if (Object.prototype.hasOwnProperty.call(trackGenre, key)) {
                    const genres = trackGenre[key];
                    if (genres.genre.genreName === this.selectedGenre) {
                      filteredTracks.push(track);
                    }
                  }
                }
              }
            }
          }
          this.tracks = filteredTracks;
        });
      });
    }
  }

  getTrackGenres() {

  }
}
