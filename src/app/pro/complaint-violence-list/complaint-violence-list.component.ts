import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ApiReturnTypeService} from '../../api-return-type.service';
import {environment} from '../../../environments/environment';
import {ApiMonsterService} from '../../api-monster.service';

const API_URL = environment.apiUrl;
const UPLOAD_URL = environment.uploadUrl;

@Component({
  selector: 'app-complaint-violence-list',
  templateUrl: './complaint-violence-list.component.html',
  styleUrls: ['./complaint-violence-list.component.css']
})
export class ComplaintViolenceListComponent implements OnInit {
  skeletonLoading = true;
  complaintTypeList: any = [];
  uploadUrl: string;

  constructor(private api: ApiMonsterService) {
  }

  ngOnInit() {
    this.uploadUrl = UPLOAD_URL;
    this.api.getComplainViolences().subscribe((p: ApiReturnTypeService) => {
      if (p.status) {
        this.complaintTypeList = p.data;
      }
      this.skeletonLoading = false;
    });
  }

}
