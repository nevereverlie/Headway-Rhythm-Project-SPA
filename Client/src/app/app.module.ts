import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FileUploadModule } from 'ng2-file-upload';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';

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
import { FileUploaderComponent } from './file-uploader/file-uploader.component';
import { BottomPlayerComponent } from './bottomPlayer/bottomPlayer.component';
import { AdminGenresComponent } from './admin/admin-genres/admin-genres.component';
import { AdminProfilesComponent } from './admin/admin-profiles/admin-profiles.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchComponent } from './search/search.component';
import { ProfileModule } from './profile/profile.module';
import { LoginRegisterFormComponent } from './login-register-form/login-register-form.component';
import { AuthService } from './_services/auth.service';


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
    FileUploaderComponent,
    BottomPlayerComponent,
    AdminGenresComponent,
    SearchComponent,
    LoginRegisterFormComponent,
    AdminProfilesComponent,
    TrackEditingDialogOverview
  ],
  imports: [
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
    MatDialogModule
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
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
