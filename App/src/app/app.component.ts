import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { MenuController } from '@ionic/angular';
import { TicTacToeService } from '../app/services/tic-tac-toe.service';
import { LoadingController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  fullName: string = "";
  firstName: string = "";
  gender: string = "male";
  accountId: string = "";
  email: string = "";
  timeString: string = "";
  playersPairId : number = 0;
  loading : any;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private menu: MenuController,
    private serv: TicTacToeService,
    public loadingController: LoadingController,
    public toastController: ToastController
  ) {
    this.initializeApp();
    this.getMenuData();
    this.serv.playersPairId.subscribe(pairId => {
      this.playersPairId = pairId;
      console.log("playersPairId : " + this.playersPairId);
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  closeFirst() {
    this.menu.enable(true, 'first');
    this.menu.close('first');
    if(this.playersPairId != null && this.playersPairId != 0 && this.playersPairId != undefined){
      this.presentLoading();
      this.serv.logout({"pairId" : this.playersPairId}).subscribe(res => {
        this.presentToast(res["msg"], "success");
         this.loading.dismiss();
      }, error => {
        console.log("Error : " + JSON.stringify(error));
        this.presentToast("Connection error", "danger");
        this.loading.dismiss();
      });
    }
  }

  toCamelCase(str) {
    return str
      .replace(/\s(.)/g, function ($1) { return $1.toUpperCase(); })
      .replace(/\s/g, '')
      .replace(/^(.)/, function ($1) { return $1.toLowerCase(); });
  }

  getMenuData() {
    this.serv.menuData.subscribe(data => {
      if (data != "" && data != undefined) {
        var parsedData = JSON.parse(data);
        console.log("app component change : " + JSON.parse(data));
        this.gender = "";
        let gender = parsedData["userData"][0]["gender"];
        this.gender = gender;
        this.firstName = parsedData["userData"][0]["first_name"];
        var userName = parsedData["userData"][0]["first_name"] + " " + parsedData["userData"][0]["last_name"];
        console.log("before camel case : " + userName);
        // userName = this.toCamelCase(userName);
        // console.log("after camel case : " + userName);
        this.fullName = userName;
        let accId = parsedData["userData"][0]["unique_key"];
        this.accountId = accId;
        this.email = parsedData["userData"][0]["email"];

        let time = new Date(parsedData["userData"][0]["login_date"]);
        let day = time.getDate();
        let mon = time.getMonth() + 1;
        let year = time.getFullYear();

        this.timeString = day + "-" + mon + "-" + year;
      }
    })
  }

  async presentLoading() {
    this.loading = await this.loadingController.create({
      cssClass: 'loader-text',
      message: 'Logging out..Please wait...',
    });
    await this.loading.present();
  }

  async presentToast(msg, color) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 4000,
      color: color,
      position: "bottom"
    });
    toast.present();
  }
}
