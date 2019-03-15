import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {NzNotificationService} from 'ng-zorro-antd';
import {environment} from '../../../environments/environment';
import {ApiReturnTypeService} from '../../api-return-type.service';
import {Router} from '@angular/router';
import {ApiMonsterService} from '../../api-monster.service';

const API_URL = environment.apiUrl;

@Component({
  selector: 'app-add-bot-message',
  templateUrl: './add-bot-message.component.html',
  styleUrls: ['./add-bot-message.component.css']
})
export class AddBotMessageComponent implements OnInit {
  submittingIsLoading = false;

  constructor(private http: HttpClient, private route: Router,
              private notification: NzNotificationService, private api: ApiMonsterService) {
  }

  ngOnInit() {
  }

  submit(form) {
    if (form.valid) {
      this.submittingIsLoading = true;
      this.api.addBotMessage(form.value).subscribe((p: ApiReturnTypeService) => {
        const status = p.status ? 'success' : 'error';
        this.notification.create(status, 'Notification', p.message, {nzDuration: 10000});
        if (p.status) {
          this.route.navigate(['dashboard/chatbot/messages/edit/' + p.data]);
        }
        this.submittingIsLoading = false;
      });
    }
  }

}
