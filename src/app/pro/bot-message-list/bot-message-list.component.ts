import {Component, Inject, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ApiReturnTypeService} from '../../api-return-type.service';
import {environment} from '../../../environments/environment';
import {DataTablesModule} from 'angular-datatables';
import {DOCUMENT} from '@angular/common';
import {NzMessageService} from 'ng-zorro-antd';
import Api = DataTables.Api;
import {ApiMonsterService} from '../../api-monster.service';

const API_URL = environment.apiUrl;

@Component({
  selector: 'app-bot-message-list',
  templateUrl: './bot-message-list.component.html',
  styleUrls: ['./bot-message-list.component.css']
})
export class BotMessageListComponent implements OnInit {

  skeletonLoading = true;
  botMessageList: any = [];
  deletingIsLoading = false;

  constructor(private http: HttpClient,
              private msg: NzMessageService, private api: ApiMonsterService) {
  }

  ngOnInit() {
    this.api.getBotMessages().subscribe((p: ApiReturnTypeService) => {
      if (p.status) {
        this.botMessageList = p.data;
      }
      this.skeletonLoading = false;
    });
  }

  deleteMessage(tableRow, messageID) {
    tableRow.remove();
    this.api.deleteBotMessage(messageID).subscribe((p: ApiReturnTypeService) => {
      if (p.status) {
        this.msg.success(p.message);
      } else {
        this.msg.error(p.message);
      }
    });
  }
}
