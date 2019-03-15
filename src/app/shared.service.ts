import { Injectable } from '@angular/core';
import {OptionReturnTypeService} from './pro/option-return-type.service';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  userData: any;
  siteOptions: any = {};
  mustLogin = false;
  isLoggedOut = false;
  error = false;
  errorMessage: string;
  messageNeeded = false;
  message: string;
  messageType: string;
}
