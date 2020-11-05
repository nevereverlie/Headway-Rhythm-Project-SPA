import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Genre } from '../models/Genre';

@Injectable({
  providedIn: 'root'
})
export class GenreService {

  constructor(private http: HttpClient) { }

  getGenres(): Observable<Genre[]> {
    return this.http.get<Genre[]>('http://localhost:5001/api/genres');
  }

  createGenre(genreForCreation: Genre) {
    console.log(typeof(genreForCreation));
    return this.http.post<Genre>('http://localhost:5001/api/genres/create', genreForCreation);
  }

  updateGenre(genreForUpdate: Genre) {
    return this.http.put<Genre>('http://localhost:5001/api/genres/update', genreForUpdate);
  }

  deleteGenre(id: number) {
    return this.http.delete('http://localhost:5001/api/genres/delete/' + id);
  }

}
