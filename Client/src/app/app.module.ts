import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

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

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    LeftBarComponent,
    RightBarComponent,
    BottomMobileNavComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [
    TrackService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
