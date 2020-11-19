import { Injectable, NgModule } from '@angular/core';
import { Routes, RouterModule, Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AdminGenresComponent } from './admin/admin-genres/admin-genres.component';
import { HomeComponent } from './home/home.component';
import { SearchComponent } from './search/search.component';
import { TrackService } from './_services/track.service';
import { catchError } from 'rxjs/operators';
import { LoginRegisterFormComponent } from './login-register-form/login-register-form.component';
import { AdminComponent } from './admin/admin.component';


@Injectable()
export class SearchResolver implements Resolve<any> {
    constructor(private trackService: TrackService,
                private router: Router) {}
    resolve(route: ActivatedRouteSnapshot): Observable<any> {
        return this.trackService.getTracksBySearchString(route.paramMap.get('inputString')).pipe(
            catchError(error => {
                this.router.navigate(['']);
                console.log('error');
                return of(null);
            })
        );
    }
}

export const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginRegisterFormComponent},
  {path: 'admin', component: AdminComponent},
  {path: 'search/:inputString', component: SearchComponent,
        resolve: {data: SearchResolver}
  }
];






@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
