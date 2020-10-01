import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TicTacToeService } from '../services/tic-tac-toe.service';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.page.html',
  styleUrls: ['./forgot.page.scss'],
})
export class ForgotPage implements OnInit {

  public forgotForm: FormGroup;
  loading : any; 

  constructor(private ticTacToeService : TicTacToeService, public toastController: ToastController, public router : Router, public navController : NavController, public loadingController: LoadingController) { }

  ngOnInit() {
    this.initializeRegisterForm();
  }

  private initializeRegisterForm() {
    this.forgotForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
      password: new FormControl('', [Validators.required]),
      newPassword: new FormControl('', [Validators.required])
    });
  }

  async onForgotFormSubmit(){
    if(this.validateForgotForm()){
      this.presentLoading();
      var hash = await this.ticTacToeService.getHashPassword(this.forgotForm["value"]["password"]);
      this.forgotForm["value"]["password"] = hash;
      this.forgotForm["value"]["newPassword"] = hash;
      this.ticTacToeService.forgot(this.forgotForm["value"]).subscribe(res => {
          if(res["statusCode"] == 200){
            this.router.navigate(['/login']);
            this.presentToast(res["msg"], "success");
          }else{
            this.presentToast(res["msg"], "danger");
          }
          this.loading.dismiss();
      },error => {
        this.loading.dismiss();
        this.presentToast("Connection error", "danger");
        console.log("Error : " + JSON.stringify(error));
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

  private validateForgotForm(): boolean {
    let isValid: boolean = false;
    if (this.forgotForm.controls['email'].invalid) {
      isValid = false;
      this.presentToast("Please enter the username", "danger");
    }
    else if (this.forgotForm.controls['password'].invalid) {
      isValid = false;
      this.presentToast("Please enter the password", "danger");
    }
    else if (this.forgotForm.controls['newPassword'].invalid) {
      isValid = false;
      this.presentToast("Please enter the confirm password", "danger");
    }
    else {
      isValid = true;
    }
    return isValid;
  }

  get email() {
    return this.forgotForm.get('email');
  }

  get password() {
    return this.forgotForm.get('password');
  }

  get cnfrmPassword() {
    return this.forgotForm.get('newPassword');
  }

  async presentLoading() {
    this.loading = await this.loadingController.create({
      cssClass: 'loader-text',
      message: 'Updating..Please wait...',
    });
    await this.loading.present();
  }

}
