import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FileUploadModule } from 'ng2-file-upload';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown'; 

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { TrackService } from './_services/track.service';
import { LeftBarComponent } from './leftBar/leftBar.component';
import { RightBarComponent } from './rightBar/rightBar.component';
import { BottomMobileNavComponent } from './bottomMobileNav/bottomMobileNav.component';
import { FileUploaderComponent } from './file-uploader/file-uploader.component';
import { BottomPlayerComponent } from './bottomPlayer/bottomPlayer.component';
import { AdminGenresComponent } from './admin-genres/admin-genres.component';

@NgModule({
  declarations: [				
    AppComponent,
    NavComponent,
    HomeComponent,
    LeftBarComponent,
    RightBarComponent,
    BottomMobileNavComponent,
    FileUploaderComponent,
      BottomPlayerComponent,
      AdminGenresComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FontAwesomeModule,
    FileUploadModule,
    BsDropdownModule.forRoot()
  ],
  providers: [
    TrackService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
