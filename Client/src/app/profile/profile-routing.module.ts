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
        return this.profileService.getUser().pipe(
            catchError(error => {
                this.router.navigate(['']);
                console.log('error');
                return of(null);
            })
        );
    }
}



// const profileRoutes: Routes = [
//   {path: 'profile', component: ProfileComponent,
//     children:[
//       {path: 'update', component: ProfileUpdateComponent, 
//         resolve: {data: ProfileResolver}},
//     ],
//     resolve: {data: ProfileResolver}
//   }
// ];
const profileRoutes: Routes = [
  {path: 'profile', component: ProfileComponent,
    resolve: {data: ProfileResolver}
  },
  {path: 'profile/update', component: ProfileUpdateComponent, 
        resolve: {data: ProfileResolver}
  }
];

@NgModule({
  imports: [RouterModule.forChild(profileRoutes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
