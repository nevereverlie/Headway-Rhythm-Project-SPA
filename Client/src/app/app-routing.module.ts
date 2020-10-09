import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminGenresComponent } from './admin-genres/admin-genres.component';
import { FileUploaderComponent } from './file-uploader/file-uploader.component';
import { HomeComponent } from './home/home.component';


export const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'upload', component: FileUploaderComponent},
  {path: 'genres', component: AdminGenresComponent}
];






@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
