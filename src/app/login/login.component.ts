import {Component, OnInit} from '@angular/core';
import {GlobalsType} from '../GlobalsType';
import {GlobalsService} from '../globals.service';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {ApiReturnTypeService} from '../api-return-type.service';
import {NzMessageService, NzNotificationService} from 'ng-zorro-antd';
import {Router} from '@angular/router';
import {ApiMonsterService} from '../api-monster.service';
import {OptionReturnTypeService} from '../pro/option-return-type.service';
import {DomSanitizer} from '@angular/platform-browser';
import {SharedService} from '../shared.service';
// import 'jquery';
// import 'popper.js';
// import 'bootstrap';
// import {jQuery} from '../../assets/node_modules/jquery/jquery-3.2.1.min.js';
// import {popper} from '../../assets/node_modules/popper/popper.min.js';
// import {boostrap} from '../../assets/node_modules/bootstrap/dist/js/bootstrap.min.js';
const API_URL = environment.apiUrl;
const UPLOAD_URL = environment.uploadUrl;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [
    './login.component.css',
    '../../assets/dist/css/pages/login-register-lock.css',
  ],
})

export class LoginComponent implements OnInit {
  pageTitle = 'Login';
  isLoading = false;
  siteLogo: string;
  siteBackground: any;
  siteDescription: string;

  // public data: GlobalsType = {data : {pageTitle : 'Interface de connexion'}}
  constructor(/*private dataCom: GlobalsService,*/ private http: HttpClient,
              private notification: NzNotificationService, private route: Router,
              private msg: NzMessageService, private api: ApiMonsterService,
              private sanitizer: DomSanitizer, private sharer: SharedService
  ) {
  }

  ngOnInit() {
    // Affichage de message de notification
    if (this.sharer.messageNeeded) {
      this.sharer.messageNeeded = false;
      this.notification.create(this.sharer.messageType, 'Notification', this.sharer.message, {
        nzDuration: 10000
      });
    }
    // Affichage de message d'erreur
    if (this.sharer.error) {
      this.sharer.error = false;
      this.msg.error(this.sharer.errorMessage);
    }
    // Affichage de message d'erreur
    if (this.sharer.mustLogin) {
      this.sharer.mustLogin = false;
      this.msg.warning('Veuillez vous connecter pour continuer');
    }
    // Affichage de message d'erreur
    if (this.sharer.isLoggedOut) {
      this.sharer.isLoggedOut = false;
      this.msg.success('Déconnecté');
    }
    // Verifier si les données sont disponibles avant de les recharger
    if (!Object.keys(this.sharer.siteOptions).length) {
      this.api.getOptions().subscribe((p: OptionReturnTypeService) => {
        this.siteLogo = UPLOAD_URL + p.siteLogo;
        this.siteDescription = p.siteDescription;
        this.siteBackground = this.sanitizer.bypassSecurityTrustStyle('url(' + UPLOAD_URL + p.siteBackgroundImage + ')');
        this.sharer.siteOptions.siteLogo = UPLOAD_URL + p.siteLogo;
        this.sharer.siteOptions.siteBackgroundImage = UPLOAD_URL + p.siteBackgroundImage;
        this.sharer.siteOptions.siteAvatar = UPLOAD_URL + p.siteAvatar;
        this.sharer.siteOptions.siteDefaultComplainCover = UPLOAD_URL + p.siteDefaultComplainCover;
        this.sharer.siteOptions.siteName = p.siteName;
        this.sharer.siteOptions.siteDescription = p.siteDescription;
      });
    } else {
      this.siteLogo = this.sharer.siteOptions.siteLogo;
      this.siteDescription = this.sharer.siteOptions.siteDescription;
      this.siteBackground = this.sanitizer.bypassSecurityTrustStyle('url(' + this.sharer.siteOptions.siteBackgroundImage + ')');
    }

  }

  submit(form) {
    if (form.valid) {
      this.isLoading = true;
      const dataToBeSent: any = {};
      dataToBeSent.username = form.value.username;
      dataToBeSent.password = form.value.password;
      dataToBeSent.remember = form.value.remember;
      this.api.login(dataToBeSent).subscribe((p: ApiReturnTypeService) => {
        if (!p.status) {
          this.isLoading = false;
          // this.msg.error(p.message);
          this.notification.create('error', 'Notification', p.message, {
            nzDuration: 10000
          });
        } else {
          this.sharer.userData = p.data;
          this.route.navigate(['/dashboard/stats']);
        }
      });
    }
  }

}
