import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FileUploaderComponent } from './file-uploader/file-uploader.component';
import { HomeComponent } from './home/home.component';


export const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'upload', component: FileUploaderComponent}
];






@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
