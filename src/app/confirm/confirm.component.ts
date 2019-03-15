import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {ApiReturnTypeService} from '../api-return-type.service';
import {SharedService} from '../shared.service';
import {OptionReturnTypeService} from '../pro/option-return-type.service';
import {NzMessageService} from 'ng-zorro-antd';
import {DomSanitizer} from '@angular/platform-browser';
import {ApiMonsterService} from '../api-monster.service';

const API_URL = environment.apiUrl;
const UPLOAD_URL = environment.uploadUrl;

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css',
    '../../assets/dist/css/pages/login-register-lock.css',
  ]
})
export class ConfirmComponent implements OnInit {
  isVerified = false;
  userID: any;
  activationCode: string;
  siteLogo: string;
  siteName: string;
  siteBackground: any;
  isLoading = false;

  constructor(private activRoute: ActivatedRoute, private http: HttpClient,
              private sharer: SharedService, private route: Router, private msg: NzMessageService,
              private sanitizer: DomSanitizer, private api: ApiMonsterService) {
    this.userID = this.activRoute.snapshot.paramMap.get('userID');
    this.activationCode = this.activRoute.snapshot.paramMap.get('activationCode');
    if (this.activationCode && this.userID) {
      this.verifyActivationData();
    }
  }

  ngOnInit() {
    this.api.getOptions().subscribe((p: OptionReturnTypeService) => {
      this.sharer.siteOptions.siteLogo = UPLOAD_URL + p.siteLogo;
      this.sharer.siteOptions.siteBackgroundImage = UPLOAD_URL + p.siteBackgroundImage;
      this.sharer.siteOptions.siteAvatar = UPLOAD_URL + p.siteAvatar;
      this.sharer.siteOptions.siteName = p.siteName;
      this.sharer.siteOptions.siteDescription = p.siteDescription;
      this.siteName = this.sharer.siteOptions.siteName;
      this.siteLogo = this.sharer.siteOptions.siteLogo;
      this.siteBackground = this.sanitizer.bypassSecurityTrustStyle('url(' + UPLOAD_URL + p.siteBackgroundImage + ')');
    });
  }

  verifyActivationData() {
    this.api.verifyActivation(this.userID, this.activationCode).subscribe(
      (p: ApiReturnTypeService) => {
        if (p.status) {
          this.isVerified = true;
        } else {
          this.isVerified = false;
          this.sharer.error = true;
          this.sharer.errorMessage = p.message;
          this.route.navigate(['/login']);
        }
      });
  }

  passwordControl(password, confirmPassword) {
    if (password.valid && password.dirty && confirmPassword.dirty && confirmPassword.valid) {
      if (confirmPassword.value !== password.value) {
        confirmPassword.incorrect = true;
        // console.log('Incorrect');
      } else {
        confirmPassword.incorrect = false;
        // console.log('Correct');
      }
    }
  }

  submit(form, username, cpass) {
    if (form.valid && (!username.incorrect) && (!cpass.incorrect)) {
      this.isLoading = true;
      const formData: any = {
        userID: this.userID,
        activationCode: this.activationCode,
        username: form.value.username,
        password: form.value.password
      };
      this.api.setActivateAccount(formData).subscribe((p: ApiReturnTypeService) => {
        this.sharer.messageNeeded = true;
        this.sharer.message = p.message;
        if (p.status) {
          this.sharer.messageType = 'success';
        } else {
          this.sharer.messageType = 'error';
        }
        this.route.navigate(['/login']);
      });
    }
  }

  controlUsername(username) {
    if (username.touched && username.dirty && username.valid) {
      this.api.userNameExist(username.value).subscribe((p: ApiReturnTypeService) => {
        if (!p.status) {
          // invalid Mail from backend server
          username.incorrect = true;
          this.msg.error(p.message, {nzDuration: 7000});
          username.errorMessage = p.message;
        } else {
          username.incorrect = false;
        }
      });
    }
  }

}
