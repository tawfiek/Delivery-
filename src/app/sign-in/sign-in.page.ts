import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../services/user/auth.service';
import {Router} from '@angular/router';
import {AlertController, LoadingController} from '@ionic/angular';
import {load} from '@angular/core/src/render3';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.page.html',
  styleUrls: ['./sign-in.page.scss'],
})
export class SignInPage implements OnInit {
  loginForm: FormGroup;
  loading;
  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private alertCtrl: AlertController,
              private loadingCtrl: LoadingController,
              private router:Router) { }

  ngOnInit() {
    this.initForm();
  }

  /**
   * Initialize Login Form
   */
  initForm () {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  /**
   * Login
   * @param value: value comes  from  loginForm.
   */
   login(value) {

     this.presentLoading('Loading').then(()=> {
       this.authService.loginUser(value.email, value.password).then(res=> {
         localStorage.setItem('userEmail', res.user.email);
         this.loading.dismiss().then(()=> {
           this.router.navigate(['']);
         });
         console.log(res.user.email);
       }).catch(err=> {
         this.loading.dismiss();
         this.presentAlert('Error', err.message);
       })
     });


  }

  /**
   * Function to  present an alert..
   * @param header: Header of the alert
   * @param message: message of alert
   */
  async presentAlert(header?: string ,message?: string) {
    const alert = await this.alertCtrl.create({
      header: header,
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }

  /**
   * Function to  present an loading..
   * @param message: message of loading
   */
  async presentLoading (message) {
    this.loading = await this.loadingCtrl.create({message: message});
    this.loading.present();
  }
  /**
   * Navigate to  Page.
   * @param path: the path that we need to navigate to.
   */
  goTo (path) {
    this.router.navigate(path);
  }

}
