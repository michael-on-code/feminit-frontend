import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {ApiReturnTypeService} from '../../api-return-type.service';
import {SharedService} from '../../shared.service';
import {formatDate} from '@angular/common';
import {ApiMonsterService} from '../../api-monster.service';
const API_URL = environment.apiUrl;
const UPLOAD_URL = environment.uploadUrl;

@Component({
  selector: 'app-complaints-list',
  templateUrl: './complaints-list.component.html',
  styleUrls: ['./complaints-list.component.css']
})
export class ComplaintsListComponent implements OnInit {
  skeletonLoading = true;
  complainList: any = [];
  uploadUrl: string;

  constructor(private api: ApiMonsterService, private sharer: SharedService) {
  }

  ngOnInit() {
    this.api.getComplainsList().subscribe((p: ApiReturnTypeService) => {
      if (p.status) {
        this.complainList = p.data;
      }
      this.skeletonLoading = false;
    });
  }

  getDescription(text) {
    if (text) {
      return text;
    }
    return '-';
  }

  getUserPhoto(userphoto) {
    if (userphoto) {
      return UPLOAD_URL + userphoto;
    }
    return this.sharer.siteOptions.siteAvatar;
  }

  getComplainStatus(status, moderator) {
    if (moderator == '-') {
      return 'En attente';
    } else {
      if (status == 1) {
        return 'En cours';
      }
      if (status == 0) {
        return 'Invalide';
      }
    }
  }

  getCover(cover) {
    if (cover) {
      return UPLOAD_URL + cover;
    }
    return this.sharer.siteOptions.siteDefaultComplainCover;
  }

  getDateLaps(date) {
    return formatDate(date, 'short', 'fr');
  }

}
