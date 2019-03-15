import {Component, OnInit} from '@angular/core';
import {NzMessageService, NzNotificationService, UploadFile} from 'ng-zorro-antd';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {ApiReturnTypeService} from '../../api-return-type.service';
import {ApiMonsterService} from '../../api-monster.service';
import {OptionReturnTypeService} from '../option-return-type.service';
import {SharedService} from '../../shared.service';

const API_URL = environment.apiUrl;
const UPLOAD_URL = environment.uploadUrl;

@Component({
  selector: 'app-parameters',
  templateUrl: './parameters.component.html',
  styleUrls: ['./parameters.component.css']
})
export class ParametersComponent implements OnInit {

  constructor(private msg: NzMessageService, private http: HttpClient,
              private notification: NzNotificationService,
              private api: ApiMonsterService, private sharer: SharedService
  ) {
  }

  avatarUrl: string;
  logoUrl: string;
  backgroundUrl: string;
  backgroundisBase64 = false;
  logoisBase64 = false;
  avatarisBase64 = false;
  defaultcoverisBase64 = false;
  siteName: string;
  siteDescription: string;
  defaultCoverUrl: string;
  submittingIsLoading = false;
  skeletonLoading = true;

  // siteOptions: any;

  submit(form) {
    if (form.valid || (this.avatarUrl && this.backgroundUrl && this.logoUrl && this.siteName && this.siteDescription)) {
      this.submittingIsLoading = true;
      const formData: any = {};
      formData.siteName = form.value.siteName;
      formData.siteDescription = form.value.siteDescription;
      if (this.logoisBase64) {
        formData.siteLogo = this.logoUrl;
      }
      if (this.avatarisBase64) {
        formData.siteAvatar = this.avatarUrl;
      }
      if (this.backgroundisBase64) {
        formData.siteBackgroundImage = this.backgroundUrl;
      }
      if (this.defaultcoverisBase64) {
        formData.siteDefaultComplainCover = this.defaultCoverUrl;
      }

      this.api.setOptions(formData).subscribe((p: ApiReturnTypeService) => {
        console.log(p);
        if (p.status) {
          // @ts-ignore
          this.sharer.siteOptions.siteLogo = UPLOAD_URL + p.data.siteLogo;
          // @ts-ignore
          this.sharer.siteOptions.siteBackgroundImage = UPLOAD_URL + p.data.siteBackgroundImage;
          // @ts-ignore
          this.sharer.siteOptions.siteAvatar = UPLOAD_URL + p.data.siteAvatar;
          // @ts-ignore
          this.sharer.siteOptions.siteDefaultComplainCover = UPLOAD_URL + p.data.siteDefaultComplainCover;
          // @ts-ignore
          this.sharer.siteOptions.siteName = p.data.siteName;
          // @ts-ignore
          this.sharer.siteOptions.siteDescription = p.data.siteDescription;
          this.notification.create('success', 'Notification', p.message);
        }
        this.submittingIsLoading = false;
      });
    }
  }

  ngOnInit() {
    const options = this.sharer.siteOptions;
    this.avatarUrl = options.siteAvatar;
    this.logoUrl = options.siteLogo;
    this.siteName = options.siteName;
    this.siteDescription = options.siteDescription;
    this.backgroundUrl = options.siteBackgroundImage;
    this.defaultCoverUrl = options.siteDefaultComplainCover;
    this.skeletonLoading = false;
  }

  beforeAvatarUpload = (file: File) => {
    const validImage = this.controlImage(file);
    if (validImage) {
      this.getBase64(file, (img: string) => {
        this.avatarUrl = img;
        this.avatarisBase64 = true;
      });
    }
    return false;
  }

  beforeLogoUpload = (file: File) => {
    const validImage = this.controlImage(file);
    if (validImage) {
      this.getBase64(file, (img: string) => {
        this.logoUrl = img;
        this.logoisBase64 = true;
      });
    }
    return false;
  }
  beforeBackgroundUpload = (file: File) => {
    const validImage = this.controlImage(file);
    if (validImage) {
      this.getBase64(file, (img: string) => {
        this.backgroundUrl = img;
        this.backgroundisBase64 = true;
      });
    }
    return false;
  }
  beforesiteDefaultComplainCoverUpload = (file: File) => {
    const validImage = this.controlImage(file);
    if (validImage) {
      this.getBase64(file, (img: string) => {
        this.defaultCoverUrl = img;
        this.defaultcoverisBase64 = true;
      });
    }
    return false;
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

  private getBase64(img: File, callback: (img: {}) => void): void {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }

}
