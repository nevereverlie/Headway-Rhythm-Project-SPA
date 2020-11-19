import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FileUploadModule } from 'ng2-file-upload';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import { JwtModule } from '@auth0/angular-jwt';
import {MatDialogModule} from '@angular/material/dialog';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatDividerModule} from '@angular/material/divider';

import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import {
  GoogleLoginProvider
} from 'angularx-social-login';
import { AppRoutingModule, SearchResolver } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent, TrackEditingDialogOverview } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { TrackService } from './_services/track.service';
import { LeftBarComponent } from './leftBar/leftBar.component';
import { RightBarComponent } from './rightBar/rightBar.component';
import { BottomMobileNavComponent } from './bottomMobileNav/bottomMobileNav.component';
import { BottomPlayerComponent } from './bottomPlayer/bottomPlayer.component';
import { AdminGenresComponent } from './admin/admin-genres/admin-genres.component';
import { AdminProfilesComponent } from './admin/admin-profiles/admin-profiles.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchComponent } from './search/search.component';
import { ProfileModule } from './profile/profile.module';
import { LoginRegisterFormComponent } from './login-register-form/login-register-form.component';
import { AuthService } from './_services/auth.service';
import { LibraryModule } from './library/library.module';
import { environment } from 'src/environments/environment';
import { GenreService } from './_services/genre.service';
import { PlaylistService } from './_services/playlist.service';
import { ProfileService } from './_services/profile.service';
import { AdminCommonPlaylistsComponent } from './admin/admin-common-playlists/admin-common-playlists.component';
import { AdminComponent } from './admin/admin.component';


export function tokenGetter() {
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    LeftBarComponent,
    RightBarComponent,
    BottomMobileNavComponent,
    BottomPlayerComponent,
    AdminGenresComponent,
    SearchComponent,
    LoginRegisterFormComponent,
    AdminProfilesComponent,
    TrackEditingDialogOverview,
    AdminCommonPlaylistsComponent,
    AdminComponent
  ],
  imports: [
    ProfileModule,
    LibraryModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FontAwesomeModule,
    FileUploadModule,
    SocialLoginModule,
    BsDropdownModule.forRoot(),
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    ProfileModule,
    MatSelectModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    JwtModule.forRoot({
      config : {
         tokenGetter: tokenGetter,
         allowedDomains: ['localhost:5001', 'https://hrp-api.herokuapp.com'],
         disallowedRoutes: ['localhost:5001/api/auth', 'https://hrp-api.herokuapp.com/api/auth']
      }
   })
    MatDialogModule,
    MatExpansionModule,
    MatDividerModule
  ],
  providers: [
    TrackService,
    SearchResolver,
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '802554202444-km7ba5p0tssq4nm9j0mibcvadiv3iens.apps.googleusercontent.com'
            )
          }
        ]
      } as SocialAuthServiceConfig,
    },
    AuthService,
    GenreService,
    PlaylistService,
    ProfileService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
