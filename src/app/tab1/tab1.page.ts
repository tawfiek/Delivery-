import {Component, OnInit} from '@angular/core';
import {AuthService} from '../services/user/auth.service';
import {AlertController, LoadingController, ModalController} from '@ionic/angular';
import {NewOrderPage} from '../new-order/new-order.page';
import {NewOrdersService} from '../services/orders/new-orders.service';
import {Order} from '../interfaces/order';
import {DoneOrdersService} from '../services/orders/done-orders.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{
  loading;
  orders;

  constructor (private authService: AuthService,
               private loadingCtrl: LoadingController,
               private alertCtrl: AlertController,
               private newOrdersService: NewOrdersService,
               private doneOrdersService: DoneOrdersService,
               private  modalCtrl: ModalController) {

  }

  ngOnInit(): void {
    this.getAllOrders();
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

  /**
   * Get all orders
   */
  getAllOrders () {
    this.presentLoading('loading').then(()=>{
      this.newOrdersService.getOrders().subscribe(res=>{
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

  /**
   *
   * Set Order as Delivered in  database.
   * @param index: index of order in orders array
   */
  deliverOrder (index) {
    this.presentLoading('Loading').then(()=>{
      let order : Order = this.orders[index];
      order.deliveredBy = localStorage.getItem('userEmail');
      order.deliveredAt= new Date();
      this.newOrdersService.removeOrder(order.id).then(res=>{
        this.orders.splice(index, 1);
        this.doneOrdersService.addOrder(order).then(res=>{
          this.loading.dismiss();
        }).catch(err => {
          this.loading.dismiss().then(()=>{
            if (err.message) {
              this.presentAlert('Error', err.message);
            }else {
              this.presentAlert('Error', 'Check Your Connection');
            }
          })
        })

      }).catch(err => {
        this.loading.dismiss().then(()=>{
          if (err.message) {
            this.presentAlert('Error', err.message);
          }else {
            this.presentAlert('Error', 'Check Your Connection');
          }
        })
      })
    })
  }


}
