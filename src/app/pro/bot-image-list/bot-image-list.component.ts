import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {NzMessageService} from 'ng-zorro-antd';
import {ApiReturnTypeService} from '../../api-return-type.service';
import {environment} from '../../../environments/environment';

const API_URL = environment.apiUrl;
const UPLOAD_URL = environment.uploadUrl;

@Component({
  selector: 'app-bot-image-list',
  templateUrl: './bot-image-list.component.html',
  styleUrls: ['./bot-image-list.component.css']
})
export class BotImageListComponent implements OnInit {
  skeletonLoading = true;
  botImageList: any = [];
  uploadUrl: string;

  constructor(private http: HttpClient,
              private msg: NzMessageService) {
  }

  ngOnInit() {
    this.uploadUrl = UPLOAD_URL;
    this.http.get(API_URL + '/botImage/get').subscribe((p: ApiReturnTypeService) => {
      if (p.status) {
        this.botImageList = p.data;
      }
      this.skeletonLoading = false;
    });
  }

  deleteImage(tableRow, imageID) {
    tableRow.remove();
    this.http.post(API_URL + '/botImage/delete', {imageID: imageID}).subscribe((p: ApiReturnTypeService) => {
      if (p.status) {
        this.msg.success(p.message);
      } else {
        this.msg.error(p.message);
      }
    });
  }
}
