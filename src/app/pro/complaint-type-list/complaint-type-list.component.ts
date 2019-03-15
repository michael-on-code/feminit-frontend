import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {ApiReturnTypeService} from '../../api-return-type.service';
import {ApiMonsterService} from '../../api-monster.service';

const API_URL = environment.apiUrl;
const UPLOAD_URL = environment.uploadUrl;

@Component({
  selector: 'app-complaint-type-list',
  templateUrl: './complaint-type-list.component.html',
  styleUrls: ['./complaint-type-list.component.css']
})
export class ComplaintTypeListComponent implements OnInit {
  skeletonLoading = true;
  complaintTypeList: any = [];
  uploadUrl: string;

  constructor(private api: ApiMonsterService) {
  }

  ngOnInit() {
    this.uploadUrl = UPLOAD_URL;
    this.api.getComplainTypes().subscribe((p: ApiReturnTypeService) => {
      if (p.status) {
        this.complaintTypeList = p.data;
      }
      this.skeletonLoading = false;
    });
  }

}
