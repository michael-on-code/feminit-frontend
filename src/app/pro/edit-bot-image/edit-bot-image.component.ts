import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {NzMessageService, NzNotificationService} from 'ng-zorro-antd';
import {ApiReturnTypeService} from '../../api-return-type.service';
import {environment} from '../../../environments/environment';

const API_URL = environment.apiUrl;
const UPLOAD_URL = environment.uploadUrl;

@Component({
  selector: 'app-edit-bot-image',
  templateUrl: './edit-bot-image.component.html',
  styleUrls: ['./edit-bot-image.component.css']
})
export class EditBotImageComponent implements OnInit {
  skeletonLoading = true;
  botImageID: any;
  imageData: any = {};
  originImageUrl: string;
  uploadUrl: string;
  submittingIsLoading = false;

  constructor(private http: HttpClient, private router: Router,
              private route: ActivatedRoute, private msg: NzMessageService,
              private notification: NzNotificationService) {
  }

  ngOnInit() {
    this.uploadUrl = UPLOAD_URL;
    this.botImageID = this.route.snapshot.paramMap.get('imageID');
    this.http.post(API_URL + '/botImage/getByID', {botImageID: this.botImageID}).subscribe((p: ApiReturnTypeService) => {
      if (p.status) {
        this.imageData = p.data;
        this.imageData.value =  UPLOAD_URL + this.imageData.value
        this.originImageUrl = this.imageData.value;
        this.skeletonLoading = false;
      } else {
        this.msg.error(p.message);
        this.router.navigate(['/dashboard/chatbot/images']);
      }
    });
  }

  submit(form) {
    if (form.valid) {
      this.submittingIsLoading = true;
      const data = form.value;
      if (this.imageData.value !== this.originImageUrl) {
        data.image = this.imageData.value;
      }
      data.id = this.botImageID;
      this.http.post(API_URL + '/botImage/edit', data).subscribe((p: ApiReturnTypeService) => {
        const status = p.status ? 'success' : 'error';
        this.notification.create(status, 'Notification', p.message, {nzDuration: 10000});
        this.submittingIsLoading = false;
      });
    }
  }

  beforeImageUpload = (file: File) => {
    const validImage = this.controlImage(file);
    if (validImage) {
      this.getBase64(file, (img: string) => {
        this.imageData.value = img;
      });
    }
    return false;
  };

  private getBase64(img: File, callback: (img: {}) => void): void {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }

  controlImage = (file: File) => {
    const isJPGPNG = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJPGPNG) {
      this.msg.error('Vous ne pouvez que téléversez des images au format JPG|PNG');
    }
    const isLt1M = file.size / 1024 / 1024 <= 1;
    if (!isLt1M) {
      this.msg.error('Téléversez des images de taille moins de 1Mo');
    }
    return isJPGPNG && isLt1M;
  }
}
