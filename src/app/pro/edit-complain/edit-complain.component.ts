import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {environment} from '../../../environments/environment';
import {ApiReturnTypeService} from '../../api-return-type.service';
import {NzMessageService, NzNotificationService, UploadFile} from 'ng-zorro-antd';
import {SharedService} from '../../shared.service';
import {NgxEditorModule} from 'ngx-editor';
import {ApiMonsterService} from '../../api-monster.service';

const API_URL = environment.apiUrl;

@Component({
  selector: 'app-edit-complain',
  templateUrl: './edit-complain.component.html',
  styleUrls: ['./edit-complain.component.css']
})

export class EditComplainComponent implements OnInit {

  complainID: any;
  skeletonLoading = true;
  submittingIsLoading = false;
  fileList: UploadFile[] = [];
  updateData: any = [];
  wysiwygConfig = {
    'editable': true,
    'spellcheck': true,
    'height': 'auto',
    'minHeight': '0',
    'width': 'auto',
    'minWidth': '0',
    'translate': 'yes',
    'enableToolbar': true,
    'showToolbar': true,
    'placeholder': 'Enter text here...',
    'imageEndPoint': '',
    'toolbar': [
      ['bold', 'italic', 'underline', 'strikeThrough', 'superscript', 'subscript'],
      ['fontName', 'fontSize', 'color'],
      ['justifyLeft', 'justifyCenter', 'justifyRight', 'justifyFull', 'indent', 'outdent'],
      ['delete', 'removeFormat', 'undo'],
      ['paragraph', 'blockquote', 'removeBlockquote', 'horizontalLine', 'orderedList', 'unorderedList'],
    ]
  };

  constructor(private http: HttpClient, private route: ActivatedRoute, private api: ApiMonsterService,
              private notification: NzNotificationService,
              private msg: NzMessageService, private router: Router, private sharer: SharedService) {
  }

  ngOnInit() {
    this.complainID = this.route.snapshot.paramMap.get('complainID');
    console.log(this.sharer);
    this.api.getComplainForUpdate(this.complainID, this.sharer).subscribe(
      (p: ApiReturnTypeService) => {
        if (p.status) {
          this.updateData = p.data;
          this.skeletonLoading = false;
        } else {
          this.msg.error(p.message);
          this.router.navigate(['/dashboard/complaints']);
        }
      });
  }

  getDescription() {
    if (this.updateData) {
      return this.updateData.description;
    }
  }

  submit(form) {
    if (form.valid) {
      this.submittingIsLoading = true;
      const data = form.value;
      const formData = new FormData();
      this.fileList.forEach((file: any) => {
        formData.append('files[]', file);
      });
      formData.append('description', form.value.description);
      formData.append('complainID', this.complainID);
      // @ts-ignore
      formData.append('userID', this.sharer.userData.id);
      this.http.post(API_URL + '/complain/setModeratorUpdate', formData).subscribe(
        (p: ApiReturnTypeService) => {
          if (p.status) {
            this.notification.success('Notification', p.message, {nzDuration: 10000});
            this.router.navigate(['/dashboard/complaints/view/' + this.complainID]);
          } else {
            this.notification.error('Notification', p.message, {nzDuration: 10000});
          }
          this.submittingIsLoading = false;
        }
      );
    }
  }

  beforeImageUpload = (file: UploadFile) => {
    this.fileList.push(file);
    return false;
  };

  private getBase64(img: File, callback: (img: {}) => void): void {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }

  controlImage = (file: UploadFile) => {
    const possibleExtensions = [
      'image/jpeg', 'image/png'
    ];
    const isValid = possibleExtensions.indexOf(file.type) !== -1;
    if (!isValid) {
      this.msg.error('Téléversez des fichiers aux formats valides');
    }
    /*const isLt1M = file.size / 1024 / 1024 <= 1;
    if (!isLt1M) {
      this.msg.error('Téléversez des images de taille moins de 1Mo');
    }*/
    return isValid;
  }

}
