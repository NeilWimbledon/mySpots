import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import {AuthService} from '../services/auth-service'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  email: string = "";
  password: string = "";
  cPassword: string = "";
  loading: HTMLIonLoadingElement;

  constructor(
              private authService: AuthService,
              private alert: AlertController,
              private router: Router,
              private loadingController: LoadingController
            ) {}       
            

  ngOnInit() {
  }

  async signUp() {

     this.loading = await this.loadingController.create({
      duration: 10000,
      message: "Loading...",
      showBackdrop: true,
      translucent: false
    });

    this.loading.present();
    //const { email, password, cPassword } = this
    if(this.password !== this.cPassword) {
      this.showAlert("Error", "Passwords did not match.");
      this.loading.dismiss();
      return;
    }

    
    
    this.authService.register(this.email, this.password)
    .then( (uid :string) => {
      console.log("User Created with ID: " +uid);
      this.showAlert("Success", "Welcome aboard.");
      this.router.navigate(['/tabs']);
      this.loading.dismiss();
    })
    .catch( (err :Error) => {
      console.dir(err);
      if( !err.name ){
        this.showAlert("Error", "Unexpected error please try again later");

      }
      else if ( err.name == "errors.auth.exists"){
        this.showAlert("Error", "This email address already exists please sign in");
      }
      else{
        this.showAlert("Error", err.message);
      }
      this.loading.dismiss();
    })
    
  }

  async showAlert(header: string, message: string) {
    const alert = await this.alert.create({
      header,
      message,
      buttons: ["OK"]
    });

    await alert.present();
  }

}
