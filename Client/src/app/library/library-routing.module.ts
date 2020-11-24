import { Injectable, NgModule } from '@angular/core';
import { Routes, RouterModule, Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthGuard } from '../_guards/auth.guard';
import { AlertifyService } from '../_services/alertify.service';
import { PlaylistService } from '../_services/playlist.service';
import { AddTracksToPlaylistComponent } from './add-tracks-to-playlist/add-tracks-to-playlist.component';
import { FileUploaderComponent } from './file-uploader/file-uploader.component';
import { LibraryPlaylistsComponent } from './library-playlists/library-playlists.component';
import { LibraryComponent } from './library/library.component';
import { PlaylistCreationComponent } from './playlist-creation/playlist-creation.component';
import { PlaylistComponent } from './playlist/playlist.component';

@Injectable()
export class PlaylistResolver implements Resolve<any> {
    constructor(private playlistService: PlaylistService, private alertify: AlertifyService, 
        private router: Router) {}
    resolve(route: ActivatedRouteSnapshot): Observable<any> {
        return this.playlistService.getPlaylist(route.paramMap.get('playlistId')).pipe(
            catchError(error => {
                this.alertify.error('Problem retrieving playlist');
                this.router.navigate(['library/playlists']);
                console.log('error');
                return of(null);
            })
        );
    }
}

const routes: Routes = [
  {path: 'library', component: LibraryComponent,
      runGuardsAndResolvers: 'always',
      canActivate: [AuthGuard],
      children: [
          {path: 'upload', component: FileUploaderComponent
          },
          {path: 'playlists', component: LibraryPlaylistsComponent,
              children: [
                  {path: 'create', component: PlaylistCreationComponent}
              ]
          },
          {path: 'playlists/:playlistId', component: PlaylistComponent,
              resolve: {playlist: PlaylistResolver},
              children: [
                  {path: 'addtracks', component: AddTracksToPlaylistComponent
                  }
              ]
          }
          // {path: 'playlists', component: LibraryPlaylistsComponent,
          //     children: [
          //         {path: 'create', component: PlaylistCreationComponent}
          //     ]
          // },
          // {path: 'playlists/:playlistId', component: PlaylistComponent,
          //     resolve: {playlist: PlaylistResolver},
          //     children: [
          //         {path: 'addtracks', component: AddTracksToPlaylistComponent}
          //     ]
          // },
          // {path: 'songs', component: LibraryTracksComponent},
          // {path: 'upload', component: FileUploaderComponent}
      ]
  }
];

@NgModule({
imports: [RouterModule.forChild(routes)],
exports: [RouterModule]
})
export class LibraryRoutingModule { }
