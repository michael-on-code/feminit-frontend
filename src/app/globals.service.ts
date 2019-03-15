import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';
import {GlobalsType} from './GlobalsType';

@Injectable({
  providedIn: 'root'
})
export class GlobalsService {

  private data = new Subject<GlobalsType>();
  newDataStream = this.data.asObservable();
  constructor() {

  }

  newDataRefresh(data) {
    this.data.next(data);
  }
}
