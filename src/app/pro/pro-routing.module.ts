import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';
import {StatsComponent} from './stats/stats.component';
import {ParametersComponent} from './parameters/parameters.component';
import {SubscribersComponent} from './subscribers/subscribers.component';
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
import {BotImageListComponent} from './bot-image-list/bot-image-list.component';
import {AddBotImageComponent} from './add-bot-image/add-bot-image.component';
import {EditBotImageComponent} from './edit-bot-image/edit-bot-image.component';
import {ViewComplainComponent} from './view-complain/view-complain.component';
import {EditComplainComponent} from './edit-complain/edit-complain.component';

const routes: Routes = [
  {
    path : 'dashboard', component : DashboardComponent, children : [
      {
        path: 'stats', component : StatsComponent
      },
      {
        path : 'parameters', component : ParametersComponent
      },
      {
        path : 'subscribers', component : SubscribersComponent
      },
      {
        path : 'usercomplain/:id', component : UsercomplainComponent
      },
      {
        path : 'edituser/:id', component : EditUserComponent
      },
      {
        path : 'admins', component : AdminsComponent
      },
      {
        path : 'addadmin', component : AddadminComponent
      },
      {
        path : 'myaccount', component : MyaccountComponent
      },
      {
        path : 'chatbot/messages', component : BotMessageListComponent
      },
      {
        path : 'chatbot/messages/add', component : AddBotMessageComponent
      },
      {
        path : 'chatbot/messages/edit/:messageID', component : EditBotMessageComponent
      },
      {
        path : 'chatbot/images', component : BotImageListComponent
      },
      {
        path : 'chatbot/images/add', component : AddBotImageComponent
      },
      {
        path : 'chatbot/images/edit/:imageID', component : EditBotImageComponent
      },
      {
        path : 'complaints/category/types', component : ComplaintTypeListComponent
      },
      {
        path: 'complaints/category/types/add', component : AddComplainTypeComponent
      },
      {
        path: 'complaints/category/types/edit/:complainTypeID', component : EditComplainTypeComponent
      },
      {
        path : 'complaints/category/violences', component : ComplaintViolenceListComponent
      },
      {
        path: 'complaints/category/violences/add', component : AddComplainViolenceComponent
      },
      {
        path: 'complaints/category/violences/edit/:complainViolenceID', component : EditComplaintViolenceComponent
      },
      {
        path: 'complaints', component : ComplaintsListComponent
      },
      {
        path: 'complaints/view/:complainID', component : ViewComplainComponent
      },
      {
        path: 'complaints/edit/:complainID', component : EditComplainComponent
      },
      {
        path : '', redirectTo : 'dashboard/stats', pathMatch : 'full'
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProRoutingModule { }
