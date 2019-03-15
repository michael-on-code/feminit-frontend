import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiReturnTypeService} from '../../api-return-type.service';
import {NzMessageService} from 'ng-zorro-antd';
import {SharedService} from '../../shared.service';
import {ApiMonsterService} from '../../api-monster.service';

const API_URL = environment.apiUrl;
const UPLOAD_URL = environment.uploadUrl;

@Component({
  selector: 'app-view-complain',
  templateUrl: './view-complain.component.html',
  styleUrls: ['./view-complain.component.css',
    '../../../assets/dist/css/pages/user-card.css'
  ]
})
export class ViewComplainComponent implements OnInit {
  complainID: any;
  skeletonLoading = true;
  uploadUrl: string;
  complainData: any = [];

  constructor(private api: ApiMonsterService, private route: ActivatedRoute,
              private msg: NzMessageService, private router: Router, private sharer: SharedService) {

  }

  ngOnInit() {
    // this.loadMagnificPopup();
    this.uploadUrl = UPLOAD_URL;
    this.complainID = this.route.snapshot.paramMap.get('complainID');
    this.api.getComplain(this.complainID).subscribe((p: ApiReturnTypeService) => {
      if (p.status) {
        this.complainData = p.data;
        this.skeletonLoading = false;
      } else {
        this.msg.error(p.message);
        this.router.navigate(['/dashboard/complaints']);
      }
    });
  }


  getComplainStatus(status) {
    if (status == 0) {
      return 'En attente';
    }
    if (status == 1) {
      return 'En cours';
    }
  }

  getArrayLength(myArray) {
    if (myArray) {
      return myArray.length;
    }
    return 0;
  }

  fileShower(fileUrl: string, realLink = false) {
    const image = [
      'jpg', 'jpeg', 'png', 'gif'
    ];
    const extension = fileUrl.split('.')[1];
    // extension = extension[1];
    // if(image.indexOf())
    if (image.indexOf(extension) != -1) {
      return UPLOAD_URL + fileUrl;
    } else {
      if (realLink) {
        return UPLOAD_URL + fileUrl;
      } else {
        return UPLOAD_URL + 'file-type/' + extension;
      }
    }
  }


  getUserPhoto(userphoto) {
    if (userphoto) {
      return UPLOAD_URL + userphoto;
    } else {
      return this.sharer.siteOptions.siteAvatar;
    }
  }


}
