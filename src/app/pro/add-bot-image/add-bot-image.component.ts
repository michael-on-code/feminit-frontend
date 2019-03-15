import {Component, OnInit} from '@angular/core';
import {NzMessageService, NzNotificationService} from 'ng-zorro-antd';
import {ApiReturnTypeService} from '../../api-return-type.service';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

const API_URL = environment.apiUrl;

@Component({
  selector: 'app-add-bot-image',
  templateUrl: './add-bot-image.component.html',
  styleUrls: ['./add-bot-image.component.css']
})
export class AddBotImageComponent implements OnInit {

  imageUrl: string;
  submittingIsLoading = false;

  constructor(private msg: NzMessageService, private http: HttpClient,
              private notification: NzNotificationService, private route: Router) {
  }

  ngOnInit() {
  }

  submit(form) {
    if (form.valid && this.imageUrl) {
      this.submittingIsLoading = true;
      const data = form.value;
      data.image = this.imageUrl;
      this.http.post(API_URL + '/botImage/add', data).subscribe((p: ApiReturnTypeService) => {
        console.log(p);
        const status = p.status ? 'success' : 'error';
        this.notification.create(status, 'Notification', p.message, {nzDuration: 10000});
        if (p.status) {
          this.route.navigate(['dashboard/chatbot/images/edit/' + p.data]);
        }
        this.submittingIsLoading = false;
      });
    }
  }

  beforeImageUpload = (file: File) => {
    const validImage = this.controlImage(file);
    if (validImage) {
      this.getBase64(file, (img: string) => {
        this.imageUrl = img;
      });
    }
    return false;
  }

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
