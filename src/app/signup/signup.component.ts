import {Component, Inject, OnInit} from '@angular/core';
import {DOCUMENT} from '@angular/common';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import * as $ from 'jquery';
import 'jquery-easing';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {ApiReturnTypeService} from '../api-return-type.service';
import {NzMessageService, NzNotificationService} from 'ng-zorro-antd';
import {Router} from '@angular/router';
import {OptionReturnTypeService} from '../pro/option-return-type.service';
import {ApiMonsterService} from '../api-monster.service';

const API_URL = environment.apiUrl;

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css',
    '../../assets/node_modules/register-steps/steps.css',
    '../../assets/dist/css/pages/register3.css',
  ]
})
export class SignupComponent implements OnInit {
  isLoading = false;
  siteOptions: any = {};
  constructor(@Inject(DOCUMENT) private doc: Document, private http: HttpClient,
              private notification: NzNotificationService, private router: Router,
              private msg: NzMessageService, private api: ApiMonsterService
              ) {
  }

  ngOnInit() {
    this.doc.body.classList.add('skin-default');
    this.doc.body.classList.add('card-no-border');
    this.formNextPreviousControl();
    this.api.getOptions().subscribe((p: OptionReturnTypeService) => {
      this.siteOptions = p;
    });
  }

  formNextPreviousControl() {
    $(function () {

// jQuery time
      let current_fs, next_fs, previous_fs; // fieldsets
      let left, opacity, scale; // fieldset properties which we will animate
      let animating; // flag to prevent quick multi-click glitches

      $('.my-next').click(function () {
        if (animating) {
          return false;
        }
        animating = true;

        current_fs = $(this).parents('fieldset');
        next_fs = $(this).parents('fieldset').next('fieldset');

        // activate next step on progressbar using the index of next_fs
        $('#eliteregister li').eq($('fieldset').index(next_fs)).addClass('active');

        // show the next fieldset
        next_fs.show();
        // hide the current fieldset with style
        current_fs.animate({opacity: 0}, {
          step: function (now, mx) {
            // as the opacity of current_fs reduces to 0 - stored in "now"
            // 1. scale current_fs down to 80%
            scale = 1 - (1 - now) * 0.2;
            // 2. bring next_fs from the right(50%)
            left = (now * 50) + '%';
            // 3. increase opacity of next_fs to 1 as it moves in
            opacity = 1 - now;
            current_fs.css({'transform': 'scale(' + scale + ')'});
            next_fs.css({'left': left, 'opacity': opacity});
          },
          duration: 800,
          complete: function () {
            current_fs.hide();
            animating = false;
          },
          // this comes from the custom easing plugin
          easing: 'easeInOutBack'
        });
      });

      $('.my-previous').click(function () {
        if (animating) {
          return false;
        }
        animating = true;

        current_fs = $(this).parents('fieldset');
        previous_fs = $(this).parents('fieldset').prev();

        // de-activate current step on progressbar
        $('#eliteregister li').eq($('fieldset').index(current_fs)).removeClass('active');

        // show the previous fieldset
        previous_fs.show();
        // hide the current fieldset with style
        current_fs.animate({opacity: 0}, {
          step: function (now, mx) {
            // as the opacity of current_fs reduces to 0 - stored in "now"
            // 1. scale previous_fs from 80% to 100%
            scale = 0.8 + (1 - now) * 0.2;
            // 2. take current_fs to the right(50%) - from 0%
            left = ((1 - now) * 50) + '%';
            // 3. increase opacity of previous_fs to 1 as it moves in
            opacity = 1 - now;
            current_fs.css({'left': left});
            previous_fs.css({'transform': 'scale(' + scale + ')', 'opacity': opacity});
          },
          duration: 800,
          complete: function () {
            current_fs.hide();
            animating = false;
          },
          // this comes from the custom easing plugin
          easing: 'easeInOutBack'
        });
      });
    });
  }

  submit(form) {
    this.isLoading = true;
    this.api.signupadd(form.value).subscribe((p: ApiReturnTypeService) => {
      if (!p.status) {
        this.notification.create('error', 'Notification', p.message, {
          nzDuration : 10000,
          nzPauseOnHover : true
        });
        this.isLoading = false;
      } else {
        this.notification.create('success', 'Notification', p.message, {
          nzDuration : 5000,
        });
        this.isLoading = false;
        $('.mySubmit').remove();
        setTimeout(_ => {
          this.router.navigate(['/login']);
        }, 5000);
      }
      //  form.reset();
    });
  }

  controlMail(email) {
    if (email.touched && email.dirty && email.valid) {
      this.api.mailExist(email.value).subscribe((p: ApiReturnTypeService) => {
        if (!p.status) {
          // invalid Mail from backend server
          email.incorrect = true;
          this.msg.error(p.message, {nzDuration : 7000});
          email.errorMessage = p.message;
        } else {
          email.incorrect = false;
        }
      });
    }
  }
  controlUsername(username) {
    if (username.touched && username.dirty && username.valid) {
      this.api.userNameExist(username.value).subscribe((p: ApiReturnTypeService) => {
        if (!p.status) {
          // invalid Mail from backend server
          username.incorrect = true;
          this.msg.error(p.message, {nzDuration : 7000});
          username.errorMessage = p.message;
          console.log(username);
        } else {
          username.incorrect = false;
        }
      });
    }
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


}
