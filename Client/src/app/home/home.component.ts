import { Component, OnInit, Inject, Input } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { GenreService } from '../_services/genre.service';
import { TrackService } from '../_services/track.service';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Genre } from '../models/Genre';
import { ProfileService } from '../_services/profile.service';
import { AuthService } from '../_services/auth.service';

export interface TrackForUpdate {
  trackId: number;
  trackName: string;
  performerName: string;
  trackYear: number;
  trackGenres: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})

export class HomeComponent implements OnInit {
  @Input() tracks: any;
  genres: any;
  selectedGenre: any;
  firstDate: number;
  secondDate: number;
  trackForUpdate: TrackForUpdate = {
    trackId: 0,
    trackName: '',
    trackYear: 0,
    performerName: '',
    trackGenres: ''
  };
  closeResult: any;
  userId: any;
  user: any;

  constructor(
    public trackService: TrackService,
    public genreService: GenreService,
    public userService: ProfileService,
    public authService: AuthService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.userId = +this.authService.decodedToken.nameid;
    this.getTracks();
    this.getGenres();
    this.getUser(this.userId);
  }

  getUser(userId: number) {
    this.userService.getUser(userId).subscribe(user => {
      this.user = user;
    }, error => {
      console.log(error);
    });
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

  removeFilters(): void {
    this.getTracks();
    this.firstDate = undefined;
    this.secondDate = undefined;
    this.selectedGenre = undefined;
  }

  private filterByGenreAndYear(track: any, filteredTracks: any[]): void {
    const genres = track.genresOfTrack;
    genres.forEach(genre => {
      if (
        genre.genreName === this.selectedGenre &&
        track.trackYear >= this.firstDate &&
        track.trackYear <= this.secondDate
      ) {
        filteredTracks.push(track);
      }
    });
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
    const genres = track.genresOfTrack;
    genres.forEach(genre => {
      if (genre.genreName === this.selectedGenre) {
        filteredTracks.push(track);
      }
    });
    this.tracks = filteredTracks;
  }

  updateTrack(): void {
    this.trackService.updateTrack(this.trackForUpdate).subscribe(() => {
      this.getTracks();
    }, error => {
      console.log(error);
    });
  }

  openDialog(track: any): void {
    this.trackForUpdate.trackId = track.trackId;
    this.trackForUpdate.trackName = track.trackName;
    this.trackForUpdate.performerName = track.performerName;
    this.trackForUpdate.trackYear = track.trackYear;

    const genres = Array<string>();
    for (const trackGenre of track.genresOfTrack) {
      genres.push(trackGenre.genreName);
    }
    this.trackForUpdate.trackGenres = genres.join(',');

    console.log(this.trackForUpdate);
    const dialogRef = this.dialog.open(TrackEditingDialogOverview, {
      width: '250px',
      data: {TrackForUpdate: this.trackForUpdate}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
      if (result !== undefined) {
        this.trackForUpdate.trackName = result.trackName;
        this.trackForUpdate.performerName = result.performerName;
        this.trackForUpdate.trackYear = result.trackYear;
        this.trackForUpdate.trackGenres = result.trackGenres.join(',');
      }
      console.log(this.trackForUpdate);

      this.updateTrack();
    });
  }

  deleteTrack(track): void {
    if (confirm('This operation will DELETE track \"' + track.trackName + ' - ' + track.performerName + '\". Continue?')) {
      this.trackService.deleteTrack(track.trackId).subscribe((response) => {
        console.log('Track with ID: ' + track.trackId + ' deleted!');
        this.getTracks();
      }, error => {
        console.log(error);
      });
    }
  }
}

@Component({
  selector: 'track-editing-dialog-overview',
  templateUrl: 'track-editing-dialog-overview.html',
})
export class TrackEditingDialogOverview {
  genres = new FormControl();
  genresList: Genre[] = [];

  constructor(
    public genreService: GenreService,
    public dialogRef: MatDialogRef<TrackEditingDialogOverview>,
    @Inject(MAT_DIALOG_DATA) public data: TrackForUpdate) {}

  onCancelClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.getGenres();
  }

  getGenres() {
    return this.genreService.getGenres().subscribe(genres => {
      genres.forEach(genre => {
        this.genresList.push(genre);
      });
    });
  }

}
