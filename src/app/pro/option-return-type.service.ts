// import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';


export class OptionReturnTypeService {
  constructor(public siteLogo: string, public siteName: string, public siteAvatar: string,
              public siteDescription: string, public siteBackgroundImage: string,
              public siteDefaultComplainCover: string
  ) {
  }
}
