import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {OptionReturnTypeService} from './pro/option-return-type.service';
import {environment} from '../environments/environment';
import {SharedService} from './shared.service';

const API_URL = environment.apiUrl;
const API_HEADERS = environment.httpHeader;
const UPLOAD_URL = environment.uploadUrl;

@Injectable({
  providedIn: 'root'
})
export class ApiMonsterService {
  public options: any = {};

  constructor(private http: HttpClient) {
  }

  getOptions() {
    return this.http.get(API_URL + '/options/getAll', API_HEADERS);
  }

  login(data) {
    return this.http.post(API_URL + '/login/set', data, API_HEADERS);
  }

  setOptions(data) {
    return this.http.post(API_URL + '/options/set', data, API_HEADERS);
  }

  verifyActivation(userID, activationCode) {
    return this.http.get(API_URL + '/users/verifyActivation/?userID=' + userID + '&activationCode=' + activationCode, API_HEADERS);
  }

  setActivateAccount(data) {
    return this.http.post(API_URL + '/users/activate', data, API_HEADERS);
  }

  userNameExist(username) {
    return this.http.get(API_URL + '/signup/userNameExist/?username=' + username, API_HEADERS);
  }

  addBotMessage(data) {
    return this.http.post(API_URL + '/botMessage/add', data, API_HEADERS);
  }

  getBotMessages() {
    return this.http.get(API_URL + '/botMessage/all', API_HEADERS);
  }

  getBotMessage(messageID) {
    return this.http.get(API_URL + '/botMessage/retrieveByID/?botMessageID=' + messageID, API_HEADERS);
  }

  updateBotMessages(data) {
    return this.http.post(API_URL + '/botMessage/edit', data, API_HEADERS);
  }

  deleteBotMessage(messageID) {
    return this.http.get(API_URL + '/botMessage/deleteByID/?messageID=' + messageID, API_HEADERS);
  }

  signupadd(data) {
    return this.http.post(API_URL + '/signup/add', data, API_HEADERS);
  }

  mailExist(email) {
    return this.http.get(API_URL + '/signup/mailExist?email=' + email, API_HEADERS);
  }

  getComplainTypes() {
    return this.http.get(API_URL + '/ComplainType/all', API_HEADERS);
  }

  addComplainType(data) {
    return this.http.post(API_URL + '/complainType/add', data, API_HEADERS);
  }

  editComplainType(data) {
    return this.http.post(API_URL + '/complainType/edit', data, API_HEADERS);
  }

  getComplainType(complainTypeID) {
    return this.http.get(API_URL + '/complainType/getByID/?complainTypeID=' + complainTypeID, API_HEADERS);
  }

  getComplainViolences() {
    return this.http.get(API_URL + '/ComplainViolence/all', API_HEADERS);
  }

  getComplainViolence(violenceID) {
    return this.http.get(API_URL + '/complainViolence/getByID/?complainViolenceID=' + violenceID, API_HEADERS);
  }

  editComplainViolence(data) {
    return this.http.post(API_URL + '/complainViolence/edit', data, API_HEADERS);
  }

  addComplainViolence(data) {
    return this.http.post(API_URL + '/complainViolence/add', data, API_HEADERS);
  }

  getMembersList() {
    return this.http.get(API_URL + '/users/getMembersList', API_HEADERS);
  }

  banOrActivateUser(userID) {
    return this.http.get(API_URL + '/users/banOrActivate/?userID=' + userID, API_HEADERS);
  }

  getAdminAndModeratorList(adminID) {
    return this.http.get(API_URL + '/users/getAdminsAndModeratorsList/?userID=' + adminID, API_HEADERS);
  }

  addAdmin(data) {
    return this.http.post(API_URL + '/users/add', data, API_HEADERS);
  }

  getGroupNames() {
    return this.http.get(API_URL + '/users/getGroupNames', API_HEADERS);
  }

  editPassword(data) {
    return this.http.post(API_URL + '/users/editPassword', data, API_HEADERS);
  }

  updateUser(data) {
    return this.http.post(API_URL + '/users/edit', data, API_HEADERS);
  }

  getComplainsList() {
    return this.http.get(API_URL + '/complain/all', API_HEADERS);
  }

  getComplain(complainID) {
    return this.http.get(API_URL + '/complain/byID/?complainID=' + complainID, API_HEADERS);
  }

  getComplainForUpdate(complainID, moderatorData: SharedService) {
    return this.http.get(API_URL + '/complain/moderatorUpdate/?complainID=' + complainID + '&moderatorUsername='
      + moderatorData.userData.username + '&moderatorPassword=' + moderatorData.userData.password);
  }
}
