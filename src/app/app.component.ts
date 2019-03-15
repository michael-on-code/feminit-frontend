import {Component, OnInit} from '@angular/core';
import {GlobalsService} from './globals.service';
import {GlobalsType} from './GlobalsType';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'feminit';
  // data = {};
  constructor(/* private dataService: GlobalsService*/) {  }

  ngOnInit() {
    // this.dataService.newDataStream.subscribe((myData: GlobalsType) => {
    //   console.log(myData);
    //   this.data = myData;
    // });
  }
}
