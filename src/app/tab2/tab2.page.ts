import {Component, OnInit} from '@angular/core';
import {AuthService} from '../services/user/auth.service';
import {AlertController, LoadingController} from '@ionic/angular';
import {DoneOrdersService} from '../services/orders/done-orders.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  loading;
  orders;

  constructor (private authService: AuthService,
               private loadingCtrl: LoadingController,
               private alertCtrl: AlertController,
               private doneOrdersService: DoneOrdersService) {

  }

  ngOnInit(): void {
    this.getAllOrders();
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

  /**
   * Get all orders
   */
  getAllOrders () {
    this.presentLoading('loading').then(()=>{
      this.doneOrdersService.getOrders().subscribe(res=>{
        this.orders = res;
        console.log(this.orders);
        this.loading.dismiss();
      }, err=> {
        this.loading.dismiss();
        if (err.message) {
          this.presentAlert('Error', err.message);
        } else {
          this.presentAlert('Error', 'Please Check your connection')
        }
      })
    })
  }
}
