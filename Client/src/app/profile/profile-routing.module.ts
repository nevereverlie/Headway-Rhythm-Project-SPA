import { Injectable, NgModule } from '@angular/core';
import { Routes, RouterModule, Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ProfileService } from '../_services/profile.service';
import { TrackService } from '../_services/track.service';
import { ProfileComponent } from './profile/profile.component';
import { ProfileUpdateComponent } from './profileUpdate/profileUpdate.component';

@Injectable()
export class ProfileResolver implements Resolve<any> {
    constructor(private profileService: ProfileService,
                private router: Router) {}
    resolve(route: ActivatedRouteSnapshot): Observable<any> {
        return this.profileService.getUser(+route.paramMap.get('userId')).pipe(
            catchError(error => {
                this.router.navigate(['']);
                console.log(error);
                return of(null);
            })
        );
    }
}

/*@Injectable()
export class ProfileUpdateResolver implements Resolve<any> {
    constructor(private profileService: ProfileService,
                private router: Router) {}
    resolve(route: ActivatedRouteSnapshot): Observable<any> {
        return this.profileService.updateProfile(route.data['profile']).pipe(
            catchError(error => {
                this.router.navigate(['']);
                console.log(error);
                return of(null);
            })
        );
    }
}*/

const profileRoutes: Routes = [
  {path: 'profile/:userId', component: ProfileComponent,
    resolve: {profile: ProfileResolver}
  },
  {path: 'profile/:userId/update', component: ProfileUpdateComponent},
  //   resolve: {profile: ProfileUpdateResolver}
  // }
];

@NgModule({
  imports: [RouterModule.forChild(profileRoutes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
