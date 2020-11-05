import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Genre } from '../models/Genre';

@Injectable({
  providedIn: 'root'
})
export class GenreService {
  baseUrl = environment.apiUrl;
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

}
