import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {NzMessageService, NzNotificationService} from 'ng-zorro-antd';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiReturnTypeService} from '../../api-return-type.service';
import {ApiMonsterService} from '../../api-monster.service';

const API_URL = environment.apiUrl;
const UPLOAD_URL = environment.uploadUrl;

@Component({
  selector: 'app-edit-complain-type',
  templateUrl: './edit-complain-type.component.html',
  styleUrls: ['./edit-complain-type.component.css']
})
export class EditComplainTypeComponent implements OnInit {

  skeletonIsLoading = true;
  imageUrl: string;
  initialImageUrl: string;
  complainTypeData: any = {};
  submittingIsLoading = false;
  complainTypeID: any;

  constructor(private api: ApiMonsterService,
              private msg: NzMessageService, private route: ActivatedRoute,
              private router: Router, private notification: NzNotificationService) {
  }

  ngOnInit() {
    this.complainTypeID = this.route.snapshot.paramMap.get('complainTypeID');
    this.api.getComplainType(this.complainTypeID).subscribe(
      (p: ApiReturnTypeService) => {
      if (p.status) {
        this.complainTypeData = p.data;
        this.imageUrl = UPLOAD_URL + this.complainTypeData.photo;
        this.initialImageUrl = this.imageUrl;
        this.skeletonIsLoading = false;
      } else {
        this.msg.error(p.message);
        this.router.navigate(['/dashboard/complaints/category/types']);
      }
    });
  }

  submit(form) {
    if (form.valid) {
      this.submittingIsLoading = true;
      const formData: any = {
        name : form.value.name,
        description : form.value.description,
        id : this.complainTypeID,
      };
      if (this.imageUrl && this.imageUrl !== this.initialImageUrl) {
        formData.photo = this.imageUrl;
      }
      this.api.editComplainType(formData).subscribe((p: ApiReturnTypeService) => {
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
