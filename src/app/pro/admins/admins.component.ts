import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {ApiReturnTypeService} from '../../api-return-type.service';
import {SharedService} from '../../shared.service';
import {NzMessageService} from 'ng-zorro-antd';
import {ApiMonsterService} from '../../api-monster.service';

const API_URL = environment.apiUrl;
const UPLOAD_URL = environment.uploadUrl;

@Component({
  selector: 'app-admins',
  templateUrl: './admins.component.html',
  styleUrls: ['./admins.component.css']
})
export class AdminsComponent implements OnInit {
  skeletonLoading = true;
  adminsList: any = [];

  constructor(private api: ApiMonsterService, private sharer: SharedService,
              private msg: NzMessageService) {
  }

  getProfile(user_profile) {
    if (user_profile === '') {
      return this.sharer.siteOptions.siteAvatar;
    } else {
      return UPLOAD_URL + user_profile;
    }

  }

  banOrActivateUser(userData) {
    this.api.banOrActivateUser(userData.id).subscribe((p: ApiReturnTypeService) => {
      if (p.status) {
        userData.active = p.data;
        this.msg.success(p.message);
      }
    });
  }

  ngOnInit() {
    this.api.getAdminAndModeratorList(this.sharer.userData.id).subscribe((p: ApiReturnTypeService) => {
      if (p.status) {
        this.adminsList = p.data;
      }
      this.skeletonLoading = false;
    });
  }

}
