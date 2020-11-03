import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FileUploadModule } from 'ng2-file-upload';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';

import {
  SocialLoginModule,
  SocialAuthServiceConfig,
  GoogleLoginProvider,
  SocialAuthService
} from 'angularx-social-login';
import { AppRoutingModule, SearchResolver } from './app-routing.module';
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
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { SearchComponent } from './search/search.component';
import { ProfileModule } from './profile/profile.module';
import { ProfileUpdateComponent } from './profile/profileUpdate/profileUpdate.component';
import { LoginRegisterFormComponent } from './login-register-form/login-register-form.component';
import { AuthService } from './_services/auth.service';

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
      LoginRegisterFormComponent
   ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FontAwesomeModule,
    FileUploadModule,
    SocialLoginModule,
    BsDropdownModule.forRoot(),
    NgbModule,
    FormsModule,
    ProfileModule,
    MatSelectModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule
  ],
  providers: [
    TrackService,
    SearchResolver,
    SocialAuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
