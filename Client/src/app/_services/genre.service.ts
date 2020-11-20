import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Genre } from '../models/Genre';

@Injectable({
  providedIn: 'root'
})
export class GenreService {
  baseUrl = environment.apiUrl;
  genreOfTheDayUpdate: EventEmitter<any> = new EventEmitter();
  constructor(private http: HttpClient) { }

  getGenres(): Observable<Genre[]> {
    return this.http.get<Genre[]>(this.baseUrl + 'genres');
  }

  createGenre(genreForCreation: Genre) {
    console.log(typeof(genreForCreation));
    return this.http.post<Genre>(this.baseUrl + 'genres/create', genreForCreation);
  }

  updateGenre(genreForUpdate: Genre) {
    return this.http.put<Genre>(this.baseUrl + 'genres/update', genreForUpdate);
  }

  deleteGenre(id: number) {
    return this.http.delete(this.baseUrl + 'genres/delete/' + id);
  }

  getGenreOfTheDay(){
    return this.http.get(this.baseUrl + 'genres/get-genre-of-the-day');
  }

  updateGenreOfTheDay(genreId: any){
    return this.http.put(this.baseUrl + 'genres/update-genre-of-the-day/' + genreId, genreId);
  }
}
