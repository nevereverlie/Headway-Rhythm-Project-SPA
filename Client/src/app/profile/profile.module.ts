import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileResolver, ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile/profile.component';
import { FormsModule } from '@angular/forms';
import { ProfileUpdateComponent } from './profileUpdate/profileUpdate.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ProfileRoutingModule
  ],
  declarations: [
    ProfileComponent,
    ProfileUpdateComponent
  ],
  providers: [
    ProfileResolver
  ]
})
export class ProfileModule { }
