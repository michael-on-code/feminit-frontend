import {Component, OnInit} from '@angular/core';
import {NzMessageService, NzNotificationService} from 'ng-zorro-antd';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {ApiReturnTypeService} from '../../api-return-type.service';
import {Router} from '@angular/router';
import {ApiMonsterService} from '../../api-monster.service';

const API_URL = environment.apiUrl;

@Component({
  selector: 'app-add-complain-type',
  templateUrl: './add-complain-type.component.html',
  styleUrls: ['./add-complain-type.component.css']
})
export class AddComplainTypeComponent implements OnInit {
  imageUrl: string;
  submittingIsLoading = false;

  constructor(private msg: NzMessageService, private api: ApiMonsterService,
              private notification: NzNotificationService, private route: Router) {
  }

  ngOnInit() {
  }

  submit(form) {
    if (form.valid && this.imageUrl) {
      this.submittingIsLoading = true;
      const formData: any = {
        name: form.value.name,
        description: form.value.description,
        photo: this.imageUrl
      };
      this.api.addComplainType(formData).subscribe((p: ApiReturnTypeService) => {
        const status = p.status ? 'success' : 'error';
        this.notification.create(status, 'Notification', p.message, {
          nzDuration: 10000
        });
        if (p.status) {
          this.route.navigate(['/dashboard/complaints/category/types/edit/' + p.data]);
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
