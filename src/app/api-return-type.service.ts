/*import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})*/
export class ApiReturnTypeService {
    constructor(public status: number, public message: string, public userID: null,
                public data: null) { }
}
