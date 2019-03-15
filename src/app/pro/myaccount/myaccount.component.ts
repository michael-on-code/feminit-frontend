import {Component, OnInit} from '@angular/core';
import {SharedService} from '../../shared.service';
import {NzMessageService, NzNotificationService} from 'ng-zorro-antd';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {ApiReturnTypeService} from '../../api-return-type.service';
import {ApiMonsterService} from '../../api-monster.service';

const API_URL = environment.apiUrl;
const UPLOAD_URL = environment.uploadUrl;

@Component({
  selector: 'app-myaccount',
  templateUrl: './myaccount.component.html',
  styleUrls: ['./myaccount.component.css']
})
export class MyaccountComponent implements OnInit {
  passwordSubmittingIsLoading = false;
  submittingIsLoading = false;
  userData: any;
  user_photo: string;
  origin_user_photo: string;

  constructor(private sharer: SharedService, private msg: NzMessageService,
              private api: ApiMonsterService, private notification: NzNotificationService) {
    this.userData = this.sharer.userData;
    this.origin_user_photo = UPLOAD_URL + this.userData.user_photo;
    this.user_photo = UPLOAD_URL + this.userData.user_photo;
  }

  ngOnInit() {

  }

  passwordControl(password, confirmPassword) {
    if (password.valid && password.dirty && confirmPassword.dirty && confirmPassword.valid) {
      if (confirmPassword.value !== password.value) {
        confirmPassword.incorrect = true;
        // console.log('Incorrect');
      } else {
        confirmPassword.incorrect = false;
        // console.log('Correct');
      }
    }
  }

  submitUserPassword(form, cpass) {
    if (form.valid && !cpass.incorrect) {
      this.passwordSubmittingIsLoading = true;
      const formData = {
        userID: this.userData.id,
        password: form.value.password,
        newpassword: form.value.newpassword,
      };
      this.api.editPassword(formData).subscribe((p: ApiReturnTypeService) => {
        const status = p.status ? 'success' : 'error';
        this.notification.create(status, 'Notification', p.message, {
          nzDuration : 7000
        });
        this.passwordSubmittingIsLoading = false;
      });
    }
  }

  submitUserData(form) {
    if (form.valid) {
      const formData: any = {
        last_name: form.value.last_name,
        first_name: form.value.first_name,
        phone: form.value.phone,
        userID: this.userData.id
      };
      if (this.user_photo && this.user_photo !== this.origin_user_photo) {
        formData.user_photo = this.user_photo;
      }
      this.submittingIsLoading = true;
      this.api.updateUser(formData).subscribe((p: ApiReturnTypeService) => {
        const status = p.status ? 'success' : 'error';
        if (p.status) {
          this.sharer.userData = p.data;
        }
        this.notification.create(status, 'Notification', p.message, {
          nzDuration: 10000
        });
        this.submittingIsLoading = false;
      });
    }
  }

  beforeProfilUpload = (file: File) => {
    const validImage = this.controlImage(file);
    if (validImage) {
      this.getBase64(file, (img: string) => {
        this.user_photo = img;
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
  };
}
