import {Component, Inject, OnInit} from '@angular/core';
import {DOCUMENT} from '@angular/common';
import {JqueryScriptService} from '../jquery-script.service';
import {Route, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {OptionReturnTypeService} from '../option-return-type.service';
import {environment} from '../../../environments/environment';
import {ApiMonsterService} from '../../api-monster.service';
import {SharedService} from '../../shared.service';
const API_URL = environment.apiUrl;
const UPLOAD_URL = environment.uploadUrl;
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(@Inject(DOCUMENT) private doc: Document, private jqueryScript: JqueryScriptService,
  private route: Router, private api: ApiMonsterService, private sharer: SharedService
  ) {
    if (!this.sharer.userData || this.sharer.userData === undefined) {
      this.sharer.mustLogin = true;
      this.route.navigate(['/login']);
    }
  }
  userData: any;
  siteOptions: any;
  ngOnInit() {
    this.doc.body.classList.add('skin-default');
    this.doc.body.classList.add('fixed-layout');
    this.jqueryScript.getDashboardScripts();
    this.userData = this.sharer.userData;
    this.siteOptions = this.sharer.siteOptions;
  }

  getUserPhoto() {
    if (this.sharer && this.sharer.userData && Object.keys(this.sharer.userData).length) {
      if (this.sharer.userData) {
        // @ts-ignore
        return UPLOAD_URL + this.sharer.userData.user_photo;
      } else {
        return this.siteOptions.siteAvatar;
      }
    }
  }

  logout() {
    this.sharer.userData = null;
    this.sharer.isLoggedOut = true;
    this.route.navigate(['/login']);
  }

  getMenu(){

  }

}
