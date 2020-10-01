import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TicTacToeService } from '../services/tic-tac-toe.service';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  public registerForm: FormGroup;
  loading : any; 

  constructor(private ticTocService: TicTacToeService, public toastController: ToastController, public router: Router, public loadingController: LoadingController) { }

  ngOnInit() {
    this.initializeRegisterForm();
  }

  private initializeRegisterForm() {
    this.registerForm = new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
      password: new FormControl('', [Validators.required]),
      gender: new FormControl('', [Validators.required])
    });
  }

  public async onRegisterFormSubmit() {
    if (this.validateRegisterForm()) {
      this.presentLoading();
      var hash = await this.ticTocService.getHashPassword(this.registerForm["value"]["password"]);
      this.registerForm["value"]["password"] = hash;
      this.ticTocService.register(this.registerForm["value"]).subscribe(res => {
        if (res["statusCode"] == 200) {
          this.presentToast(res["msg"], "success");
          this.router.navigate(['/login']);
        } else {
          this.presentToast(res["msg"], "danger");
        }
        this.loading.dismiss();
      }, error => {
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

  private validateRegisterForm(): boolean {
    let isValid: boolean = false;
    if (this.registerForm.controls['firstName'].invalid) {
      isValid = false;
      this.presentToast("Please enter the firstName", "danger");
    } else if (this.registerForm.controls['lastName'].invalid) {
      isValid = false;
      this.presentToast("Please enter the lastName", "danger");
    } else if (this.registerForm.controls['email'].invalid) {
      isValid = false;
      this.presentToast("Please enter the email", "danger");
    } else if (this.registerForm.controls['password'].invalid) {
      isValid = false;
      this.presentToast("Please enter the password", "danger");
    } else if (this.registerForm.controls['gender'].invalid) {
      isValid = false;
      this.presentToast("Please enter the gender", "danger");
    } else {
      isValid = true;
    }
    return isValid;
  }

  get firstName() {
    return this.registerForm.get('firstName');
  }

  get lastName() {
    return this.registerForm.get('lastName');
  }

  get email() {
    return this.registerForm.get('email');
  }

  get password() {
    return this.registerForm.get('password');
  }

  async presentLoading() {
    this.loading = await this.loadingController.create({
      cssClass: 'loader-text',
      message: 'Registering..Please wait...',
    });
    await this.loading.present();
  }

}
