import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LibraryRoutingModule, PlaylistResolver } from './library-routing.module';
import { LibraryComponent } from './library/library.component';
import { FileUploaderComponent } from './file-uploader/file-uploader.component';
import { FileUploadModule } from 'ng2-file-upload';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LibraryPlaylistsComponent } from './library-playlists/library-playlists.component';
import { PlaylistComponent } from './playlist/playlist.component';
import { AddTracksToPlaylistComponent } from './add-tracks-to-playlist/add-tracks-to-playlist.component';
import { PlaylistCreationComponent } from './playlist-creation/playlist-creation.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    LibraryComponent,
    FileUploaderComponent,
    LibraryPlaylistsComponent,
    PlaylistComponent,
    AddTracksToPlaylistComponent,
    PlaylistCreationComponent
  ],
  imports: [
    CommonModule,
    LibraryRoutingModule,
    FileUploadModule,
    FontAwesomeModule,
    FormsModule
  ],
  providers: [
    PlaylistResolver
  ]
})
export class LibraryModule { }
