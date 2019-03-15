import {Component, OnInit} from '@angular/core';
import {NzMessageService, NzNotificationService} from 'ng-zorro-antd';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {ApiReturnTypeService} from '../../api-return-type.service';
import {ApiMonsterService} from '../../api-monster.service';

const API_URL = environment.apiUrl;

@Component({
  selector: 'app-addadmin',
  templateUrl: './addadmin.component.html',
  styleUrls: ['./addadmin.component.css']
})
export class AddadminComponent implements OnInit {
  profilePhotoUrl: string;
  submittingIsLoading = false;
  userGroups: any;
  selectedRole: any;

  constructor(private msg: NzMessageService, private api: ApiMonsterService,
              private notification: NzNotificationService) {
  }

  ngOnInit() {
    this.api.getGroupNames().subscribe((p: ApiReturnTypeService) => {
      if (p.status) {
        this.userGroups = p.data;
      }
    });
  }

  private getBase64(img: File, callback: (img: {}) => void): void {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }

  submit(form) {
    if (form.valid) {
      this.submittingIsLoading = true;
      const formData: any = {
        last_name: form.value.last_name,
        first_name: form.value.first_name,
        email: form.value.email,
      };
      if (this.profilePhotoUrl) {
        formData.user_photo = this.profilePhotoUrl;
      }
      if (this.selectedRole) {
        formData.user_group = [];
        this.selectedRole.forEach(function (role) {
          formData.user_group.push(role);
        });
      }
      this.api.addAdmin(formData).subscribe((p: ApiReturnTypeService) => {
        if (p.status) {
          this.profilePhotoUrl = null;
          form.reset();
          this.notification.create('success', 'Notification', p.message);
        } else {
          this.notification.create('error', 'Notification', p.message);
        }
        this.submittingIsLoading = false;
      });
    }
  }

  beforeProfilUpload = (file: File) => {
    const validImage = this.controlImage(file);
    if (validImage) {
      this.getBase64(file, (img: string) => {
        this.profilePhotoUrl = img;
      });
    }
    return false;
  };

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
  };

}
