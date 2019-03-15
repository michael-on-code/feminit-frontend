import {HttpHeaders} from '@angular/common/http';

export const environment = {
  production: true,
  apiUrl: 'https://ifisun.solidarit-hub.org/index.php',
  uploadUrl : 'https://ifisun.solidarit-hub.org/uploads/',
  httpHeader : {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'Basic ' + btoa('admin:1234')
    })
  }
};
