import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ProRoutingModule} from './pro-routing.module';
import {DashboardComponent} from './dashboard/dashboard.component';
import {StatsComponent} from './stats/stats.component';
import {SubscribersComponent} from './subscribers/subscribers.component';
import {ParametersComponent} from './parameters/parameters.component';
import {FormsModule} from '@angular/forms';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {UsercomplainComponent} from './usercomplain/usercomplain.component';
import {AdminsComponent} from './admins/admins.component';
import {AddadminComponent} from './addadmin/addadmin.component';
import {MyaccountComponent} from './myaccount/myaccount.component';
import {EditUserComponent} from './edit-user/edit-user.component';
import {ComplaintsListComponent} from './complaints-list/complaints-list.component';
import {ComplaintTypeListComponent} from './complaint-type-list/complaint-type-list.component';
import {AddComplainTypeComponent} from './add-complain-type/add-complain-type.component';
import {EditComplainTypeComponent} from './edit-complain-type/edit-complain-type.component';
import {ComplaintViolenceListComponent} from './complaint-violence-list/complaint-violence-list.component';
import {AddComplainViolenceComponent} from './add-complain-violence/add-complain-violence.component';
import {EditComplaintViolenceComponent} from './edit-complaint-violence/edit-complaint-violence.component';
import {BotMessageListComponent} from './bot-message-list/bot-message-list.component';
import {AddBotMessageComponent} from './add-bot-message/add-bot-message.component';
import {EditBotMessageComponent} from './edit-bot-message/edit-bot-message.component';
import {AddBotImageComponent} from './add-bot-image/add-bot-image.component';
import {EditBotImageComponent} from './edit-bot-image/edit-bot-image.component';
import {BotImageListComponent} from './bot-image-list/bot-image-list.component';
import {ViewComplainComponent} from './view-complain/view-complain.component';
import {EditComplainComponent} from './edit-complain/edit-complain.component';
import {NgxEditorModule} from 'ngx-editor';

@NgModule({
  imports: [
    CommonModule,
    ProRoutingModule,
    FormsModule,
    NgZorroAntdModule,
    NgxEditorModule
  ],
  declarations: [DashboardComponent, StatsComponent, SubscribersComponent,
    ParametersComponent, UsercomplainComponent, AdminsComponent, AddadminComponent,
    MyaccountComponent, EditUserComponent, ComplaintsListComponent,
    ComplaintTypeListComponent, AddComplainTypeComponent, EditComplainTypeComponent,
    ComplaintViolenceListComponent, AddComplainViolenceComponent,
    EditComplaintViolenceComponent, BotMessageListComponent,
    AddBotMessageComponent, EditBotMessageComponent, AddBotImageComponent,
    EditBotImageComponent, BotImageListComponent, ViewComplainComponent, EditComplainComponent]
})
export class ProModule {
}
