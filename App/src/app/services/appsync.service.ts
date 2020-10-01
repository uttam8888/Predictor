import { Injectable } from '@angular/core';
import  AWSAppSyncClient  from 'aws-appsync';

@Injectable({
  providedIn: 'root'
})
export class AppsyncService {

  constructor() { }

  async tictacAppsyncClient() {    
    return new AWSAppSyncClient({
      url: "https://f5ktr6pew5hnbat6z7nbj6y6uy.appsync-api.ap-south-1.amazonaws.com/graphql",
      region: "ap-south-1",
      disableOffline: true,
      auth: {
        type: "API_KEY",
        apiKey: "da2-ntpndj6r3ndijgysmmro6dccsm"
      }
    });
  }
}
