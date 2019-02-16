import { Component } from '@angular/core';
import {AuthService} from '../services/user/auth.service';
import {AlertController, LoadingController, ModalController} from '@ionic/angular';
import {NewOrderPage} from '../new-order/new-order.page';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  loading;

  constructor (private authService: AuthService,
               private loadingCtrl: LoadingController,
               private alertCtrl: AlertController,
               private  modalCtrl: ModalController) {

  }


  /**
   * present a modal with a form to ad new order
   */
  async presentAddModal () {
    const modal = await this.modalCtrl.create({component: NewOrderPage});
    return await modal.present();
  }
  /**
   * Logout User
   */
  logout (){
    this.presentLoading('Logout').then(()=>{
      this.authService.logoutUser().then(()=>{
        this.loading.dismiss();
      }).catch((err)=> {
        this.presentAlert(err.message);
      })
    })
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
}
