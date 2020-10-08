import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { faBan } from '@fortawesome/free-solid-svg-icons';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { FileUploader } from 'ng2-file-upload';

@Component({
  selector: 'app-file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.scss']
})
export class FileUploaderComponent implements OnInit {

  uploader: FileUploader;
  hasBaseDropZoneOver: boolean;
  baseUrl = environment.apiUrl;
  model: any;
  globalFileIndex = -1;
  faUpload = faUpload;
  faCheckCircle = faCheckCircle;
  faBan = faBan;
  faTimesCircle = faTimesCircle;

  constructor() { }

  ngOnInit() {
    this.initializeUploader();
  }

  fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  initializeUploader() {
    this.uploader = new FileUploader({
      url: this.baseUrl + 'tracks/upload',
      //authToken: 'Bearer ' + localStorage.getItem('token'),
      isHTML5: true,
      allowedFileType: ['audio'],
      removeAfterUpload: false,
      autoUpload: false,
      maxFileSize: 30 * 1024 * 1024
    });

    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };

    this.uploader.onBuildItemForm = (fileItem: any, form: any) => {
      this.globalFileIndex++;
      const i = this.uploader.queue.indexOf(fileItem);
      console.log('index: ' + i);
      const curTrackName = document.getElementById('trackName-' + i) as HTMLInputElement;
      const curPerformerName = document.getElementById('trackPerformer-' + i) as HTMLInputElement;
      form.append('TrackName', curTrackName.value);
      form.append('PerformerName', curPerformerName.value);
    };
  }

}
