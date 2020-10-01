import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TicTacToeService } from '../services/tic-tac-toe.service';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public loginForm: FormGroup;
  // skeletontext : boolean = false;
  // arr = [1,2,3,4,5,6,7,8,9,11,22,33,44,55,1,2,3,4,5,6,7,8,9,11,22,33,44,55,1,2,3,4,5,6,7,8,9];
  loading : any; 

  constructor(private ticTacToeService: TicTacToeService, public toastController: ToastController, public router: Router, public navController: NavController, public loadingController: LoadingController) { }

  ngOnInit() {
    this.initializeRegisterForm();
  }

  private initializeRegisterForm() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
      password: new FormControl('', [Validators.required])
    });
  }

  async onLoginFormSubmit() {
    if (this.validateLoginForm()) {
      this.presentLoading();
      var hash = await this.ticTacToeService.getEncryptedPassword(this.loginForm["value"]["password"]);
      this.loginForm["value"]["password"] = hash;
      this.ticTacToeService.login(this.loginForm["value"]).subscribe( res => {
        if (res["statusCode"] == 200) {
          this.ticTacToeService.playerKey.next(res["userData"][0]["unique_key"]);
          this.ticTacToeService.menuData.next(JSON.stringify(res));
          this.navController.navigateRoot(`/online-tic-tac-toe`);
          this.presentToast(res["msg"], "success");
        } else {
          this.presentToast(res["msg"], "danger");
        }
        this.loading.dismiss();
      }, error => {
        console.log("Error : " + JSON.stringify(error));
        this.presentToast("Connection error", "danger");
        this.loading.dismiss();
      });
    }
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

  private validateLoginForm(): boolean {
    let isValid: boolean = false;
    if (this.loginForm.controls['email'].invalid) {
      isValid = false;
      this.presentToast("Please enter the username", "danger");
    }
    else if (this.loginForm.controls['password'].invalid) {
      isValid = false;
      this.presentToast("Please enter the password", "danger");
    }
    else {
      isValid = true;
    }
    return isValid;
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  async presentLoading() {
    this.loading = await this.loadingController.create({
      cssClass: 'loader-text',
      message: 'Authenticating..Please wait...',
    });
    await this.loading.present();
  }
}
