import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import * as bcrypt from 'bcryptjs';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class TicTacToeService {

  playerKey = new BehaviorSubject<string>('');
  menuData = new BehaviorSubject<string>('');
  playersPairId = new BehaviorSubject<number>(0);

  constructor(private http:HttpClient) { }

  register(params){
		return this.http.post('https://1zu6yge6q0.execute-api.ap-south-1.amazonaws.com/dev/v1', params);
  }
  
  login(params){
		return this.http.post('https://1zu6yge6q0.execute-api.ap-south-1.amazonaws.com/dev/login', params);
  }
  
  start(params){
		return this.http.post('https://1zu6yge6q0.execute-api.ap-south-1.amazonaws.com/dev/start', params);
  }

  forgot(params){
		return this.http.post('https://1zu6yge6q0.execute-api.ap-south-1.amazonaws.com/dev/-forgot', params);
  }

  logout(params){
		return this.http.post('https://1zu6yge6q0.execute-api.ap-south-1.amazonaws.com/dev/logout', params);
  }

  getHashPassword(password) {
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(password, salt);
    return hash;
  }

  getEncryptedPassword(pwd){
    const cryptoInfo = CryptoJS.AES.encrypt(pwd, '1@2&3#4^5$6%8$#@&^UTTAM').toString();
    return cryptoInfo;
  }
  
}
