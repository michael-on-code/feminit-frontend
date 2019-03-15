import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {ApiReturnTypeService} from '../../api-return-type.service';
import {SharedService} from '../../shared.service';
import {ApiMonsterService} from '../../api-monster.service';

const API_URL = environment.apiUrl;
const UPLOAD_URL = environment.uploadUrl;
@Component({
  selector: 'app-subscribers',
  templateUrl: './subscribers.component.html',
  styleUrls: ['./subscribers.component.css']
})
export class SubscribersComponent implements OnInit {

  constructor(
    private api: ApiMonsterService, private sharer: SharedService
  ) { }

  members: any = [];
  skeletonLoading = true;
  ngOnInit() {
    this.api.getMembersList().subscribe((p: ApiReturnTypeService) => {
      if (p.status) {
        this.members = p.data;
      }
      this.skeletonLoading = false;
    });
  }

  getProfile(user_profile) {
    if (user_profile === '') {
      return this.sharer.siteOptions.siteAvatar;
    } else {
      return UPLOAD_URL + user_profile;
    }

  }

  confirmBan(userId) {

  }

}
