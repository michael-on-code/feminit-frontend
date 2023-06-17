import {HttpHeaders} from '@angular/common/http';

export const environment = {
  production: true,
  apiUrl: 'https://ausecours.animashaunmichael.com/index.php',
  uploadUrl : 'https://ausecours.animashaunmichael.com/uploads/',
  httpHeader : {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'Basic ' + btoa('admin:1234')
    })
  }
};
