import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {NzMessageService, NzNotificationService} from 'ng-zorro-antd';
import {environment} from '../../../environments/environment';
import {ApiReturnTypeService} from '../../api-return-type.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiMonsterService} from '../../api-monster.service';

const API_URL = environment.apiUrl;

@Component({
  selector: 'app-edit-bot-message',
  templateUrl: './edit-bot-message.component.html',
  styleUrls: ['./edit-bot-message.component.css']
})
export class EditBotMessageComponent implements OnInit {
  skeletonLoading = true;
  botMessageID: any;
  messageData: any = {};
  submittingIsLoading = false;

  constructor(private http: HttpClient, private router: Router,
              private route: ActivatedRoute, private msg: NzMessageService,
              private notification: NzNotificationService, private api: ApiMonsterService) {
  }

  ngOnInit() {
    this.botMessageID = this.route.snapshot.paramMap.get('messageID');
    this.api.getBotMessage(this.botMessageID).subscribe((p: ApiReturnTypeService) => {
      if (p.status) {
        this.messageData = p.data;
        this.skeletonLoading = false;
      } else {
        this.msg.error(p.message);
        this.router.navigate(['/dashboard/chatbot/messages']);
      }
    });
  }

  submit(form) {
    if (form.valid) {
      this.submittingIsLoading = true;
      const formData: any = {
        keyword: form.value.keyword,
        message: form.value.message,
        id: this.botMessageID,
      };
      this.api.updateBotMessages(formData).subscribe((p: ApiReturnTypeService) => {
        const status = p.status ? 'success' : 'error';
        this.notification.create(status, 'Notification', p.message, {nzDuration: 10000});
        this.submittingIsLoading = false;
      });
    }
  }

}
